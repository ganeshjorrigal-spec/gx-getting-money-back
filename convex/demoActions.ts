"use node";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { accessToken, listMessages, getMessage, header, fromAddress, messageText, googleJson } from "./googleActions";
import { demoMayReply, demoReplyBody, emailAddresses, sameDemoMailbox } from "../lib/demo";
import { caseInboxAddress, messageMatchesCase } from "../lib/google-tracking";
import type { Id } from "./_generated/dataModel";

const args = { caseId: v.id("cases"), session: v.string() };
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const encoded = (s: string) => `=?UTF-8?B?${Buffer.from(s).toString("base64")}?=`;

export const checkOrganiser = internalAction({
  args, returns: v.null(),
  handler: async (ctx, input) => {
    const started = Date.now();
    const loaded = await ctx.runQuery(internal.demo.load, { caseId: input.caseId });
    if (!loaded?.item.demo || loaded.item.demo.session !== input.session || loaded.item.demo.phase !== "waiting_organiser" || !loaded.watch) return null;
    if (Date.now() > (loaded.item.demo.deadline ?? 0)) { await ctx.runMutation(internal.demo.timeout, input); return null; }
    const connection = await ctx.runQuery(internal.googleConnect.connectionByKind, { kind: "demo" });
    const demoAddress = process.env.TICKBACK_DEMO_ADDRESS; const inboxAddress = process.env.TICKBACK_INBOX_ADDRESS;
    if (!connection || !demoAddress || !inboxAddress || connection.email !== demoAddress.toLowerCase()) { await ctx.runMutation(internal.demo.timeout, input); return null; }
    try {
      const token = await accessToken(connection.encryptedRefreshToken);
      const candidates = await listMessages(token, `in:inbox subject:"${loaded.item.code}" after:${Math.floor(loaded.item.createdAt / 1000)}`);
      for (const candidate of (candidates ?? []).reverse()) {
        const message = await getMessage(token, candidate.id);
        const from = fromAddress(header(message, "from"));
        if (Number(message.internalDate ?? 0) < loaded.item.createdAt || ![...emailAddresses(header(message, "to")), ...emailAddresses(header(message, "cc"))].some(address => sameDemoMailbox(address, demoAddress))) continue;
        if (!demoMayReply({ isDemo: !!loaded.item.demo, code: loaded.item.code, subject: header(message, "subject"), from, demoAddress, inboxAddress, autoSubmitted: header(message, "auto-submitted"), precedence: header(message, "precedence"), suppress: header(message, "x-auto-response-suppress"), replies: loaded.replies.length, expired: loaded.item.demo.expiresAt <= Date.now() })) continue;
        const messageId = header(message, "message-id");
        if (!messageId || !/^<[^\r\n<>]+>$/.test(messageId.trim())) continue;
        const reservation: Id<"demoReplies"> | null = await ctx.runMutation(internal.demo.reserve, { ...input, messageId: message.id });
        if (!reservation) continue;
        const round = loaded.item.demo.round + 1;
        let opening = `Thank you for contacting us about ${loaded.item.eventName}.`;
        if (process.env.GEMINI_MODEL) {
          const aiStarted = Date.now();
          try {
            const response = await generateObject({ model: google(process.env.GEMINI_MODEL), schema: z.object({ opening: z.string() }), system: "Write one short customer-support acknowledgement thanking the customer for contacting us about the supplied cancelled booking (flight or event). Do not welcome them to the event. No dates, amounts, contacts, promises or instructions. No other facts. Return JSON only.", prompt: `Booking: ${loaded.item.eventName}. Customer name: ${loaded.item.name ?? "not given"}.`, maxOutputTokens: 100, maxRetries: 0, abortSignal: AbortSignal.timeout(3500), providerOptions: { google: { thinkingConfig: { thinkingLevel: "low" } } } });
            if (response.object.opening.includes(loaded.item.eventName ?? "Sample Concert") && response.object.opening.length < 150 && /thank|contact|enquir|reaching/i.test(response.object.opening) && !/[\d@\n]|https?:|refund|processed|initiated|bank/i.test(response.object.opening)) opening = response.object.opening;
            await ctx.runMutation(internal.demo.recordAi, { caseId: input.caseId, runId: input.session, model: process.env.GEMINI_MODEL, latencyMs: Date.now() - aiStarted, inputTokens: response.usage.inputTokens ?? 0, outputTokens: response.usage.outputTokens ?? 0, totalTokens: response.usage.totalTokens ?? 0 });
          } catch { /* The fixed ladder still replies if the greeting cannot be generated quickly. */ }
        }
        const reply = demoReplyBody({ round, kind: loaded.item.demo.kind, cancellationDate: loaded.item.facts?.cancellationDate, platform: loaded.item.platform ?? "District", event: loaded.item.eventName ?? "Sample Concert", amount: (loaded.item.amountPaise ?? 240000) / 100, bookingId: loaded.item.facts?.bookingId, now: loaded.item.demo.now, code: loaded.item.code, opening });
        const recipients = [...new Set([from, ...emailAddresses(header(message, "to")), ...emailAddresses(header(message, "cc"))])].filter(address => !sameDemoMailbox(address, demoAddress) && !sameDemoMailbox(address, inboxAddress));
        const cc = caseInboxAddress(inboxAddress, loaded.item.code);
        const boundary = `tickback_${reservation}`;
        const name = loaded.item.demo.kind === "flight" ? `${round === 2 ? "Nodal desk" : "Refund desk"} · demo (${round === 2 ? "airline" : "travel site"} role)` : `Refund desk · demo (${loaded.item.platform} role)`;
        const subject = header(message, "subject").replace(/[\r\n]/g, "");
        const references = `${header(message, "references").replace(/[\r\n]/g, " ")} ${messageId}`.trim();
        const html = `<p>${reply.body.split("\n\n").slice(0, -1).map(escapeHtml).join("</p><p>")}</p><p><small>${escapeHtml(reply.footer)}</small></p>`;
        const raw = [`From: ${encoded(name)} <${demoAddress}>`, `To: ${recipients.join(", ")}`, `Cc: ${cc}`, `Subject: ${encoded(/^Re:/i.test(subject) ? subject : `Re: ${subject}`)}`, `In-Reply-To: ${messageId}`, `References: ${references}`, `Message-ID: <${reservation}@tickback-demo.local>`, "Auto-Submitted: auto-replied", "MIME-Version: 1.0", `Content-Type: multipart/alternative; boundary="${boundary}"`, "", `--${boundary}`, "Content-Type: text/plain; charset=utf-8", "Content-Transfer-Encoding: base64", "", Buffer.from(reply.body).toString("base64"), `--${boundary}`, "Content-Type: text/html; charset=utf-8", "Content-Transfer-Encoding: base64", "", Buffer.from(html).toString("base64"), `--${boundary}--`].join("\r\n");
        const delivered = await googleJson<{ threadId?: string }>("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", token, { method: "POST", body: JSON.stringify({ threadId: message.threadId, raw: Buffer.from(raw).toString("base64url") }) });
        await ctx.runMutation(internal.demo.sent, { id: reservation, session: input.session, sameThread: delivered.threadId === message.threadId });
        return null;
      }
    } catch { /* No mailbox text or account data is logged. Bounded checks continue. */ }
    await ctx.scheduler.runAfter(Math.max(0, 10_000 - (Date.now() - started)), internal.demoActions.checkOrganiser, input);
    return null;
  },
});

