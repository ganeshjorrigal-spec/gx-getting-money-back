"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { caseCopy as c, productName } from "../../copy";
import { forgetCase, getDeviceId, saveCase } from "../../../lib/case-link";
import { displayDate } from "../../../lib/dates";
import { buildGoogleCalendar, buildIcs, buildMailto, buildUpiLink, checkinDate } from "../../../lib/outbound";
import { redact } from "../../../lib/redact";
import { compressScreenshot } from "../../../lib/images";

type CaseView = {
  code: string; stage: string; route: keyof typeof c.routeLabels | null; routeConfidence: number | null;
  platform: string | null; eventName: string | null; amountPaise: number | null; dueDate: string | null;
  dueSource: string | null; dueSourceText: string | null; nextStep: string | null;
  questions: { id: string; text: string; options: string[] }[]; progress: { step: string; at: number } | null;
  tier: string; paidState: string; compensationRupees: number | null; updatedAt: number;
  createdAt: number; recoveredPaise: number | null; ladderLevel: number; draftsShown: number;
  actionsRequired: { action: string; deadline: string | null; link: string | null }[];
  outOfScopeCategory: string | null; situation: string | null;
  checkin: { date: string; reason: string; status: string } | null; paymentsEnabled: boolean;
  upiVpa: string | null; upiName: string;
  feedbackGiven: boolean;
};
type Draft = { _id: Id<"drafts">; step: string; channel: string; status: string; to?: string; subject?: string; body: string | null; attachChecklist: string[] };
type Event = { _id: string; type: string; summary: string; createdAt: number };
const money = (paise: number | null) => paise == null ? "refund" : `₹${(paise / 100).toLocaleString("en-IN")}`;

