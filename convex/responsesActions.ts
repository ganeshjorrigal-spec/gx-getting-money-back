"use node";

import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { decryptToken } from "../lib/token-crypto";

const headers = ["case code", "created", "name", "contact", "platform", "amount", "route", "due date", "stage", "channel", "last reply date", "feedback"];

async function accessToken(encryptedRefreshToken: string): Promise<string> {
  const id = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!id || !secret) throw new Error("Google connection is not configured");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ refresh_token: await decryptToken(encryptedRefreshToken), client_id: id, client_secret: secret, grant_type: "refresh_token" }),
  });
  if (!response.ok) throw new Error(`Google token refresh failed (${response.status})`);
  const body = await response.json() as { access_token?: string };
  if (!body.access_token) throw new Error("Google token refresh returned no access token");
  return body.access_token;
}

async function googleJson<T>(url: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { Authorization: `Bearer ${token}`, ...(init?.body ? { "Content-Type": "application/json" } : {}) } });
  if (!response.ok) {
    const failure = await response.json().catch(() => null) as { error?: { status?: string; details?: Array<{ reason?: string; metadata?: { service?: string; consumer?: string } }> } } | null;
    const detail = failure?.error?.details?.[0];
    throw new Error(`Google API request failed (${response.status}; ${failure?.error?.status ?? "unknown"}; ${detail?.reason ?? "unknown"}; ${detail?.metadata?.service ?? "unknown"}; ${detail?.metadata?.consumer ?? "unknown"})`);
  }
  return await response.json() as T;
}

function safeCell(value: string | number): string | number {
  if (typeof value === "number") return value;
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function indiaTimestamp(value: number | null): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(value));
}

export const finishSetup = internalAction({
  args: { connectionId: v.id("googleConnections") }, returns: v.string(),
  handler: async (ctx, { connectionId }) => {
    const context = await ctx.runQuery(internal.responsesData.sheetContext, {});
    const connection = context?.connection?._id === connectionId ? context.connection : await ctx.runQuery(internal.googleConnect.connectionById, { connectionId });
    if (!connection || connection.kind !== "responses") throw new Error("Responses connection is unavailable");
    const shareEmail = process.env.RESPONSES_SHEET_SHARE_EMAIL;
    if (!shareEmail) throw new Error("Responses sheet sharing is not configured");
    const token = await accessToken(connection.encryptedRefreshToken);
    const created = await googleJson<{ spreadsheetId: string }>("https://sheets.googleapis.com/v4/spreadsheets", token, {
      method: "POST", body: JSON.stringify({ properties: { title: "Tickback Responses" }, sheets: [{ properties: { title: "Cases" } }] }),
    });
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${created.spreadsheetId}/edit`;
    await googleJson(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(created.spreadsheetId)}/values/${encodeURIComponent("Cases!A1:L1")}?valueInputOption=RAW`, token, {
      method: "PUT", body: JSON.stringify({ range: "Cases!A1:L1", majorDimension: "ROWS", values: [headers] }),
    });
    await googleJson(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(created.spreadsheetId)}/permissions?sendNotificationEmail=true`, token, {
      method: "POST", body: JSON.stringify({ type: "user", role: "writer", emailAddress: shareEmail }),
    });
    await ctx.runMutation(internal.responsesData.saveConfig, { connectionId, spreadsheetId: created.spreadsheetId, sheetUrl });
    await ctx.runAction(internal.responsesActions.syncAll, {});
    return sheetUrl;
  },
});

export const resumeSetup = internalAction({
  args: {}, returns: v.string(),
  handler: async (ctx): Promise<string> => {
    const connection: { _id: import("./_generated/dataModel").Id<"googleConnections"> } | null = await ctx.runQuery(internal.googleConnect.connectionByKind, { kind: "responses" });
    if (!connection) throw new Error("Responses Google connection is unavailable");
    return await ctx.runAction(internal.responsesActions.finishSetup, { connectionId: connection._id });
  },
});

export const syncCase = internalAction({
  args: { caseId: v.id("cases") }, returns: v.null(),
  handler: async (ctx, { caseId }) => {
    const context = await ctx.runQuery(internal.responsesData.sheetContext, {});
    if (!context) return null;
    const data = await ctx.runQuery(internal.responsesData.caseRow, { caseId });
    if (!data) return null;
    const row = await ctx.runMutation(internal.responsesData.reserveRow, { caseId });
    if (!row) return null;
    const token = await accessToken(context.connection.encryptedRefreshToken);
    const values = [[
      data.code, indiaTimestamp(data.createdAt), data.name, data.contact, data.platform, data.amount,
      data.route, data.dueDate, data.stage, data.channel, indiaTimestamp(data.lastReplyAt), data.feedback,
    ].map(safeCell)];
    const range = `Cases!A${row}:L${row}`;
    await googleJson(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(context.config.spreadsheetId)}/values/${encodeURIComponent(range)}?valueInputOption=RAW`, token, {
      method: "PUT", body: JSON.stringify({ range, majorDimension: "ROWS", values }),
    });
    return null;
  },
});

