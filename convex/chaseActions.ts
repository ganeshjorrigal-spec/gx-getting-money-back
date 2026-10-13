"use node";
import { publicAppUrl, privateCaseUrl } from "../lib/app-url";
import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { makeAuthorityLetter } from "./lib/authority_letter";
import {
  accessToken,
  googleJson,
  header,
  fromAddress,
  getMessage,
} from "./googleActions";
import type { GmailMessage } from "./googleActions";
import { encryptToken, decryptToken } from "../lib/token-crypto";
import { chaseAddressAllowed, chaseBody, chaseMailbox } from "../lib/chase";
import { emailAddresses } from "../lib/demo";
import { chaseRecipientsAllowed } from "../lib/chase";
import { caseInboxAddress } from "../lib/google-tracking";
const access = { code: v.string(), token: v.string() };
export const authoriseDemo=action({args:{...access,accepted:v.boolean()},returns:v.null(),handler:async(ctx,args)=>{
 const item=await ctx.runQuery(internal.chase.loadAccess,{code:args.code,token:args.token});
 if(!args.accepted||!item.demo?.chaseStory||item.demo.chasePhase!=='authority'||item.chase)throw new Error('Use the sample permission on a new flight demo');
 const config=await ctx.runQuery(internal.callQa.config,{}),authorisedAt=Date.now();
 // Public PDF contains made-up details only. Operational test recipients stay private.
 const bytes=await makeAuthorityLetter({code:item.code,name:'Demo Passenger',mobile:'+910000000000',email:'passenger@example.invalid',company:'Demo Air and DemoTrips',pnr:'SAMPLE',authorisedAt});
 const letterId=await ctx.storage.store(new Blob([new Uint8Array(bytes)],{type:'application/pdf'}));
 try{await ctx.runMutation(internal.chase.authorise,{code:args.code,token:args.token,name:'Demo Passenger',mobile:'+910000000000',email:config.email,letterId,authorisedAt,encryptedCaseToken:await encryptToken(args.token)});await ctx.runMutation(internal.chaseDemo.authorised,{code:args.code,token:args.token});}catch(e){await ctx.storage.delete(letterId);throw e;}return null;
}});
export const deliveryProof = internalAction({
  args: { code: v.string() },
  returns: v.any(),
  handler: async (ctx, args): Promise<unknown> => {
    const info = await ctx.runQuery(internal.chase.inspectByCode, args);
    if (!info?.active) throw new Error("Use an active demo chase");
    const loaded = await ctx.runQuery(internal.chase.demoProofAccess, {
      caseId: info.caseId,
    });
    if (!loaded?.connection?.chaseSendGranted)
      throw new Error("Inbox not connected");
    const token = await accessToken(loaded.connection.encryptedRefreshToken),
      address = caseInboxAddress(
        process.env.TICKBACK_INBOX_ADDRESS!,
        args.code,
      ).toLowerCase();
    const hasPdf = (part: GmailMessage["payload"]): boolean =>
      part?.mimeType === "application/pdf" || !!part?.parts?.some(hasPdf);
    const rows = [];
    for (const attempt of info.attempts) {
      if (attempt.state !== "sent" || !attempt.gmailId) continue;
      const message = await getMessage(token, attempt.gmailId);
      const to = emailAddresses(header(message, "to")),
        cc = emailAddresses(header(message, "cc"));
      rows.push({
        company: attempt.company,
        day: attempt.day,
        sentAt: Number(message.internalDate),
        fromCaseAddress: fromAddress(header(message, "from")) === address,
        replyToCaseAddress:
          fromAddress(header(message, "reply-to")) === address,
        recipientsAllowed: chaseRecipientsAllowed(
          [...to, ...cc],
          process.env.CHASE_ALLOWLIST,
        ),
        passengerInCc: cc.includes(loaded.item.chase!.email),
        caseCodeInSubject: header(message, "subject").includes(args.code),
        messageIdRegistered:
          header(message, "message-id") === attempt.messageId,
        pdfAttached: hasPdf(message.payload),
        hasParent: !!header(message, "in-reply-to"),
      });
    }
    return {
      code: args.code,
      mails: rows,
      oneGmailThread:
        new Set(
          info.attempts
            .filter((a: { state: string }) => a.state === "sent")
            .map((a) => a.threadId),
        ).size === 1,
    };
  },
});
export const confirmSendPermission = internalAction({
  args: { recipient: v.string() },
  returns: v.object({
    accepted: v.boolean(),
    onlyRequestedRecipient: v.boolean(),
    ccCount: v.number(),
    bccCount: v.number(),
  }),
  handler: async (ctx, args) => {
    if (!chaseAddressAllowed(args.recipient, process.env.CHASE_ALLOWLIST))
      throw new Error("Recipient is not allowed");
    const connection = await ctx.runQuery(internal.chase.sendConnection, {});
    if (!connection) throw new Error("Sending permission not granted");
    await ctx.runMutation(internal.chase.reserveProbe, {});
    const token = await accessToken(connection.encryptedRefreshToken);
    const sent = await googleJson<{ id: string }>(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      token,
      {
        method: "POST",
        body: JSON.stringify({
          raw: rawMail(
            process.env.TICKBACK_INBOX_ADDRESS!,
            [args.recipient],
            [],
            "Demo: Refund Genie send-permission check",
            "Test only. This confirms the case inbox can send with your Google permission. No real company is involved.",
            `<${crypto.randomUUID()}@refundgenie.local>`,
          ),
        }),
      },
    );
    const saved = await googleJson<{
      payload?: { headers?: { name: string; value: string }[] };
    }>(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${sent.id}?format=metadata&metadataHeaders=To&metadataHeaders=Cc&metadataHeaders=Bcc`,
      token,
    );
    const header = (name: string) =>
      saved.payload?.headers?.find((h) => h.name.toLowerCase() === name)
        ?.value ?? "";
    return {
      accepted: true,
      onlyRequestedRecipient:
        header("to").toLowerCase() === args.recipient.toLowerCase(),
      ccCount: header("cc") ? 1 : 0,
      bccCount: header("bcc") ? 1 : 0,
    };
  },
});
const encoded = (s: string) =>
  `=?UTF-8?B?${Buffer.from(s).toString("base64")}?=`;
function rawMail(
  from: string,
  to: string[],
  cc: string[],
  subject: string,
  body: string,
  messageId: string,
  pdf?: Uint8Array,
  parent?: string,
) {
  const boundary = `genie_${crypto.randomUUID()}`;
  const lines = [
    `From: Refund Genie <${from}>`,
    `Reply-To: ${from}`,
    `To: ${to.join(", ")}`,
    `Cc: ${cc.join(", ")}`,
    `Subject: ${encoded(subject)}`,
    `Message-ID: ${messageId}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(body).toString("base64"),
  ];
  if (parent)
    lines.splice(7, 0, `In-Reply-To: ${parent}`, `References: ${parent}`);
  if (pdf)
    lines.push(
      `--${boundary}`,
      "Content-Type: application/pdf; name=letter-of-authority.pdf",
      "Content-Disposition: attachment; filename=letter-of-authority.pdf",
      "Content-Transfer-Encoding: base64",
      "",
      Buffer.from(pdf).toString("base64"),
    );
  lines.push(`--${boundary}--`);
  return Buffer.from(lines.join("\r\n")).toString("base64url");
}
export const authorise = action({
  args: {
    ...access,
    name: v.string(),
    mobile: v.optional(v.string()),
    email: v.string(),
    accepted: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    if (
      !args.accepted ||
      args.name.trim().length < 3 ||
      args.name.length > 100 ||
      /[\r\n]/.test(args.name) ||
      args.email.length > 254 ||
      !/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(args.email)
    )
      throw new Error(
        "Add your full name and email and tick the permission line",
      );
    const item = await ctx.runQuery(internal.chase.loadAccess, {
      code: args.code,
      token: args.token,
    });
    const authorisedAt = Date.now();
    const bytes = await makeAuthorityLetter({
      code: item.code,
      name: args.name.trim(),
      mobile: "",
      email: args.email.trim(),
      company: [
        item.facts.airline,
        item.facts.bookedVia !== "direct" ? item.facts.bookedVia : null,
      ]
        .filter(Boolean)
        .join(" and "),
      pnr: item.facts.pnr,
      authorisedAt,
    });
    const letterId = await ctx.storage.store(
      new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
    );
    try {
      await ctx.runMutation(internal.chase.authorise, {
        code: args.code,
        token: args.token,
        name: args.name.trim(),
        mobile: "",
        email: args.email.trim().toLowerCase(),
        letterId,
        authorisedAt,
        encryptedCaseToken: await encryptToken(args.token),
      });
    } catch (e) {
      await ctx.storage.delete(letterId);
      throw e;
    }
    return null;
  },
});
export const send = internalAction({
  args: { caseId: v.id("cases") },
  returns: v.null(),
  handler: async (ctx, { caseId }) => {
    const loaded = await ctx.runQuery(internal.chase.load, { caseId });
    if (
      !loaded?.item.chase ||
      !loaded.draft?.body ||
      !loaded.draft.to ||
      !loaded.draft.subject ||
      loaded.draft.channel !== "email" ||
      !loaded.connection ||
      loaded.locked
    )
      return null;
    const reservation = await ctx.runMutation(internal.chase.reserve, {
      caseId,
      draftId: loaded.draft._id,
    });
    if (!reservation) return null;
    let primaryDelivered = false;
    try {
      const token = await accessToken(loaded.connection.encryptedRefreshToken);
      const from = caseInboxAddress(
        process.env.TICKBACK_INBOX_ADDRESS!,
        loaded.item.code,
      );
      const parent = loaded.attempts.find(
        (a: { state: string }) => a.state === "sent",
      );
      const letter = parent
        ? undefined
        : await ctx.storage.get(loaded.item.chase.letterId);
      if (!parent && !letter) throw new Error("Authority letter unavailable");
      const body = chaseBody(
        loaded.draft.body,
        loaded.item.chase.name,
        !parent,
      );
      const raw = rawMail(
        from,
        [loaded.draft.to],
        [...new Set([...(loaded.draft.cc ?? []), loaded.item.chase.email])],
        loaded.parentSubject ?? loaded.draft.subject,
        body,
        reservation.messageId,
        letter ? new Uint8Array(await letter.arrayBuffer()) : undefined,
        parent?.messageId,
      );
      if (
        !(await ctx.runQuery(internal.chase.stillActive, {
          caseId,
          authorisedAt: loaded.item.chase.authorisedAt,
          draftId: loaded.draft._id,
        }))
      )
        return null;
      const delivered = await googleJson<{ threadId: string; id: string }>(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        token,
        {
          method: "POST",
          body: JSON.stringify({
            raw,
            ...(parent?.threadId ? { threadId: parent.threadId } : {}),
          }),
        },
      );
      const saved = await googleJson<{
        payload?: { headers?: { name: string; value: string }[] };
      }>(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${delivered.id}?format=metadata&metadataHeaders=Message-ID`,
        token,
      );
      const messageId = saved.payload?.headers?.find(
        (h) => h.name.toLowerCase() === "message-id",
      )?.value;
      if (!messageId || !/^<[^\r\n<>]+>$/.test(messageId))
        throw new Error("Delivered mail reference unavailable");
      await ctx.runMutation(internal.chase.delivered, {
        id: reservation._id,
        threadId: delivered.threadId,
        messageId,
        gmailId: delivered.id,
      });
      primaryDelivered = true;
      const current = await ctx.runQuery(internal.chase.load, { caseId });
      await ctx.runAction(internal.chaseActions.notify, {
        caseId,
        key: `sent:${reservation._id}`,
        what: `Genie sent your refund mail to ${reservation.company}.`,
        reply: loaded.reply?.summary ?? "",
        next: current?.item.flightPlan?.checkDate
          ? `Watch for their reply; next check-in ${current.item.flightPlan.checkDate}.`
          : "Watch for their reply on your case.",
      });
    } catch {
      if (!primaryDelivered)
        await ctx.runMutation(internal.chase.uncertain, {
          id: reservation._id,
        });
    }
    return null;
  },
});

export const notify = internalAction({
  args: {
    caseId: v.id("cases"),
    key: v.string(),
    what: v.string(),
    reply: v.string(),
    next: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const loaded = await ctx.runQuery(internal.chase.load, {
      caseId: args.caseId,
    });
    if (
      !loaded?.item.chase ||
      !loaded.connection?.chaseSendGranted ||
      !chaseAddressAllowed(loaded.item.chase.email, process.env.CHASE_ALLOWLIST)
    )
      return null;
    const id = await ctx.runMutation(internal.chase.reserveNotice, {
      caseId: args.caseId,
      key: args.key,
    });
    if (!id) return null;
    try {
      const token = await accessToken(loaded.connection.encryptedRefreshToken);
      if (
        !(await ctx.runQuery(internal.chase.stillActive, {
          caseId: args.caseId,
          authorisedAt: loaded.item.chase.authorisedAt,
        }))
      )
        return null;
      const from = caseInboxAddress(
        process.env.TICKBACK_INBOX_ADDRESS!,
        loaded.item.code,
      );
      const url = privateCaseUrl(publicAppUrl(process.env), loaded.item.code, await decryptToken(loaded.item.chase.encryptedCaseToken));
      const body = [
        args.what,
        args.reply ? `Their reply: ${args.reply}` : "",
        `Next: ${args.next}`,
        `Your case: ${url}`,
        "You can stop Genie from your case screen.",
      ]
        .filter(Boolean)
        .join("\n\n");
      await googleJson(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        token,
        {
          method: "POST",
          body: JSON.stringify({
            raw: rawMail(
              from,
              [loaded.item.chase.email],
              [],
              `Genie update [${loaded.item.code}]`,
              body,
              `<${crypto.randomUUID()}@refundgenie.local>`,
            ),
          }),
        },
      );
      await ctx.runMutation(internal.chase.finishNotice, { id, state: "sent" });
    } catch {
      await ctx.runMutation(internal.chase.finishNotice, {
        id,
        state: "uncertain",
      });
    }
    return null;
  },
});

export const reconcileDemoHeader = internalAction({
  args: { code: v.string() },
  returns: v.object({
    reconciled: v.boolean(),
    fromCaseAddress: v.boolean(),
    replyToCaseAddress: v.boolean(),
  }),
  handler: async (
    ctx,
    args,
  ): Promise<{
    reconciled: boolean;
    fromCaseAddress: boolean;
    replyToCaseAddress: boolean;
  }> => {
    const info = await ctx.runQuery(internal.chase.inspectByCode, args);
    const sent = info?.attempts.filter(
      (a: { state: string }) => a.state === "sent",
    );
    const connection = await ctx.runQuery(internal.chase.sendConnection, {});
    if (!info?.active || sent?.length !== 1 || !connection || !sent[0].threadId)
      throw new Error("Only one authorised demo delivery can be reconciled");
    const token = await accessToken(connection.encryptedRefreshToken);
    const thread = await googleJson<{ messages: GmailMessage[] }>(
      `https://gmail.googleapis.com/gmail/v1/users/me/threads/${sent[0].threadId}?format=metadata&metadataHeaders=Message-ID&metadataHeaders=From&metadataHeaders=Reply-To&metadataHeaders=Subject`,
      token,
    );
    const own = thread.messages.filter(
      (m) =>
        chaseMailbox(fromAddress(header(m, "from"))) ===
          chaseMailbox(process.env.TICKBACK_INBOX_ADDRESS!) &&
        header(m, "subject").includes(args.code) &&
        Number(m.internalDate) >= sent[0].createdAt - 10000,
    );
    if (own.length !== 1)
      throw new Error("Delivery reference needs manual checking");
    const messageId = header(own[0], "message-id");
    if (!/^<[^\r\n<>]+>$/.test(messageId))
      throw new Error("Invalid delivered reference");
    await ctx.runMutation(internal.chase.recordMessageId, {
      id: sent[0]._id,
      messageId,
      gmailId: own[0].id,
    });
    const address = caseInboxAddress(
      process.env.TICKBACK_INBOX_ADDRESS!,
      args.code,
    ).toLowerCase();
    return {
      reconciled: true,
      fromCaseAddress: fromAddress(header(own[0], "from")) === address,
      replyToCaseAddress: fromAddress(header(own[0], "reply-to")) === address,
    };
  },
});