export default function CasePage() {
  const { code } = useParams<{ code: string }>();
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [answer, setAnswer] = useState("");
  const [earlier, setEarlier] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [sendOpen, setSendOpen] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState("");
  const [replyImage, setReplyImage] = useState<File | null>(null);
  const [sentPrompt, setSentPrompt] = useState(false);
  const [landedOpen, setLandedOpen] = useState(false);
  const [landedAmount, setLandedAmount] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [waitlistContact, setWaitlistContact] = useState("");
  const [waitlistDone, setWaitlistDone] = useState(false);
  const [allEvents, setAllEvents] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [qrImage, setQrImage] = useState("");
  const [unknownAmount, setUnknownAmount] = useState("");
  const [feedbackWorth, setFeedbackWorth] = useState<boolean | null>(null);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const caseData = useQuery(api.cases.get, token ? { code, token } : "skip") as CaseView | null | undefined;
  const drafts = useQuery(api.cases.drafts, token && caseData ? { code, token } : "skip") as Draft[] | undefined;
  const events = useQuery(api.cases.timeline, token && caseData ? { code, token } : "skip") as Event[] | undefined;
  const answerQuestions = useMutation(api.cases.answerQuestions);
  const retry = useMutation(api.cases.retry);
  const addReply = useMutation(api.cases.addReply);
  const uploadUrl = useMutation(api.files.generateUploadUrl);
  const markSent = useMutation(api.cases.markSent);
  const markActionDone = useMutation(api.cases.markActionDone);
  const answerCheckin = useMutation(api.cases.answerCheckin);
  const removeCase = useMutation(api.cases.remove);
  const joinWaitlist = useMutation(api.waitlist.join);
  const claimPayment = useMutation(api.payments.claim);
  const setAmount = useMutation(api.cases.setAmount);
  const sendFeedback = useMutation(api.feedback.send);

  useEffect(() => {
    const readKey = () => {
      const match = location.hash.match(/^#k=([A-Za-z0-9_-]{43})$/);
      setToken(match?.[1] ?? null);
      setReady(true);
    };
    readKey();
    window.addEventListener("hashchange", readKey);
    return () => window.removeEventListener("hashchange", readKey);
  }, []);
  useEffect(() => {
    if (caseData?.stage !== "TRIAGING") return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [caseData?.stage]);
  useEffect(() => {
    if (!caseData || !token) return;
    saveCase({ code, token, title: caseData.eventName || code, amountPaise: caseData.amountPaise ?? undefined, route: caseData.route ?? undefined, updatedAt: caseData.updatedAt });
  }, [caseData, code, token]);
  useEffect(() => {
    const draft = drafts?.[0];
    if (!draft) return;
    setTo(draft.to ?? "");
    setSubject(draft.subject ?? "");
    setBody(draft.body ?? "");
  }, [drafts]);
  useEffect(() => {
    if (!payOpen || !caseData?.upiVpa) return;
    import("qrcode").then((qrcode) => qrcode.toDataURL(buildUpiLink(caseData.upiVpa!, caseData.upiName, code), { width: 320, margin: 2 })).then(setQrImage).catch(() => setQrImage(""));
  }, [payOpen, caseData?.upiVpa, caseData?.upiName, code]);

  async function submitAnswer(value = answer) {
    if (!token || !value.trim()) return;
    setBusy(true);
    try { await answerQuestions({ code, token, answers: value.trim() }); setAnswer(""); setEarlier(false); setNotice(""); }
    catch { setNotice(c.error); }
    finally { setBusy(false); }
  }

  async function copy(value: string) {
    try { await navigator.clipboard.writeText(value); setNotice(c.copied); }
    catch { setNotice("Copy failed. Select and copy the text instead."); }
  }

  function checkinDetails(data: CaseView) {
    const date = checkinDate(data.dueDate!);
    const amount = money(data.amountPaise);
    const eventName = data.eventName ?? "your event";
    const link = window.location.href;
    return { date, title: c.calendarTitle(amount, eventName), description: c.calendarDescription(amount, eventName, link) };
  }

  function addCalendar(kind: "google" | "ics") {
    if (!caseData?.dueDate) return;
    const details = checkinDetails(caseData);
    if (kind === "google") { window.open(buildGoogleCalendar(details.date, details.title, details.description), "_blank", "noopener,noreferrer"); return; }
    const ics = buildIcs({ code, date: details.date, title: details.title, description: details.description, domain: location.hostname, checkinId: details.date });
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `tickback-${code}.ics`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Calendar file downloaded. Open it to add your check-in.");
  }

  async function share() {
    const link = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: productName, text: `My refund case for ${caseData?.eventName ?? "my event"}: ${link}`, url: link });
      else await copy(link);
    } catch { /* The person cancelled the share sheet. */ }
  }

  async function shareLanded() {
    const link = `${location.origin}/?ref=landed`;
    const text = `Got my ${money(caseData?.recoveredPaise ?? null)} ticket refund back. Tickback helped me track the date and next steps: ${link}`;
    try {
      if (navigator.share) await navigator.share({ title: productName, text, url: link });
      else await copy(text);
    } catch { /* The person cancelled the share sheet. */ }
  }

  async function feedback() {
    if (!token || feedbackWorth == null) return;
    setBusy(true);
    try { await sendFeedback({ code, token, worthIt: feedbackWorth, comment: feedbackComment.trim() || undefined }); setFeedbackSent(true); setNotice("Thanks for telling us."); }
    catch { setNotice(c.error); }
    finally { setBusy(false); }
  }

  async function openEmail() {
    if (!body.trim()) return;
    if (drafts?.[0]?.channel !== "email") { await copy(body); setSentPrompt(true); return; }
    if (!to.trim() || !subject.trim()) return;
    const result = buildMailto(to, subject, body);
    if (result.copyFirst) { await copy(body); setNotice("Message copied. Paste it into the email."); }
    window.location.href = result.url;
    setSentPrompt(true);
  }

  async function markDraftSent() {
    if (!token || !drafts?.[0]) return;
    setBusy(true);
    try { await markSent({ code, token, draftId: drafts[0]._id }); setSentPrompt(false); setSendOpen(false); setNotice("Marked as sent. We'll check back with you."); }
    catch { setNotice(c.error); }
    finally { setBusy(false); }
  }

  async function actionDone() {
    if (!token) return;
    setBusy(true);
    try { await markActionDone({ code, token }); setNotice("Saved. Working out your new check-in date…"); }
    catch { setNotice(c.error); }
    finally { setBusy(false); }
  }

  async function submitReply() {
    if (!token || (!reply.trim() && !replyImage)) return;
    setBusy(true);
    try {
      const storageIds: Id<"_storage">[] = [];
      if (replyImage) {
        const blob = await compressScreenshot(replyImage);
        const url = await uploadUrl({ deviceId: getDeviceId() });
        const response = await fetch(url, { method: "POST", headers: { "Content-Type": "image/jpeg" }, body: blob });
        if (!response.ok) throw new Error("Could not upload screenshot");
        const result = await response.json() as { storageId: Id<"_storage"> };
        storageIds.push(result.storageId);
      }
      await addReply({ code, token, text: redact(reply.trim()) || undefined, storageIds });
      setReply(""); setReplyImage(null); setReplyOpen(false); setNotice("");
    } catch { setNotice("Couldn't read the reply yet. Your text is still here. Try again."); }
    finally { setBusy(false); }
  }

  async function checkin(answerValue: "landed" | "not_yet" | "replied") {
    if (!token || !caseData) return;
    if (answerValue === "replied") { setReplyOpen(true); return; }
    if (answerValue === "landed") { setLandedAmount(caseData.amountPaise == null ? "" : String(caseData.amountPaise / 100)); setLandedOpen(true); return; }
    setBusy(true);
    try { await answerCheckin({ code, token, answer: "not_yet" }); setNotice("Finding your next step…"); }
    catch { setNotice(c.error); }
    finally { setBusy(false); }
  }

  async function confirmLanded() {
    if (!token) return;
    const amountPaise = Math.round(Number(landedAmount) * 100);
    if (!Number.isFinite(amountPaise) || amountPaise < 0) { setNotice("Enter the amount that came back."); return; }
    setBusy(true);
    try { await answerCheckin({ code, token, answer: "landed", amountPaise }); setLandedOpen(false); }
    catch { setNotice(c.error); }
    finally { setBusy(false); }
  }

  async function deleteCase() {
    if (!token) return;
    setBusy(true);
    try { await removeCase({ code, token }); forgetCase(code); setDeleteOpen(false); setDeleted(true); }
    catch { setNotice("Couldn't delete this case. Please try again."); }
    finally { setBusy(false); }
  }

  async function waitlist() {
    if (!caseData || !waitlistContact.trim()) return;
    setBusy(true);
    try { await joinWaitlist({ category: caseData.outOfScopeCategory ?? "other", contact: waitlistContact.trim(), deviceId: getDeviceId() }); setWaitlistDone(true); }
    catch { setNotice("Enter an email or phone number and try again."); }
    finally { setBusy(false); }
  }

  async function saveAmount() {
    if (!token) return;
    const amountPaise = Math.round(Number(unknownAmount) * 100);
    if (!Number.isFinite(amountPaise) || amountPaise < 0) { setNotice("Enter the amount you paid."); return; }
    setBusy(true);
    try { await setAmount({ code, token, amountPaise }); setUnknownAmount(""); }
    catch { setNotice(c.error); }
    finally { setBusy(false); }
  }

  async function paid() {
    if (!token) return;
    setBusy(true);
    try { await claimPayment({ code, token }); setPayOpen(false); setNotice("Marked as paid. We will check it by hand."); }
    catch { setNotice(c.error); }
    finally { setBusy(false); }
  }

  const invalid = ready && !token;
  const route = caseData?.route;
  const title = route === "WAIT" && caseData?.dueDate ? `Your ${money(caseData.amountPaise)} should land by ${displayDate(caseData.dueDate)}.`
    : route === "OVERDUE" && caseData?.dueDate ? `Your ${money(caseData.amountPaise)} was due by ${displayDate(caseData.dueDate)}.`
    : route ? c.routeLabels[route] : "";
  const question = caseData?.questions?.[0];
  const stepIndex = { reading: 0, route: 1, date: 2, writing: 3, done: 4, failed: 0 }[caseData?.progress?.step ?? "reading"] ?? 0;
  const isIOS = ready && /iPhone|iPad|iPod/.test(navigator.userAgent);
  const isAndroid = ready && /Android/.test(navigator.userAgent);
  const messageSteps = ["L0_email", "L0_chat", "L1", "L2", "TRACE_ask", "TRACE_bank", "FAILED_bank", "NO_ROUTE_ask", "ACTION_form"];
  const locked = !!caseData?.paymentsEnabled && caseData.tier !== "free_small" && !["claimed", "confirmed"].includes(caseData.paidState) && caseData.draftsShown >= 1 && messageSteps.includes(caseData.nextStep ?? "") && (drafts?.[0]?.step !== caseData.nextStep || !drafts?.[0]?.body);

  return <main className="case-shell">
    <header className="site-header"><Link className="wordmark" href="/">{productName}<span className="wordmark-dot">.</span></Link><span className="case-code">{code}</span></header>
    <div className="case-wrap">
      {deleted ? <div className="case-card bad-link" role="status"><h1>Deleted.</h1><Link className="text-link" href="/">Back to Tickback</Link></div>
        : invalid || (ready && caseData === null) ? <div className="case-card bad-link" role="alert"><h1>{c.badLink}</h1><Link className="text-link" href="/">Back to Tickback</Link></div>
        : caseData == null ? <div className="case-card case-loading"><p>{c.progress[0]}…</p></div>
        : <>
          <div className="case-heading"><p className="section-kicker">{caseData.platform ?? "YOUR CASE"}</p><h1>{caseData.eventName ?? "Your refund case"}</h1><p>{code}</p></div>
          {caseData.stage === "DUE" && <article className="case-card checkin-card" aria-live="polite">
            <p className="section-kicker">YOUR CHECK-IN</p><h2>Has your {money(caseData.amountPaise)} landed?</h2>
            <div className="stacked-actions"><button className="button button-primary" onClick={() => checkin("landed")}>It&apos;s in</button><button className="button button-secondary" disabled={busy} onClick={() => checkin("not_yet")}>Not yet</button><button className="text-button" onClick={() => checkin("replied")}>They replied</button></div>
          </article>}
          {caseData.stage === "CLOSED_LANDED" && <article className="case-card landed-card"><p className="section-kicker">CASE CLOSED</p><h2>{money(caseData.recoveredPaise)} back.</h2><p>Your refund landed. Your case history stays here until you delete it.</p><button className="button button-secondary" onClick={shareLanded}>Tell a friend who&apos;s waiting on a refund</button>{caseData.feedbackGiven || feedbackSent ? <p>Thanks for your feedback.</p> : <div className="feedback-form"><p>Was this worth it?</p><div className="answer-options"><button className="situation-chip" aria-pressed={feedbackWorth === true} onClick={() => setFeedbackWorth(true)}>Yes</button><button className="situation-chip" aria-pressed={feedbackWorth === false} onClick={() => setFeedbackWorth(false)}>Not really</button></div>{feedbackWorth != null && <><label htmlFor="feedback-comment">Anything we should fix? (optional)</label><input id="feedback-comment" value={feedbackComment} onChange={(event) => setFeedbackComment(event.target.value)} maxLength={500} /><button className="button button-secondary" onClick={feedback} disabled={busy}>Send feedback</button></>}</div>}</article>}
          {caseData.stage === "TRIAGING" && <article className="case-card progress-card" aria-live="polite">
            <h2>Working out your refund</h2>
            <ol>{c.progress.map((step, index) => <li className={index < stepIndex ? "progress-done" : index === stepIndex ? "progress-current" : ""} key={step}><span>{index < stepIndex ? "✓" : index + 1}</span>{step}</li>)}</ol>
            {elapsed >= 12 && <p>{c.working}</p>}
          </article>}
          {caseData.stage === "ERROR" && <article className="case-card" role="alert"><h2>{c.error}</h2><button className="button button-primary" onClick={() => token && retry({ code, token })}>{c.retry}</button></article>}
          {route && !["ERROR", "CLOSED_LANDED", "TRIAGING"].includes(caseData.stage) && <article className="case-card status-card">
            <span className={`route-chip ${route === "OVERDUE" || route === "ACTION_NEEDED" ? "caution-chip" : ""}`}>{c.routeLabels[route]}</span>
            {caseData.amountPaise != null && <p className="case-amount">{money(caseData.amountPaise)}</p>}
            <h2>{title}</h2>
            {caseData.dueDate && <div className="due-block"><span>Due date</span><strong>{displayDate(caseData.dueDate)}</strong></div>}
            {caseData.dueSourceText && <p className="example-source">{caseData.dueSourceText}</p>}
            {route === "FAILED_PAYMENT" && caseData.compensationRupees != null && <p className="input-hint">Your bank may owe ₹{caseData.compensationRupees.toLocaleString("en-IN")} on top under the failed-payment rule.</p>}
            {caseData.routeConfidence != null && caseData.routeConfidence < 0.6 && <p className="input-hint">We think this is {c.routeLabels[route]}. Is that right?</p>}
          </article>}
          {caseData.stage === "NEED_INFO" && question && <article className="case-card">
            <p className="section-kicker">{c.needInfo}</p><h2>{question.text}</h2>
            <div className="answer-options">{question.options.map((option) => <button className="situation-chip" key={option} onClick={() => option === "Earlier" ? setEarlier(true) : submitAnswer(option)} disabled={busy}>{option}</button>)}</div>
            {(earlier || question.options.length === 0) && <div className="answer-form"><label htmlFor="case-answer">{earlier ? "Choose the date" : "Your answer"}</label><input id="case-answer" type={earlier ? "date" : "text"} value={answer} onChange={(event) => setAnswer(event.target.value)} /><button className="button button-primary" onClick={() => submitAnswer()} disabled={!answer || busy}>{c.continue}</button></div>}
          </article>}
          {route === "WAIT" && caseData.dueDate && !["CLOSED_LANDED", "TRIAGING"].includes(caseData.stage) && <article className="case-card">
            <p className="section-kicker">THE NEXT STEP</p><h2>{c.waitNext}</h2><p>Your check-in: {displayDate(checkinDate(caseData.dueDate))}. Add it to your calendar so you don&apos;t miss it.</p>
          </article>}
          {route === "OVERDUE" && !["CLOSED_LANDED", "TRIAGING"].includes(caseData.stage) && <article className="case-card">
            <p className="section-kicker">THE NEXT STEP</p><h2>{caseData.nextStep === "L1" ? `Escalate to ${caseData.platform ?? "the organiser"}'s Grievance Officer` : `Ask ${caseData.platform ?? "the organiser"} support in writing`}</h2><p>{caseData.nextStep === "L1" ? "Under the rules, they must acknowledge within 48 hours and resolve within a month." : "Email leaves a dated record. That matters if you need to go higher."}</p>
            {locked ? <p className="input-hint">Your next message is ready after you unlock this case.</p> : drafts?.[0]?.body && drafts[0].status !== "sent" ? <button className="button button-primary" onClick={() => setSendOpen(true)}>{drafts[0].channel === "email" ? c.openEmail : "Open my next step"}</button> : caseData.stage === "WAITING" ? <p className="input-hint">Waiting for their reply. We&apos;ll check in with you.</p> : <p className="input-hint">Writing your next step…</p>}
          </article>}
          {route === "ACTION_NEEDED" && caseData.stage !== "TRIAGING" && <article className="case-card"><p className="section-kicker">THE NEXT STEP</p><h2>Do these before the deadline</h2><ul className="checklist">{caseData.actionsRequired.map((action, index) => <li key={index}>{action.action}{action.deadline ? ` — by ${displayDate(action.deadline)}` : ""}{action.link && <a className="text-link" href={action.link} target="_blank" rel="noreferrer"> Open form</a>}</li>)}</ul><p>Keep a photo or screenshot of every step you complete.</p>{drafts?.[0]?.body && <button className="button button-secondary" onClick={() => setSendOpen(true)}>Open form message</button>}<button className="button button-primary" onClick={actionDone} disabled={busy}>I&apos;ve done this</button></article>}
          {route === "TRACE" && caseData.stage !== "TRIAGING" && <article className="case-card"><p className="section-kicker">THE NEXT STEP</p><h2>{caseData.nextStep === "TRACE_bank" ? "Ask your bank to trace it" : "Ask for the refund reference"}</h2><p>{caseData.nextStep === "TRACE_bank" ? "The company gave a reference. Use it in your bank's help section." : "Get the ARN or UTR, then your bank can trace it."}</p>{drafts?.[0]?.body && drafts[0].status !== "sent" && <button className="button button-primary" onClick={() => setSendOpen(true)}>{caseData.nextStep === "TRACE_bank" ? "Open bank message" : c.openEmail}</button>}</article>}
          {route === "FAILED_PAYMENT" && caseData.stage !== "TRIAGING" && <article className="case-card"><p className="section-kicker">THE NEXT STEP</p><h2>{caseData.nextStep === "none" ? "Wait for the reversal" : "Ask your bank to reverse it"}</h2><p>Keep the payment debit and the failed-payment screen.</p>{drafts?.[0]?.body && drafts[0].status !== "sent" && <button className="button button-primary" onClick={() => setSendOpen(true)}>Open bank message</button>}</article>}
          {route === "NO_ROUTE" && caseData.stage !== "TRIAGING" && <article className="case-card"><p className="section-kicker">YOUR OPTIONS</p>{caseData.situation === "cant_attend" ? <><h2>You can&apos;t go</h2><p>{caseData.platform?.toLowerCase().includes("district") ? "District's ticket terms do not allow cancellation, transfer or refund just because you cannot attend." : "A refund just because you cannot attend may not be available. Check your booking terms and ask the organiser about any exception."}</p></> : <><h2>Ask about the new date</h2><p>The organiser has not offered a refund yet. Ask whether you can request one and by when.</p>{drafts?.[0]?.body && drafts[0].status !== "sent" && <button className="button button-primary" onClick={() => setSendOpen(true)}>{c.openEmail}</button>}</>}</article>}
          {route === "OUT_OF_SCOPE" && <article className="case-card"><p>We&apos;re starting with event tickets. The National Consumer Helpline handles complaints about any company: <a className="text-link" href="https://consumerhelpline.gov.in" target="_blank" rel="noreferrer">consumerhelpline.gov.in</a> or 1915.</p>{waitlistDone ? <p role="status">Thanks. We&apos;ll tell you once, when it&apos;s ready.</p> : <div className="answer-form"><label htmlFor="waitlist">Tell me when {caseData.outOfScopeCategory ?? "this"} refunds are ready</label><input id="waitlist" type="text" value={waitlistContact} onChange={(event) => setWaitlistContact(event.target.value)} placeholder="Email or phone" /><button className="button button-secondary" onClick={waitlist} disabled={busy || !waitlistContact.trim()}>Join the waitlist</button></div>}</article>}
          {caseData.stage !== "TRIAGING" && <article className="case-card">
            <h2>{c.saveTitle}</h2>
            <div className="save-actions">
              {caseData.dueDate && !isIOS && <button className="button button-secondary" onClick={() => addCalendar("google")}>{c.calendar}{!isAndroid ? " (Google)" : ""}</button>}
              {caseData.dueDate && !isAndroid && <button className="button button-secondary" onClick={() => addCalendar("ics")}>{c.calendar}{!isIOS ? " (.ics)" : ""}</button>}
              <button className="button button-secondary" onClick={() => copy(window.location.href)}>{c.copyLink}</button>
              <button className="button button-secondary" onClick={share}>{c.share}</button>
            </div>
            <p className="example-source">{c.linkNote}</p>
          </article>}
          {caseData.paymentsEnabled && caseData.draftsShown >= 1 && caseData.tier !== "free_small" && !["claimed", "confirmed"].includes(caseData.paidState) && <article className="case-card pay-card"><p className="section-kicker">STAY ON IT</p>{caseData.tier === "unknown_amount" ? <><h2>How much did you pay?</h2><p>Refunds under ₹300 stay free.</p><div className="answer-form"><label htmlFor="paid-amount">Amount paid in ₹</label><input id="paid-amount" type="number" min="0" step="0.01" value={unknownAmount} onChange={(event) => setUnknownAmount(event.target.value)} /><button className="button button-primary" disabled={busy || !unknownAmount} onClick={saveAmount}>Continue</button></div></> : <><h2>Every message after the first, written for you.</h2><p>₹49 for this case, until the money lands.</p><button className="button button-primary" onClick={() => setPayOpen(true)}>Stay on it for ₹49</button></>}</article>}
          {caseData.paidState === "not_found" && <p className="error-banner">We couldn&apos;t find your payment. If you paid, send us the UPI reference through the contact address on the privacy page and we&apos;ll fix it.</p>}
          {caseData.stage !== "CLOSED_LANDED" && caseData.stage !== "TRIAGING" && <article className="case-card"><h2>They replied?</h2><p>Paste what they said and we&apos;ll update the next step.</p><button className="button button-secondary" onClick={() => setReplyOpen(true)}>Read their reply</button></article>}
          {events && events.length > 0 && <section className="case-timeline"><h2>Timeline</h2><ol>{(allEvents ? events : events.slice(0, 5)).map((event) => <li key={event._id}>{event.summary} <small>{new Date(event.createdAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short" })}</small></li>)}</ol>{events.length > 5 && <button className="text-button" onClick={() => setAllEvents(!allEvents)}>{allEvents ? "Show less" : "Show all"}</button>}</section>}
          <div className="case-footer-actions">{!["CLOSED_LANDED", "CLOSED_NO_ROUTE", "CLOSED_OUT_OF_SCOPE", "TRIAGING", "NEED_INFO", "ERROR"].includes(caseData.stage) && <button className="text-button" onClick={() => checkin("landed")}>It&apos;s in, close this case</button>}<button className="text-button danger-text" onClick={() => setDeleteOpen(true)}>Delete this case</button></div>
          {notice && <p className="toast" role="status">{notice}</p>}
        </>}
    </div>
    {sendOpen && <div className="sheet-backdrop" role="presentation" onClick={() => setSendOpen(false)}>
      <div className="sample-sheet" role="dialog" aria-modal="true" aria-label={c.draftTitle} onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-heading"><h2>{drafts?.[0]?.channel === "bank" ? "Your message for your bank" : drafts?.[0]?.channel === "form" ? "Your form message" : drafts?.[0]?.step === "L1" ? "Your message to the Grievance Officer" : c.draftTitle}</h2><button className="text-button" onClick={() => setSendOpen(false)}>Close</button></div>
        <p className="example-source">Edit anything before you send.</p>
        {drafts?.[0]?.channel === "email" && <><label>To<input type="email" value={to} onChange={(event) => setTo(event.target.value)} placeholder="Support email" /></label>{!drafts?.[0]?.to && <p className="input-hint">{c.emailHelp}</p>}<label>Subject<input value={subject} onChange={(event) => setSubject(event.target.value)} /></label></>}
        <label>Message<textarea value={body} onChange={(event) => setBody(event.target.value)} rows={9} /></label>
        {drafts?.[0]?.attachChecklist?.length ? <><p className="section-kicker">ATTACH THESE FROM YOUR PHONE</p><ul className="checklist">{drafts[0].attachChecklist.map((item) => <li key={item}>{item}</li>)}</ul></> : null}
        {drafts?.[0]?.channel === "bank" && <p className="input-hint">Send this from your bank app&apos;s help section, or to the customer care email on your statement. Keep the reference they give you.</p>}
        <button className="button button-primary" onClick={openEmail} disabled={!body.trim() || (drafts?.[0]?.channel === "email" && (!to.trim() || !subject.trim()))}>{drafts?.[0]?.channel === "email" ? c.openEmail : "Copy my message"}</button>
        <button className="button button-secondary" onClick={async () => { await copy(body); setSentPrompt(true); }}>Copy message</button>
        {to && <button className="text-button" onClick={() => copy(to)}>Copy address</button>}
        <p className="example-source">{drafts?.[0]?.channel === "email" ? c.emailNote : "You send this yourself. Nothing is sent from Tickback."}</p>
        {sentPrompt && <div className="send-confirm"><p>Did you send it?</p><button className="button button-primary" onClick={markDraftSent} disabled={busy}>Yes, I&apos;ve sent it</button><button className="button button-secondary" onClick={() => setSentPrompt(false)}>Not yet</button></div>}
      </div>
    </div>}
    {replyOpen && <div className="sheet-backdrop" role="presentation" onClick={() => setReplyOpen(false)}><div className="sample-sheet" role="dialog" aria-modal="true" aria-label="Their reply" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><div className="sheet-heading"><h2>What did they say?</h2><button className="text-button" onClick={() => setReplyOpen(false)}>Close</button></div><label>Their reply<textarea value={reply} onChange={(event) => setReply(event.target.value)} rows={8} placeholder="Paste their reply here" /></label><label>Add screenshot<input type="file" accept="image/*" onChange={(event) => setReplyImage(event.target.files?.[0] ?? null)} /></label>{replyImage && <p className="input-hint">{replyImage.name}</p>}<button className="button button-primary" onClick={submitReply} disabled={busy || (!reply.trim() && !replyImage)}>Read their reply</button></div></div>}
    {landedOpen && <div className="sheet-backdrop" role="presentation" onClick={() => setLandedOpen(false)}><div className="sample-sheet" role="dialog" aria-modal="true" aria-label="Money landed" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><div className="sheet-heading"><h2>It&apos;s in?</h2><button className="text-button" onClick={() => setLandedOpen(false)}>Close</button></div><label>How much came back? ₹<input type="number" min="0" step="0.01" value={landedAmount} onChange={(event) => setLandedAmount(event.target.value)} /></label><button className="button button-primary" disabled={busy || !landedAmount} onClick={confirmLanded}>Confirm and close case</button></div></div>}
    {deleteOpen && <div className="sheet-backdrop" role="presentation" onClick={() => setDeleteOpen(false)}><div className="sample-sheet" role="dialog" aria-modal="true" aria-label="Delete case" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><h2>Delete this case?</h2><p>We&apos;ll remove your messages, screenshots and drafts. This can&apos;t be undone.</p><button className="button button-primary" disabled={busy} onClick={deleteCase}>Delete case</button><button className="button button-secondary" onClick={() => setDeleteOpen(false)}>Keep it</button></div></div>}
    {payOpen && caseData?.upiVpa && <div className="sheet-backdrop" role="presentation" onClick={() => setPayOpen(false)}><div className="sample-sheet" role="dialog" aria-modal="true" aria-label="Stay on it" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><div className="sheet-heading"><h2>Stay on it till the money lands</h2><button className="text-button" onClick={() => setPayOpen(false)}>Close</button></div><p className="case-amount">₹49 for this case</p><ul className="checklist"><li>Every message after the first, written for you</li><li>Each one built from their last reply and your case</li><li>Grievance officer and helpline steps, with the right rule cited</li><li>If you&apos;re not happy within 14 days, you get the ₹49 back.</li></ul>{!isAndroid && qrImage && <img className="upi-qr" src={qrImage} alt="UPI payment QR for ₹49" />}{(isAndroid || isIOS) && <a className="button button-primary" href={buildUpiLink(caseData.upiVpa, caseData.upiName, code)}>Pay ₹49 by UPI</a>}{isIOS && qrImage && <a className="button button-secondary" href={qrImage} download={`tickback-${code}-upi.png`}>Save QR to Photos</a>}<p>UPI ID: {caseData.upiVpa} <button className="text-button" onClick={() => copy(caseData.upiVpa!)}>Copy</button></p><button className="text-button" onClick={() => copy("49.00")}>Copy amount</button><p className="input-hint">Add {code} in the payment note so we can match it.</p><button className="button button-secondary" disabled={busy} onClick={paid}>I&apos;ve paid</button><p className="example-source">We confirm payments by hand in our first weeks. If we can&apos;t find yours, we&apos;ll tell you here.</p></div></div>}
  </main>;
}
