"use client";

import { demoSubject } from "../../lib/demo";
import FlightCaseView from "./flight-case-view";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { caseCopy as c, guaranteeLine, productName } from "../copy";
import { forgetCase, getDeviceId, saveCase } from "../../lib/case-link";
import { addWorkingDays, displayDate, todayIST } from "../../lib/dates";
import { buildGmailCompose, buildGoogleCalendar, buildIcs, buildMailto, buildUpiLink, checkinDate } from "../../lib/outbound";
import { redact } from "../../lib/redact";
import { compressScreenshot } from "../../lib/images";
import { caseInboxAddress, codedSubject } from "../../lib/google-tracking";
import { routeFor, verifiedEmailFor } from "../../lib/route-kb";
import { replyNextStepLabel } from "../../lib/reply-banner";

type CaseView = {
  refundType?: string;
  code: string; stage: string; route: keyof typeof c.routeLabels | null; routeConfidence: number | null;
  platform: string | null; eventName: string | null; amountPaise: number | null; dueDate: string | null;
  dueSource: string | null; dueSourceText: string | null; nextStep: string | null;
  questions: { id: string; text: string; options: string[] }[]; progress: { step: string; at: number } | null;
  tier: string; paidState: string; compensationRupees: number | null; updatedAt: number;
  createdAt: number; recoveredPaise: number | null; ladderLevel: number; draftsShown: number;
  actionsRequired: { action: string; deadline: string | null; link: string | null }[];
  outOfScopeCategory: string | null; situation: string | null;
  facts: { bookingId?: string | null; eventDate?: string | null; messageDate?: string | null; promise?: { text?: string | null }; completedActions?: { action: string; date: string | null }[]; ticketFormat?: string } | null;
  factsConfirmedAt: number | null; oldCheckinDate: string | null; paymentGraceUntil: number | null;
  checkin: { date: string; reason: string; status: string } | null; paymentsEnabled: boolean;
  upiVpa: string | null; upiName: string;
  feedbackGiven: boolean;
  name: string | null; contact: string | null;
  demo: { round: number; now: string; expiresAt: number; phase: string } | null;
  newReply: { _id: Id<"inputs">; sender: string; receivedAt: number; summary: string; keySentence: string } | null;
};
type Draft = { _id: Id<"drafts">; step: string; channel: string; status: string; to?: string; subject?: string; body: string | null; attachChecklist: string[] };
type Event = { _id: string; type: string; summary: string; createdAt: number };
type Tracking = { firstSent: boolean; calendar: boolean; gmail: boolean; inboxAddress: string | null; dismissed: boolean; lastReplyAt: number | null; noSentFound: boolean; configured: boolean; gmailReady: boolean };
const money = (paise: number | null) => paise == null ? "refund" : `₹${(paise / 100).toLocaleString("en-IN")}`;