export const clearCase = internalAction({
  args: { caseId: v.id("cases"), attempt: v.optional(v.number()) }, returns: v.null(),
  handler: async (ctx, { caseId, attempt = 0 }) => {
    const context = await ctx.runQuery(internal.responsesData.sheetContext, {});
    const row = await ctx.runQuery(internal.responsesData.rowForCase, { caseId });
    if (!context || !row) return null;
    try {
      const token = await accessToken(context.connection.encryptedRefreshToken);
      const range = `Cases!A${row.row}:L${row.row}`;
      await googleJson(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(context.config.spreadsheetId)}/values/${encodeURIComponent(range)}:clear`, token, { method: "POST", body: "{}" });
      await ctx.runMutation(internal.responsesData.removeRow, { id: row._id });
    } catch {
      if (attempt < 2) await ctx.scheduler.runAfter(30_000, internal.responsesActions.clearCase, { caseId, attempt: attempt + 1 });
    }
    return null;
  },
});

export const syncAll = internalAction({
  args: {}, returns: v.null(),
  handler: async (ctx) => {
    if (!await ctx.runQuery(internal.responsesData.sheetContext, {})) return null;
    const caseIds = await ctx.runQuery(internal.responsesData.caseIds, {});
    for (const caseId of caseIds) {
      try { await ctx.runAction(internal.responsesActions.syncCase, { caseId }); }
      catch { /* A later change or scheduled sync retries this row. */ }
    }
    return null;
  },
});

type SheetQa = { connected: boolean; headersOk: boolean; rowCount: number; hasCode: boolean };

export const qaSheet = internalAction({
  args: { code: v.optional(v.string()) },
  returns: v.object({ connected: v.boolean(), headersOk: v.boolean(), rowCount: v.number(), hasCode: v.boolean() }),
  handler: async (ctx, { code }): Promise<SheetQa> => {
    const context: { config: { spreadsheetId: string }; connection: { encryptedRefreshToken: string } } | null = await ctx.runQuery(internal.responsesData.sheetContext, {});
    if (!context) return { connected: false, headersOk: false, rowCount: 0, hasCode: false };
    const token = await accessToken(context.connection.encryptedRefreshToken);
    const result: { values?: Array<Array<string | number>> } = await googleJson(
      `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(context.config.spreadsheetId)}/values/${encodeURIComponent("Cases!A1:L500")}`,
      token,
    );
    const rows: Array<Array<string | number>> = result.values ?? [];
    const first: Array<string | number> = rows[0] ?? [];
    return {
      connected: true,
      headersOk: headers.every((header, index) => first[index] === header),
      rowCount: Math.max(0, rows.length - 1),
      hasCode: !!code && rows.slice(1).some((row) => row[0] === code),
    };
  },
});
