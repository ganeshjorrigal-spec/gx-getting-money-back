"use client";
import {useState} from 'react';
import {aiBusyMessage,aiCaseDailyMessage} from '../../lib/ai-busy';
export function AiBusyNotice({onRetry,daily=false}: {onRetry: () => Promise<unknown>;daily?:boolean}) {
  const [busy, setBusy] = useState(false);
  return <section className="case-card" role="alert"><h2>{aiBusyMessage,aiCaseDailyMessage}</h2><p>Your message and screenshots are saved.</p><button className="button button-primary" disabled={busy} onClick={async () => {setBusy(true); try {await onRetry();} catch { /* Keep the saved case and manual retry available. */ } finally {setBusy(false);}}}>Try again</button></section>;
}