export default function CaseView({ code }: { code: string }) {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [answer, setAnswer] = useState("");
  const [earlier, setEarlier] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [sendOpen, setSendOpen] = useState(false);
  const [demoDraftToOpen, setDemoDraftToOpen] = useState<string | null>(null);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [grievanceSource, setGrievanceSource] = useState("");
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
  const [includeCaseInbox, setIncludeCaseInbox] = useState(true);
  const [pendingGoogle, setPendingGoogle] = useState<"calendar" | "gmail" | null>(null);
  const [factCorrection, setFactCorrection] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [contact, setContact] = useState("");
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const [correctingFacts, setCorrectingFacts] = useState(false);
  const [actionDate, setActionDate] = useState("");
  const [checkAgainDays, setCheckAgainDays] = useState<2 | 3 | 5>(2);
  const [channelPrompt, setChannelPrompt] = useState(false);
  const caseData = useQuery(api.cases.get, token ? { code, token } : "skip") as CaseView | null | undefined;
  const tracking = useQuery(api.googleConnect.status, token && caseData ? { code, token } : "skip") as Tracking | undefined;
  const drafts = useQuery(api.cases.drafts, token && caseData ? { code, token } : "skip") as Draft[] | undefined;
  const events = useQuery(api.cases.timeline, token && caseData ? { code, token } : "skip") as Event[] | undefined;
  const answerQuestions = useMutation(api.cases.answerQuestions);
  const retry = useMutation(api.cases.retry);
  const addReply = useMutation(api.cases.addReply);
  const markReplySeen = useMutation(api.cases.markReplySeen);
  const demoSkip = useMutation(api.demo.skipAhead);
  const demoRetry = useMutation(api.demo.retry);
  const demoBooking = useMutation(api.demo.booking);
  const uploadUrl = useMutation(api.files.generateUploadUrl);
  const markSent = useMutation(api.cases.markSent);
  const recordSendChannel = useMutation(api.cases.recordSendChannel);
  const confirmFacts = useMutation(api.cases.confirmFacts);
  const markActionDone = useMutation(api.cases.markActionDone);
  const answerCheckin = useMutation(api.cases.answerCheckin);
  const removeCase = useMutation(api.cases.remove);
  const joinWaitlist = useMutation(api.waitlist.join);
  const claimPayment = useMutation(api.payments.claim);
  const setAmount = useMutation(api.cases.setAmount);
  const sendFeedback = useMutation(api.feedback.send);
  const dismissTracking = useMutation(api.googleConnect.dismiss);
  const beginGoogle = useAction(api.googleActions.begin);
  const disconnectGoogle = useAction(api.googleActions.disconnect);

  useEffect(() => {
    const readKey = () => {
      const params = new URLSearchParams(location.search);
      if (!location.hash && params.get("google") === "connected" && params.get("state")) {
        const saved = sessionStorage.getItem(`tb-google-${params.get("state")}`);
        if (saved) {
          sessionStorage.removeItem(`tb-google-${params.get("state")}`);
          params.delete("google"); params.delete("state");
          history.replaceState(null, "", `${location.pathname}?${params.toString()}#k=${saved}`);
        }
      }
      const match = location.hash.match(/^#k=([A-Za-z0-9_-]{43})$/);
      setToken(match?.[1] ?? null);
      setReady(true);
    };
    readKey();
    window.addEventListener("hashchange", readKey);
    return () => window.removeEventListener("hashchange", readKey);
  }, []);
  useEffect(() => {
    if (!caseData || !token) return;
    saveCase({ code, token, title: caseData.eventName || code, amountPaise: caseData.amountPaise ?? undefined, route: caseData.route ?? undefined, updatedAt: caseData.updatedAt });
  }, [caseData, code, token]);
  useEffect(() => {
    const draft = drafts?.[0];
    if (!draft) return;
    setTo(draft.to ?? "");
    setSubject(demoSubject(!!caseData?.demo, draft.subject ?? ""));
    setBody(draft.body ?? "");
  }, [drafts, !!caseData?.demo]);
  useEffect(() => {
    if (!caseData?.demo || !demoDraftToOpen || !caseData.factsConfirmedAt || drafts?.[0]?.step !== demoDraftToOpen || drafts[0].status === "sent") return;
    setSendOpen(true); setDemoDraftToOpen(null);
  }, [caseData?.demo, caseData?.factsConfirmedAt, demoDraftToOpen, drafts]);
  useEffect(() => {
    if (!payOpen || !caseData?.upiVpa) return;
    import("qrcode").then((qrcode) => qrcode.toDataURL(buildUpiLink(caseData.upiVpa!, caseData.upiName, code), { width: 320, margin: 2 })).then(setQrImage).catch(() => setQrImage(""));
  }, [payOpen, caseData?.upiVpa, caseData?.upiName, code]);
  useEffect(() => {
    if (!caseData || caseData.factsConfirmedAt || detailsLoaded) return;
    setBookingId(caseData.facts?.bookingId || "");
    setContact(caseData.contact || "");
    setDetailsLoaded(true);
  }, [caseData, detailsLoaded]);

  async function confirmCaseFacts(looksRight: boolean) {
    if (!token || (!looksRight && !factCorrection.trim())) return;
    setBusy(true);
    try {
      await confirmFacts({ code, token, looksRight, correction: looksRight ? undefined : factCorrection.trim(), bookingId, contact });
      if (looksRight && caseData?.demo) setDemoDraftToOpen("L0_email");
      if (!looksRight) { setCorrectingFacts(false); setFactCorrection(""); }
    } catch { setNotice(c.error); }
    finally { setBusy(false); }
  }

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
    const date = data.route === "OVERDUE" || (data.dueDate && data.dueDate < todayIST()) ? addWorkingDays(todayIST(), checkAgainDays) : data.checkin?.date && data.checkin.date > todayIST() ? data.checkin.date : data.dueDate ? checkinDate(data.dueDate) : addWorkingDays(todayIST(), 2);
    const amount = money(data.amountPaise);
    const eventName = data.eventName ?? "your event";
    const link = window.location.href;
    return { date, title: c.calendarTitle(amount, eventName), description: c.calendarDescription(amount, eventName, link) };
  }

  function addCalendar(kind: "google" | "ics") {
    if (!caseData) return;
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
    const text = caseData?.demo ? `I tried a simulated refund chase with Tickback. No real money moved. Try the demo: ${location.origin}/start/` : `Got my ${money(caseData?.recoveredPaise ?? null)} ticket refund back. Tickback helped me track the date and next steps: ${link}`;
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

  function outboundBody() {
    return drafts?.[0]?.step === "L1" && grievanceSource.trim() ? body.replace("Dear Grievance Officer,", `Dear Grievance Officer,\n\nI could not find the Grievance Officer's address on your site, so I am sending this to the address in ${grievanceSource.trim()}.`) : body;
  }

  async function openEmail() {
    if (!body.trim()) return;
    const message = outboundBody();
    if (drafts?.[0]?.channel !== "email") { await copy(message); setSentPrompt(true); return; }
    if (!to.trim() || !subject.trim()) return;
    const cc = includeCaseInbox && tracking?.inboxAddress ? caseInboxAddress(tracking.inboxAddress, code) : undefined;
    const result = buildMailto(to, codedSubject(subject, code), message, cc);
    if (result.copyFirst) { await copy(message); setNotice("Message copied. Paste it into the email."); }
    window.location.href = result.url;
    setSentPrompt(true);
  }

  async function openGmail() {
    if (!body.trim() || drafts?.[0]?.channel !== "email" || !to.trim() || !subject.trim()) return;
    const message = outboundBody();
    const cc = includeCaseInbox && tracking?.inboxAddress ? caseInboxAddress(tracking.inboxAddress, code) : undefined;
    const result = buildGmailCompose(to, codedSubject(subject, code), message, cc);
    window.open(result.url, "_blank", "noopener,noreferrer");
    if (result.copyFirst) { await copy(message); setNotice("Message copied. Paste it into Gmail before sending."); }
    setSentPrompt(true);
  }

  async function connectGoogle(kind: "calendar" | "gmail") {
    if (!token) return;
    setBusy(true);
    try {
      const result = await beginGoogle({ code, token, kind });
      sessionStorage.setItem(`tb-google-${result.state}`, token);
      window.location.assign(result.url);
    } catch { setNotice("Google connection is not ready yet. You can still paste a reply here."); setBusy(false); setPendingGoogle(null); }
  }

  async function disconnectTracking() {
    if (!token) return;
    setBusy(true);
    try { await disconnectGoogle({ code, token }); setNotice("Google disconnected. Your case and manual calendar links still work."); }
    catch { setNotice("Could not disconnect yet. Please try again."); }
    finally { setBusy(false); }
  }

  async function markDraftSent() {
    if (!token || !drafts?.[0]) return;
    setBusy(true);
    try {
      await markSent({ code, token, draftId: drafts[0]._id });
      if (drafts[0].channel === "chat") await recordSendChannel({ code, token, channel: "chat" });
      setSentPrompt(false); setSendOpen(false); setChannelPrompt(!caseData?.demo && drafts[0].channel !== "chat"); setNotice("Marked as sent. We'll check back with you.");
    }
    catch { setNotice(c.error); }
    finally { setBusy(false); }
  }

  async function actionDone() {
    if (!token || !actionDate) return;
    setBusy(true);
    try { await markActionDone({ code, token, completedDate: actionDate }); setNotice("Saved. Working out your new check-in date…"); }
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
  const estimated = caseData?.dueSource === "estimate" || caseData?.dueSource === "platform_policy_reported" || caseData?.dueSource === "platform_policy";
  const needsConfirm = !!caseData && !caseData.factsConfirmedAt && (route === "ACTION_NEEDED" || (caseData.draftsShown >= 1 && !!caseData.nextStep && !["none", "questions", "options", "waitlist"].includes(caseData.nextStep)));
  const title = route === "WAIT" && caseData?.dueDate ? estimated ? `Our check-in for your ${money(caseData.amountPaise)} refund is ${displayDate(caseData.dueDate)}.` : `Your ${money(caseData.amountPaise)} should land by ${displayDate(caseData.dueDate)}.`
    : route === "OVERDUE" && caseData?.dueDate ? estimated ? `Time to check your ${money(caseData.amountPaise)} refund.` : `Your ${money(caseData.amountPaise)} was due by ${displayDate(caseData.dueDate)}.`
    : route ? c.routeLabels[route] : "";
  const question = caseData?.questions?.[0];
  const stepIndex = { reading: 0, route: 1, date: 2, writing: 3, done: 4, failed: 0 }[caseData?.progress?.step ?? "reading"] ?? 0;
  const isIOS = ready && /iPhone|iPad|iPod/.test(navigator.userAgent);
  const isAndroid = ready && /Android/.test(navigator.userAgent);
  const messageSteps = ["L0_email", "L0_chat", "L1", "L2", "TRACE_ask", "TRACE_bank", "FAILED_platform", "NO_ROUTE_ask", "ACTION_form"];
  const locked = !caseData?.demo && !!caseData?.paymentsEnabled && caseData.tier !== "free_small" && !["claimed", "confirmed"].includes(caseData.paidState) && !(caseData.paymentGraceUntil && caseData.paymentGraceUntil > Date.now()) && caseData.draftsShown >= 1 && messageSteps.includes(caseData.nextStep ?? "") && (drafts?.[0]?.step !== caseData.nextStep || !drafts?.[0]?.body);
  const exactInbox = tracking?.inboxAddress ? caseInboxAddress(tracking.inboxAddress, code) : null;
  const replyTrackingOn = !!tracking?.firstSent && (!!exactInbox || !!tracking.gmail);
  const platformRoute = routeFor(caseData?.platform);
  const verifiedRecipient = verifiedEmailFor(caseData?.platform, drafts?.[0]?.step ?? "");
  const sentChat = !!drafts?.some((draft) => draft.channel === "chat" && draft.status === "sent");
  const chaseDate = caseData?.checkin?.date ?? addWorkingDays(todayIST(), 2);

  async function seenReply() {
    if (!token || !caseData?.newReply) return;
    setBusy(true);
    try { await markReplySeen({ code, token, inputId: caseData.newReply._id }); }
    catch { setNotice(c.error); }
    finally { setBusy(false); }
  }

  async function skipDemo() {
    if (!token) return;
    setBusy(true);
    try { await demoSkip({ code, token }); setDemoDraftToOpen("L1"); } catch { setNotice(c.error); } finally { setBusy(false); }
  }
  async function addDemoBooking() {
    if (!token || !bookingId.trim()) return;
    setBusy(true);
    try { await demoBooking({ code, token, bookingId: bookingId.trim() }); setDemoDraftToOpen("DEMO_booking"); } catch (error) { setNotice(error instanceof Error ? error.message : c.error); } finally { setBusy(false); }
  }

  if (caseData?.refundType === "flight" && token) return <FlightCaseView code={code} token={token} />;
  return <main className="case-shell">
    <header className="site-header"><Link className="wordmark" href="/">{productName}<span className="wordmark-dot">.</span></Link><span className="case-code">{caseData?.demo && <span className="demo-tag">Demo</span>} {code}</span></header>
    <div className="case-wrap">
      {deleted ? <div className="case-card bad-link" role="status"><h1>Deleted.</h1><Link className="text-link" href="/">Back to Tickback</Link></div>
        : invalid || (ready && caseData === null) ? <div className="case-card bad-link" role="alert"><h1>{c.badLink}</h1><Link className="text-link" href="/">Back to Tickback</Link></div>
        : caseData == null ? <div className="case-card case-loading"><div className="progress-lead"><span className="spinner" aria-hidden="true" /><strong>{c.progress[0]}…</strong></div></div>
        : <>
          <div className="case-heading"><p className="section-kicker">{caseData.platform ?? "YOUR CASE"}</p><h1>{caseData.eventName ?? "Your refund case"}</h1><p>{code}</p><p className="tracking-line"><span aria-hidden="true">{replyTrackingOn ? "●" : "○"}</span> {replyTrackingOn ? c.trackingOn : c.trackingOff}</p></div>
          {caseData.newReply && <article className="case-card reply-banner" aria-live="polite">
            <div className="reply-banner-top"><div><p className="section-kicker">NEW REPLY</p><h2>New reply from {caseData.platform ?? "the organiser"}</h2></div><time dateTime={new Date(caseData.newReply.receivedAt).toISOString()}>{new Date(caseData.newReply.receivedAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" })}</time></div>
            <p className="reply-summary">{caseData.newReply.summary}</p>
            <blockquote>{caseData.newReply.keySentence}</blockquote>
            <div className="reply-next"><span>Updated next step</span><strong>{caseData.demo && caseData.stage.startsWith("CLOSED") ? "Case closed" : caseData.demo?.round === 3 && caseData.dueDate ? `Check your bank by ${displayDate(caseData.dueDate)}` : replyNextStepLabel(caseData.nextStep, caseData.platform)}</strong></div>
            <button className="text-button" disabled={busy} onClick={seenReply}>Seen</button>
          </article>}
          {caseData.demo && !caseData.stage.startsWith("CLOSED") && <article className="case-card demo-story">
            <p className="section-kicker">Demo · Round {Math.max(1, Math.min(3, caseData.demo.round + (caseData.demo.phase.startsWith("waiting") ? 1 : 0)))} of 3</p>
            {caseData.platform === "BookMyShow" && <p className="input-hint">This demo uses email because we cannot simulate BookMyShow’s in-app chat.</p>}
            <p className="input-hint">No real booking or money. Demo clock: {displayDate(caseData.demo.now)}. Deleted after seven days.</p>
            {caseData.demo.phase.startsWith("waiting") ? <div role="status" aria-live="polite"><h2><span className="spinner" /> Waiting for {caseData.platform}’s reply…</h2><ol className="demo-steps"><li>✓ Your email marked sent</li><li>{caseData.demo.phase === "waiting_organiser" ? "◌" : "✓"} Demo desk reading your email</li><li>{caseData.demo.phase === "waiting_inbox" ? "◌" : "○"} Reply travelling to your case inbox</li><li>○ Reading reply and preparing your next step</li></ol></div>
            : caseData.demo.phase === "timed_out" ? <><h2>The demo desk hasn’t found your email yet.</h2><p>Send from your own Gmail account, with the case inbox in CC. The demo desk cannot reply to itself or the case inbox.</p><button className="button button-primary" disabled={busy} onClick={async () => { if (!token) return; setBusy(true); try { await demoRetry({ code, token }); } catch (error) { setNotice(error instanceof Error ? error.message : "Please try again"); } finally { setBusy(false); } }}>I’ve sent it — check again</button></>
            : caseData.stage !== "TRIAGING" && caseData.factsConfirmedAt ? <>
              {caseData.demo.round === 0 && <><h2>Your first message is ready.</h2><button className="button button-primary" onClick={() => setSendOpen(true)}>Prepare demo email</button></>}
              {caseData.demo.round === 1 && caseData.route === "WAIT" && <><h2>They asked you to wait. What if they go quiet?</h2><button className="button button-primary" disabled={busy} onClick={skipDemo}>Skip ahead 10 days</button><p className="input-hint">Move the demo clock 10 days past their promised date.</p></>}
              {caseData.demo.round === 1 && caseData.route === "OVERDUE" && <><h2>Time to escalate.</h2><button className="button button-primary" onClick={() => setSendOpen(true)}>Prepare escalation email</button></>}
              {caseData.demo.round === 2 && caseData.stage === "NEED_INFO" && <div className="answer-form"><h2>They need your booking ID.</h2><label htmlFor="demo-booking">Booking ID (demo: any made-up ID works)</label><input id="demo-booking" value={bookingId} maxLength={50} onChange={event => setBookingId(event.target.value)} /><button className="button button-secondary" onClick={() => setBookingId("DEMO-2400")}>Use a sample ID</button><button className="button button-primary" disabled={busy || !bookingId.trim()} onClick={addDemoBooking}>Write my reply</button></div>}
              {caseData.demo.round === 2 && caseData.stage !== "NEED_INFO" && <><h2>Your booking ID is in the reply.</h2><button className="button button-primary" onClick={() => setSendOpen(true)}>Prepare booking ID email</button></>}
              {caseData.demo.round === 3 && <><h2>Check your bank by {caseData.dueDate ? displayDate(caseData.dueDate) : "the date above"}.</h2><p>Refund reference: <strong>DEMO-{code.replace("TB-", "")}-REF</strong>. Give this reference to your bank to trace a refund that does not arrive. This one is made up for the demo.</p><button className="button button-primary" onClick={() => checkin("landed")}>Money landed</button></>}
            </> : null}
          </article>}
          {caseData.stage === "DUE" && <article className="case-card checkin-card" aria-live="polite">
            <p className="section-kicker">YOUR CHECK-IN</p><h2>Has your {money(caseData.amountPaise)} landed?</h2>
            <div className="stacked-actions"><button className="button button-primary" onClick={() => checkin("landed")}>It&apos;s in</button><button className="button button-secondary" disabled={busy} onClick={() => checkin("not_yet")}>Not yet</button><button className="text-button" onClick={() => checkin("replied")}>They replied</button></div>
          </article>}
          {caseData.stage === "CLOSED_LANDED" && <article className="case-card landed-card"><p className="section-kicker">CASE CLOSED</p><h2>{caseData.demo ? "Demo complete: " : ""}{money(caseData.recoveredPaise)} back.</h2><p>{caseData.demo ? "A simulated refund, with no real money moved. This demo is deleted after seven days." : "Your refund landed. Your case history stays here until you delete it."}</p><button className="button button-secondary" onClick={shareLanded}>Tell a friend who&apos;s waiting on a refund</button>{caseData.feedbackGiven || feedbackSent ? <p>Thanks for your feedback.</p> : <div className="feedback-form"><p>Was this worth it?</p><div className="answer-options"><button className="situation-chip" aria-pressed={feedbackWorth === true} onClick={() => setFeedbackWorth(true)}>Yes</button><button className="situation-chip" aria-pressed={feedbackWorth === false} onClick={() => setFeedbackWorth(false)}>Not really</button></div>{feedbackWorth != null && <><label htmlFor="feedback-comment">Anything we should fix? (optional)</label><input id="feedback-comment" value={feedbackComment} onChange={(event) => setFeedbackComment(event.target.value)} maxLength={500} /><button className="button button-secondary" onClick={feedback} disabled={busy}>Send feedback</button></>}</div>}</article>}
          {caseData.stage === "TRIAGING" && <article className="case-card progress-card" aria-live="polite">
            <div className="progress-lead"><span className="spinner" aria-hidden="true" /><strong>{c.progress[stepIndex] ?? c.progress[0]}…</strong></div>
            <ol>{c.progress.map((step, index) => <li className={index < stepIndex ? "progress-done" : index === stepIndex ? "progress-current" : ""} key={step}><span>{index < stepIndex ? "✓" : index + 1}</span>{step}</li>)}</ol>
          </article>}
          {caseData.stage === "ERROR" && <article className="case-card" role="alert"><h2>{c.error}</h2><button className="button button-primary" onClick={() => token && retry({ code, token })}>{c.retry}</button></article>}
           {needsConfirm && <article className="case-card" aria-label="What we understood"><p className="section-kicker">WHAT WE UNDERSTOOD</p><h2>Check these details</h2><p>{caseData.platform ?? "Platform unknown"} · {caseData.eventName ?? "Event unknown"} · {money(caseData.amountPaise)}</p><p>Refund date: {caseData.dueDate ? displayDate(caseData.dueDate) : "not given"}. {caseData.facts?.promise?.text ? `They said: ${caseData.facts.promise.text}` : "No refund promise found."}</p><div className="confirm-details" style={caseData.demo ? {display: "none"} : undefined}><label hidden={!!caseData.demo} htmlFor="booking-id">Booking ID <span>(if you have it)</span><input id="booking-id" value={bookingId} onChange={(event) => setBookingId(event.target.value)} maxLength={100} /></label><label hidden={!!caseData.demo} htmlFor="follow-up-contact">Phone or email <span>(optional)</span><input id="follow-up-contact" value={contact} onChange={(event) => setContact(event.target.value)} maxLength={150} autoComplete="email" /></label>{!caseData.demo && <p className="input-hint">So Ganesh can follow up if something looks wrong.</p>}</div><div className="save-actions"><button className="button button-primary" disabled={busy} onClick={() => confirmCaseFacts(true)}>{caseData.demo ? "Confirm" : "Looks right"}</button><button className="button button-secondary" onClick={() => setCorrectingFacts(true)}>Not quite</button></div>{correctingFacts && <div className="answer-form"><label htmlFor="fact-fix">What needs fixing?</label><input id="fact-fix" value={factCorrection} onChange={(event) => setFactCorrection(event.target.value)} /><button className="button button-primary" disabled={!factCorrection.trim() || busy} onClick={() => confirmCaseFacts(false)}>Save correction</button></div>}</article>}
          {route && !["ERROR", "CLOSED_LANDED", "TRIAGING"].includes(caseData.stage) && <article className="case-card status-card">
             <span className={`route-chip ${route === "OVERDUE" || route === "ACTION_NEEDED" ? "caution-chip" : ""}`}>{route === "OVERDUE" && estimated ? "Time to check" : route === "WAIT" && (estimated || !caseData.dueDate) ? "Waiting for a refund" : c.routeLabels[route]}</span>
            {caseData.amountPaise != null && <p className="case-amount">{money(caseData.amountPaise)}</p>}
             <h2>{needsConfirm ? "Check what we understood above first." : title}</h2>
             {caseData.dueDate && !needsConfirm && <div className="due-block"><span>{route === "ACTION_NEEDED" && caseData.facts?.ticketFormat === "physical" ? "Must reach them by" : estimated ? "Estimated check date" : "Due date"}</span><strong>{displayDate(caseData.dueDate)}</strong></div>}
             {caseData.dueSourceText && <p className="example-source">{caseData.facts?.messageDate ? caseData.dueSourceText.replace(/\bon\s+\d{1,2}\s+[A-Z][a-z]{2}(?!\s+\d{4})/, `on ${displayDate(caseData.facts.messageDate)}`) : caseData.dueSourceText}</p>}
             {estimated && <p className="input-hint">This is our estimate from the platform&apos;s usual timing, not a date they promised.</p>}
            {caseData.routeConfidence != null && caseData.routeConfidence < 0.6 && <p className="input-hint">We think this is {c.routeLabels[route]}. Is that right?</p>}
          </article>}
          {!caseData.demo && caseData.stage === "NEED_INFO" && question && <article className="case-card">
            <p className="section-kicker">{c.needInfo}</p><h2>{question.text}</h2>
            <div className="answer-options">{question.options.map((option) => <button className="situation-chip" key={option} onClick={() => option === "Earlier" ? setEarlier(true) : submitAnswer(option)} disabled={busy}>{option}</button>)}</div>
            {(earlier || question.options.length === 0) && <div className="answer-form"><label htmlFor="case-answer">{earlier ? "Choose the date" : "Your answer"}</label><input id="case-answer" type={earlier ? "date" : "text"} value={answer} onChange={(event) => setAnswer(event.target.value)} /><button className="button button-primary" onClick={() => submitAnswer()} disabled={!answer || busy}>{c.continue}</button></div>}
          </article>}
           {route === "WAIT" && !["CLOSED_LANDED", "TRIAGING"].includes(caseData.stage) && <article className="case-card">
             <p className="section-kicker">THE NEXT STEP</p><h2>{c.waitNext}</h2><p>{caseData.dueDate && !estimated ? `Their promised date: ${displayDate(caseData.dueDate)}.` : "They have not promised a refund date."} Our check-in date: {displayDate(caseData.checkin?.date ?? addWorkingDays(todayIST(), 2))}. Add it to your calendar so you don&apos;t miss it.</p>
          </article>}
          {!caseData.demo && route === "OVERDUE" && !["CLOSED_LANDED", "TRIAGING"].includes(caseData.stage) && <article className="case-card">
              <p className="section-kicker">THE NEXT STEP</p><h2>{caseData.nextStep === "L1" ? `Escalate to ${caseData.platform ?? "the organiser"}'s Grievance Officer` : caseData.nextStep === "L0_chat" ? `Message ${caseData.platform ?? "the platform"} in chat` : `Ask ${caseData.platform ?? "the organiser"} support in writing`}</h2><p>{caseData.nextStep === "L1" ? "The Consumer Protection (E-Commerce) Rules, 2020 say they should acknowledge within 48 hours. Check this at the source before citing it." : caseData.nextStep === "L0_chat" && platformRoute?.chatPath ? <>Paste the next line in <a className="text-link" href={platformRoute.chatPath.source} target="_blank" rel="noreferrer">{platformRoute.chatPath.value}</a>.</> : estimated && caseData.dueDate ? `As of ${displayDate(caseData.dueDate)}, I have not received the refund. Ask for a status update.` : "Email leaves a dated record. That matters if you need to go higher."}</p>
              {caseData.nextStep === "L0_chat" && <p className="input-hint">If they go quiet, chase on {displayDate(chaseDate)}.</p>}
              {needsConfirm ? <p className="input-hint">Check the facts above to see your message.</p> : locked ? <p className="input-hint">Your next message is ready after you unlock this case.</p> : drafts?.[0]?.body && drafts[0].status !== "sent" ? <button className="button button-primary" onClick={() => setSendOpen(true)}>{drafts[0].channel === "email" ? c.prepareEmail : events?.some((event) => event.type === "reply_added") ? "Copy next chat line" : "Copy for chat"}</button> : caseData.stage === "WAITING" ? <p className="input-hint">Waiting for their reply. We&apos;ll check in with you.</p> : <p className="input-hint">Writing your next step…</p>}
          </article>}
           {route === "ACTION_NEEDED" && caseData.stage !== "TRIAGING" && !needsConfirm && <article className="case-card"><p className="section-kicker">THE NEXT STEP</p><h2>Do these before the deadline</h2><ul className="checklist">{caseData.actionsRequired.map((action, index) => <li key={index}>{action.action}{action.deadline ? ` — ${caseData.facts?.ticketFormat === "physical" ? "must reach them by" : "by"} ${displayDate(action.deadline)}` : ""}{action.link && <a className="text-link" href={action.link} target="_blank" rel="noreferrer"> Open form</a>}</li>)}</ul><p>Keep a photo or screenshot of every step you complete.</p>{drafts?.[0]?.body && <button className="button button-secondary" onClick={() => setSendOpen(true)}>Open form message</button>}<label>When did you finish these steps?<input type="date" max={todayIST()} value={actionDate} onChange={(event) => setActionDate(event.target.value)} /></label><button className="button button-primary" onClick={actionDone} disabled={busy || !actionDate}>I&apos;ve done this</button></article>}
           {!caseData.demo && route === "TRACE" && caseData.stage !== "TRIAGING" && <article className="case-card"><p className="section-kicker">THE NEXT STEP</p><h2>{caseData.nextStep === "TRACE_bank" ? "Ask your bank to trace it" : "Ask for the refund reference"}</h2><p>{caseData.nextStep === "TRACE_bank" ? "The company gave a reference. Use it in your bank's help section." : "Platforms usually share a reference number when asked. There is no fixed rule for how fast."}</p>{caseData.nextStep === "TRACE_ask" && <p>Our follow-up date: {displayDate(addWorkingDays(todayIST(), 3))}</p>}{drafts?.[0]?.body && drafts[0].status !== "sent" && !needsConfirm && <button className="button button-primary" onClick={() => setSendOpen(true)}>{caseData.nextStep === "TRACE_bank" ? "Open bank message" : c.prepareEmail}</button>}</article>}
           {route === "FAILED_PAYMENT" && caseData.stage !== "TRIAGING" && <article className="case-card"><p className="section-kicker">THE NEXT STEP</p><h2>{caseData.nextStep === "none" ? "Wait for the reversal" : "Ask the platform for a payment reference and status"}</h2><p>RBI&apos;s rule for failed payments may apply. Keep the payment debit and the failed-payment screen. Once you have the reference, ask your bank to trace it.</p>{drafts?.[0]?.body && drafts[0].status !== "sent" && !needsConfirm && <button className="button button-primary" onClick={() => setSendOpen(true)}>Open platform message</button>}</article>}
          {route === "NO_ROUTE" && caseData.stage !== "TRIAGING" && <article className="case-card"><p className="section-kicker">YOUR OPTIONS</p>{caseData.situation === "cant_attend" ? <><h2>You can&apos;t go</h2><p>{caseData.platform?.toLowerCase().includes("district") ? "District's ticket terms do not allow cancellation, transfer or refund just because you cannot attend." : "A refund just because you cannot attend may not be available. Check your booking terms and ask the organiser about any exception."}</p></> : <><h2>Ask about the new date</h2><p>The organiser has not offered a refund yet. Ask whether you can request one and by when.</p>{drafts?.[0]?.body && drafts[0].status !== "sent" && <button className="button button-primary" onClick={() => setSendOpen(true)}>{c.prepareEmail}</button>}</>}</article>}
          {route === "OUT_OF_SCOPE" && <article className="case-card"><p>We&apos;re starting with event tickets. The National Consumer Helpline handles complaints about any company: <a className="text-link" href="https://consumerhelpline.gov.in" target="_blank" rel="noreferrer">consumerhelpline.gov.in</a> or 1915.</p>{waitlistDone ? <p role="status">Thanks. We&apos;ll tell you once, when it&apos;s ready.</p> : <div className="answer-form"><label htmlFor="waitlist">Tell me when {caseData.outOfScopeCategory ?? "this"} refunds are ready</label><input id="waitlist" type="text" value={waitlistContact} onChange={(event) => setWaitlistContact(event.target.value)} placeholder="Email or phone" /><button className="button button-secondary" onClick={waitlist} disabled={busy || !waitlistContact.trim()}>Join the waitlist</button></div>}</article>}
          {!caseData.demo && caseData.stage !== "TRIAGING" && <article className="case-card">
            <h2>{c.saveTitle}</h2>
             {route === "OVERDUE" && <div className="answer-form"><label htmlFor="check-again">When should we check again?</label><select id="check-again" value={checkAgainDays} onChange={(event) => setCheckAgainDays(Number(event.target.value) as 2 | 3 | 5)}><option value={2}>2 working days</option><option value={3}>3 working days</option><option value={5}>5 working days</option></select><p>Your next check-in: {displayDate(addWorkingDays(todayIST(), checkAgainDays))}</p></div>}
             {caseData.oldCheckinDate && caseData.checkin?.date && <p className="input-hint">Your calendar still has the old reminder for {displayDate(caseData.oldCheckinDate)}. Add the new one for {displayDate(caseData.checkin.date)} and delete the old one.</p>}
            <div className="save-actions">
               {!isIOS && <button className="button button-secondary" onClick={() => addCalendar("google")}>{c.calendar}{!isAndroid ? " (Google)" : ""}</button>}
               {!isAndroid && <button className="button button-secondary" onClick={() => addCalendar("ics")}>{c.calendar}{!isIOS ? " (.ics)" : ""}</button>}
              <button className="button button-secondary" onClick={() => copy(window.location.href)}>{c.copyLink}</button>
              <button className="button button-secondary" onClick={share}>{c.share}</button>
            </div>
            <p className="example-source">{c.linkNote}</p>
          </article>}
          {!caseData.demo && tracking?.firstSent && !caseData.stage.startsWith("CLOSED") && (tracking.calendar || tracking.gmail ? <article className="case-card" aria-live="polite"><p className="section-kicker">REPLY TRACKING</p><h2>{tracking.gmail ? `Watching for ${caseData.platform ?? "the organiser"}'s reply` : "Calendar alerts connected"}</h2><p>{tracking.inboxAddress ? "We'll watch for replies copied to the Tickback case inbox." : "If they replied to you only, paste it here or connect Gmail."}</p><p>{c.calendarFileOneTime}</p>{tracking.lastReplyAt && <p>Their reply arrived. Your case has been updated.</p>}{tracking.noSentFound && <p>We couldn&apos;t find your sent email in Gmail. Did you send it from another address?</p>}{!tracking.gmail && tracking.configured && tracking.gmailReady && <button className="button button-secondary" disabled={busy} onClick={() => setPendingGoogle("gmail")}>Catch every reply: connect Gmail</button>}<button className="text-button" disabled={busy} onClick={disconnectTracking}>Disconnect Google</button></article> : !tracking.dismissed && <article className="case-card"><p className="section-kicker">OPTIONAL</p><h2>Want us to watch for their reply?</h2><p>When {caseData.platform ?? "the organiser"} replies to this email, we&apos;ll read that reply, get your next step ready, and put an alert on your Google Calendar so you don&apos;t miss it.</p><p>{c.liveAlertNeedsCalendar} {c.calendarFileOneTime}</p><p>If they reply only to you, connect Gmail or paste it here.</p>{tracking.configured ? <><button className="button button-primary" disabled={busy} onClick={() => setPendingGoogle("calendar")}>Connect Google Calendar</button>{tracking.gmailReady && <button className="button button-secondary" disabled={busy} onClick={() => setPendingGoogle("gmail")}>Catch every reply: connect Gmail</button>}</> : <p className="input-hint">Google connection is being set up. You can still paste replies and add a check-in yourself.</p>}<button className="text-button" onClick={() => token && dismissTracking({ code, token })}>No thanks, I&apos;ll check myself</button></article>)}
          {pendingGoogle && <article className="case-card" role="status"><h2>Before you go to Google</h2><p>Google may show “Google hasn&apos;t verified this app” while Tickback is new. If you choose to continue, use Advanced, then Go to Tickback. You can disconnect any time.</p>{pendingGoogle === "gmail" && <p>Google grants read-only access to your Gmail. Tickback searches only for replies to this refund email; matching replies go to Gemini to prepare your next step.</p>}<button className="button button-primary" disabled={busy} onClick={() => connectGoogle(pendingGoogle)}>Continue to Google</button><button className="text-button" onClick={() => setPendingGoogle(null)}>Not now</button></article>}
           {!caseData.demo && caseData.paymentsEnabled && caseData.tier !== "free_small" && !["claimed", "confirmed"].includes(caseData.paidState) && !["TRIAGING", "NEED_INFO", "ERROR"].includes(caseData.stage) && <article className="case-card pay-card"><p className="section-kicker">STAY ON IT</p>{caseData.tier === "unknown_amount" ? <><h2>How much did you pay?</h2><p>Refunds under ₹300 stay free.</p><div className="answer-form"><label htmlFor="paid-amount">Amount paid in ₹</label><input id="paid-amount" type="number" min="0" step="0.01" value={unknownAmount} onChange={(event) => setUnknownAmount(event.target.value)} /><button className="button button-primary" disabled={busy || !unknownAmount} onClick={saveAmount}>Continue</button></div></> : <><h2>₹49 to stay on it.</h2><p>We check on the due date, tell you when to chase, and write every next message.</p><p>{guaranteeLine}</p><button className="button button-primary" onClick={() => setPayOpen(true)}>Stay on it for ₹49</button></>}</article>}
           {caseData.paidState === "not_found" && <p className="error-banner">We could not match your payment yet. Reply here and we&apos;ll check by hand. Your case stays unlocked for two days.</p>}
            {!caseData.demo && caseData.stage !== "CLOSED_LANDED" && caseData.stage !== "TRIAGING" && (sentChat ? <article className="case-card chat-reply-card"><h2>Paste their chat reply or add a screenshot</h2><textarea value={reply} onChange={(event) => setReply(event.target.value)} rows={5} placeholder="Paste their chat reply here" /><label>Add screenshot<input type="file" accept="image/*" onChange={(event) => setReplyImage(event.target.files?.[0] ?? null)} /></label>{replyImage && <p className="input-hint">Screenshot ready.</p>}<button className="button button-primary" onClick={submitReply} disabled={busy || (!reply.trim() && !replyImage)}>Read reply and write my next line</button><p className="input-hint">If they go quiet, chase on {displayDate(chaseDate)}.</p></article> : <article className="case-card"><h2>They replied?</h2><p>If they replied to you only, paste it here or connect Gmail. We&apos;ll update the next step.</p><button className="button button-secondary" onClick={() => setReplyOpen(true)}>Read their reply</button></article>)}
           {events && events.length > 0 && <section className="case-timeline"><h2>Timeline</h2><ol>{(allEvents ? events : events.slice(0, 5)).map((event) => <li key={event._id}>{event.summary} <small>{new Date(event.createdAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" })}</small></li>)}</ol>{events.length > 5 && <button className="text-button" onClick={() => setAllEvents(!allEvents)}>{allEvents ? "Show less" : "Show all"}</button>}</section>}
          <div className="case-footer-actions">{(!caseData.demo || caseData.demo.round === 3) && !["CLOSED_LANDED", "CLOSED_NO_ROUTE", "CLOSED_OUT_OF_SCOPE", "TRIAGING", "NEED_INFO", "ERROR"].includes(caseData.stage) && <button className="text-button" onClick={() => checkin("landed")}>{caseData.demo ? "Money landed" : "It’s in, close this case"}</button>}<button className="text-button danger-text" onClick={() => setDeleteOpen(true)}>Delete this case</button></div>
          {notice && <p className="toast" role="status">{notice}</p>}
        </>}
    </div>
    {channelPrompt && <div className="sheet-backdrop" role="presentation"><div className="sample-sheet" role="dialog" aria-modal="true" aria-label="How you sent it"><h2>Which did you use?</h2><div className="answer-options">{(["email", "chat", "form", "phone"] as const).map((channel) => <button className="situation-chip" key={channel} onClick={async () => { if (!token) return; await recordSendChannel({ code, token, channel }); setChannelPrompt(false); }}>{channel[0].toUpperCase() + channel.slice(1)}</button>)}</div></div></div>}
    {sendOpen && <div className="sheet-backdrop" role="presentation" onClick={() => setSendOpen(false)}>
      <div className="sample-sheet" role="dialog" aria-modal="true" aria-label={c.draftTitle} onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-heading"><h2>{drafts?.[0]?.channel === "chat" ? "Your next chat line" : drafts?.[0]?.channel === "bank" ? "Your message for your bank" : drafts?.[0]?.channel === "form" ? "Your form message" : drafts?.[0]?.step === "L1" ? "Your message to the Grievance Officer" : c.draftTitle}</h2><button className="text-button" onClick={() => setSendOpen(false)}>Close</button></div>
        <p className="example-source">{drafts?.[0]?.channel === "chat" && platformRoute?.chatPath ? <>Paste this in <a className="text-link" href={platformRoute.chatPath.source} target="_blank" rel="noreferrer">{platformRoute.chatPath.value}</a>.</> : caseData?.demo ? "Send from your own Gmail. No attachments are needed for this demo." : "Edit anything before you send. Send from the email you booked with, and attach your proof."}</p>
        {drafts?.[0]?.channel === "chat" && <p className="input-hint">If they go quiet, chase on {displayDate(chaseDate)}.</p>}
        {caseData?.facts?.bookingId && <p>Booking ID: <strong>{caseData.facts.bookingId}</strong></p>}
        {caseData?.dueDate && <p>{caseData.facts?.ticketFormat === "physical" && caseData.route === "ACTION_NEEDED" ? "Tickets must reach them by" : "Relevant date"}: {displayDate(caseData.dueDate)}</p>}
         {drafts?.[0]?.channel === "email" && <><label>To<input type="email" readOnly={!!caseData?.demo} value={to} onChange={(event) => setTo(event.target.value)} placeholder="Support email" /></label>{caseData?.demo ? <p className="input-hint"><span className="demo-tag">Demo</span> This sends to Tickback’s demo desk, playing the organiser.</p> : drafts?.[0]?.to && verifiedRecipient ? <p className="input-hint">Verified on the platform&apos;s own page. Source: <a href={verifiedRecipient.source} target="_blank" rel="noreferrer">{platformRoute?.displayName ?? "platform"} contact page</a>.</p> : <p className="input-hint">{platformRoute?.chatPath ? <>We do not hold a verified email address for this step. Use <a href={platformRoute.chatPath.source} target="_blank" rel="noreferrer">{platformRoute.chatPath.value}</a>, or enter an address you checked yourself.</> : c.emailHelp}</p>}{!caseData?.demo && drafts?.[0]?.step === "L1" && !verifiedRecipient && <label>Where did they give you this address?<input value={grievanceSource} onChange={(event) => setGrievanceSource(event.target.value)} placeholder="Their message or Help page" /></label>}<label>Subject<input value={subject} onChange={(event) => setSubject(event.target.value)} /></label>{tracking?.inboxAddress && <label className="input-hint"><input type="checkbox" disabled={!!caseData?.demo} checked={includeCaseInbox} onChange={(event) => setIncludeCaseInbox(event.target.checked)} /> We&apos;ve added our case inbox in CC so we see their reply. {caseData?.demo ? "Keep it in CC for the demo." : "You can remove it."}</label>}</>}
        <label>Message<textarea value={body} onChange={(event) => setBody(event.target.value)} rows={9} /></label>
        {drafts?.[0]?.attachChecklist?.length ? <><p className="section-kicker">ATTACH THESE FROM YOUR PHONE</p><ul className="checklist">{drafts[0].attachChecklist.map((item) => <li key={item}>{item}</li>)}</ul></> : null}
        {drafts?.[0]?.step === "L1" && grievanceSource.trim() && <p className="input-hint">The message will say: I could not find the Grievance Officer&apos;s address on your site, so I am sending this to the address in {grievanceSource.trim()}.</p>}
        {drafts?.[0]?.channel === "bank" && <p className="input-hint">Send this from your bank app&apos;s help section, or to the customer care email on your statement. Keep the reference they give you.</p>}
        <button className="button button-primary" onClick={drafts?.[0]?.channel === "email" ? openGmail : openEmail} disabled={!body.trim() || (drafts?.[0]?.channel === "email" && (!to.trim() || !subject.trim()))}>{drafts?.[0]?.channel === "email" ? c.openEmail : drafts?.[0]?.channel === "chat" ? "Copy chat message" : "Copy my message"}</button>
        {drafts?.[0]?.channel === "email" && <button className="button button-secondary" onClick={openEmail}>Open in another email app</button>}
        {drafts?.[0]?.channel === "email" && <button className="button button-secondary" onClick={async () => { await copy(outboundBody()); setSentPrompt(true); }}>Copy message</button>}
        {drafts?.[0]?.channel === "email" && exactInbox && includeCaseInbox && <div className="cc-copy"><span><strong>{c.ccLabel}</strong><code>{exactInbox}</code></span><button className="button button-secondary" onClick={() => copy(exactInbox)}>Copy CC address</button></div>}
        {to && <button className="text-button" onClick={() => copy(to)}>Copy address</button>}
        <p className="example-source">{drafts?.[0]?.channel === "email" ? c.emailNote : "You send this yourself. Nothing is sent from Tickback."}</p>
        {sentPrompt && <div className="send-confirm"><p>Did you send it?</p><button className="button button-primary" onClick={markDraftSent} disabled={busy}>Yes, I&apos;ve sent it</button><button className="button button-secondary" onClick={() => setSentPrompt(false)}>Not yet</button></div>}
      </div>
    </div>}
    {replyOpen && <div className="sheet-backdrop" role="presentation" onClick={() => setReplyOpen(false)}><div className="sample-sheet" role="dialog" aria-modal="true" aria-label="Their reply" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><div className="sheet-heading"><h2>What did they say?</h2><button className="text-button" onClick={() => setReplyOpen(false)}>Close</button></div><label>Their reply<textarea value={reply} onChange={(event) => setReply(event.target.value)} rows={8} placeholder="Paste their reply here" /></label><label>Add screenshot<input type="file" accept="image/*" onChange={(event) => setReplyImage(event.target.files?.[0] ?? null)} /></label>{replyImage && <p className="input-hint">{replyImage.name}</p>}<button className="button button-primary" onClick={submitReply} disabled={busy || (!reply.trim() && !replyImage)}>Read their reply</button></div></div>}
    {landedOpen && <div className="sheet-backdrop" role="presentation" onClick={() => setLandedOpen(false)}><div className="sample-sheet" role="dialog" aria-modal="true" aria-label="Money landed" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><div className="sheet-heading"><h2>It&apos;s in?</h2><button className="text-button" onClick={() => setLandedOpen(false)}>Close</button></div><label>How much came back? ₹<input type="number" min="0" step="0.01" value={landedAmount} onChange={(event) => setLandedAmount(event.target.value)} /></label><button className="button button-primary" disabled={busy || !landedAmount} onClick={confirmLanded}>Confirm and close case</button></div></div>}
    {deleteOpen && <div className="sheet-backdrop" role="presentation" onClick={() => setDeleteOpen(false)}><div className="sample-sheet" role="dialog" aria-modal="true" aria-label="Delete case" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><h2>Delete this case?</h2><p>We&apos;ll remove your messages, screenshots and drafts. This can&apos;t be undone.</p><button className="button button-primary" disabled={busy} onClick={deleteCase}>Delete case</button><button className="button button-secondary" onClick={() => setDeleteOpen(false)}>Keep it</button></div></div>}
    {payOpen && caseData?.upiVpa && <div className="sheet-backdrop" role="presentation" onClick={() => setPayOpen(false)}><div className="sample-sheet" role="dialog" aria-modal="true" aria-label="Stay on it" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><div className="sheet-heading"><h2>Stay on it till the money lands</h2><button className="text-button" onClick={() => setPayOpen(false)}>Close</button></div><p className="case-amount">₹49 for this case</p><ul className="checklist"><li>We check on the due date and tell you when to chase</li><li>Every next message is written from your case facts</li><li>Grievance officer and helpline steps, with the right rule cited</li><li>{guaranteeLine}</li></ul>{!isAndroid && qrImage && <img className="upi-qr" src={qrImage} alt="UPI payment QR for ₹49" />}{(isAndroid || isIOS) && <a className="button button-primary" href={buildUpiLink(caseData.upiVpa, caseData.upiName, code)}>Pay ₹49 by UPI</a>}{isIOS && qrImage && <a className="button button-secondary" href={qrImage} download={`tickback-${code}-upi.png`}>Save QR to Photos</a>}<p>UPI ID: {caseData.upiVpa} <button className="text-button" onClick={() => copy(caseData.upiVpa!)}>Copy</button></p><button className="text-button" onClick={() => copy("49.00")}>Copy amount</button><p className="input-hint">Add {code} in the payment note so we can match it.</p><button className="button button-secondary" disabled={busy} onClick={paid}>I&apos;ve paid</button><p className="example-source">We confirm payments by hand in our first weeks. If we can&apos;t find yours, we&apos;ll tell you here.</p></div></div>}
  </main>;
}