export const checkCaseInbox = internalAction({
  args, returns: v.null(),
  handler: async (ctx, input) => {
    const started = Date.now();
    const loaded = await ctx.runQuery(internal.demo.load, { caseId: input.caseId });
    if (!loaded?.item.demo || loaded.item.demo.session !== input.session || loaded.item.demo.phase !== "waiting_inbox" || !loaded.watch) return null;
    if (Date.now() > (loaded.item.demo.deadline ?? 0)) { await ctx.runMutation(internal.demo.timeout, input); return null; }
    const inbox = await ctx.runQuery(internal.googleConnect.inbox, {});
    const inboxAddress = process.env.TICKBACK_INBOX_ADDRESS; const demoAddress = process.env.TICKBACK_DEMO_ADDRESS;
    if (!inbox || !inboxAddress || !demoAddress) return null;
    try {
      const token = await accessToken(inbox.encryptedRefreshToken);
      const messages = await listMessages(token, `subject:"${loaded.item.code}" from:${demoAddress} after:${Math.floor(loaded.watch.sentAt / 1000)}`);
      for (const candidate of messages ?? []) {
        const message = await getMessage(token, candidate.id);
        const from = fromAddress(header(message, "from")); const receivedAt = Number(message.internalDate ?? 0);
        if (from !== demoAddress.toLowerCase() || !messageMatchesCase({ to: header(message, "to"), subject: header(message, "subject"), from, code: loaded.item.code, inbox: inboxAddress, ownEmail: inbox.email, sentAt: loaded.watch.sentAt, receivedAt })) continue;
        const text = messageText(message);
        if (text) await ctx.runMutation(internal.googleData.saveReply, { caseId: input.caseId, messageId: header(message, "message-id") || message.id, source: "inbox", text, sender: from, receivedAt });
      }
    } catch { /* The next bounded check retries. */ }
    await ctx.scheduler.runAfter(Math.max(0, 10_000 - (Date.now() - started)), internal.demoActions.checkCaseInbox, input);
    return null;
  },
});

export const diagnose = internalAction({
  args: { code: v.string() }, returns: v.any(),
  handler: async (ctx, { code }) => {
    const connection = await ctx.runQuery(internal.googleConnect.connectionByKind, { kind: "demo" });
    if (!connection) return { connected: false };
    try {
      const token = await accessToken(connection.encryptedRefreshToken);
      const list = await listMessages(token, `in:inbox subject:"${code}"`);
      const flags = [];
      for (const candidate of list ?? []) {
        const m = await getMessage(token, candidate.id);
        flags.push({ fromCaseInbox: fromAddress(header(m, "from")) === process.env.TICKBACK_INBOX_ADDRESS?.toLowerCase(), fromDemoDesk: fromAddress(header(m, "from")) === process.env.TICKBACK_DEMO_ADDRESS?.toLowerCase(), autoReply: !!header(m, "auto-submitted") && header(m, "auto-submitted").toLowerCase() !== "no", receivedAt: Number(m.internalDate), toDemo: emailAddresses(header(m, "to")).includes(process.env.TICKBACK_DEMO_ADDRESS!.toLowerCase()), allowed: demoMayReply({ isDemo: true, code, subject: header(m, "subject"), from: fromAddress(header(m, "from")), demoAddress: process.env.TICKBACK_DEMO_ADDRESS!, inboxAddress: process.env.TICKBACK_INBOX_ADDRESS!, replies: 0, autoSubmitted: header(m, "auto-submitted"), precedence: header(m, "precedence"), suppress: header(m, "x-auto-response-suppress") }), hasMessageId: /^<[^\r\n<>]+>$/.test(header(m, "message-id").trim()) });
      }
      return { count: list?.length ?? 0, flags };
    } catch (error) { return { error: error instanceof Error && /^(Google API request failed \(\d+\)|Google connection needs to be renewed)$/.test(error.message) ? error.message : "Demo mailbox check failed" }; }
  },
});

export const verifySheet = internalAction({
  args: { code: v.string() }, returns: v.any(),
  handler: async (ctx, { code }): Promise<{ present: boolean; markedDemo?: boolean; stageMatches?: boolean; columns?: number }> => {
    const proof = await ctx.runQuery(internal.qa.demoProof, { code });
    const context = await ctx.runQuery(internal.responsesData.sheetContext, {});
    if (!proof?.sheetRow || !context) return { present: false };
    const token = await accessToken(context.connection.encryptedRefreshToken);
    const range = `Cases!A${proof.sheetRow}:L${proof.sheetRow}`;
    const result = await googleJson<{ values?: string[][] }>(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(context.config.spreadsheetId)}/values/${encodeURIComponent(range)}`, token);
    const row = result.values?.[0];
    return { present: row?.[0] === code, markedDemo: row?.[4]?.startsWith("Demo · ") ?? false, stageMatches: row?.[8] === proof.stage, columns: row?.length ?? 0 };
  },
});
