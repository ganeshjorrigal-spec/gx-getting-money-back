"use client";
import {AnswerStep,SharedSummary,SavedTick,useSavedAnswer} from '../components/answer-progress';
import {intakeIdentity} from "../../lib/intake-identity";
import {WhyAsk} from "../components/why-ask";
import {callingCopy} from '../copy';
import { useState } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { authorityLine } from "../../lib/chase";
import { userError } from "../../lib/user-error";
export function ChaseAuthority({
  code,
  token,
  company,
  pnr,
  chase,
  demo,
  saved,
  canSkip = false,
}: {
  code: string;
  token: string;
  company: string;
  pnr: string;
  chase: { active: boolean; letterUrl: string | null; callsAuthorisedAt?: number | null; mobile?:string } | null;
  demo: boolean;
  saved?:{name?:string|null;contact?:string|null};
  canSkip?: boolean;
}) {
  const {saved:recentSaved,markSaved}=useSavedAnswer();
  const [review,setReview]=useState(false),[callReview,setCallReview]=useState(false);
  const authorise = useAction(api.chaseActions.authorise),
    allowCalls = useMutation(api.calls.allow),
    requestCall = useMutation(api.calls.request),
    stop = useMutation(api.chase.stop),
    skip = useMutation(api.chase.skipDemo);
  const mode=useQuery(api.calls.mode,{code,token});
  const status = useQuery(
    api.chase.status,
    chase?.active ? { code, token } : "skip",
  );
  const [callAccepted, setCallAccepted] = useState(false),
    [show, setShow] = useState(false),
    [name, setName] = useState(""),
    [mobile, setMobile] = useState(chase?.mobile || intakeIdentity(saved).mobile),
    [email, setEmail] = useState(""),
    [accepted, setAccepted] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const backToDetails=()=>{setReview(false);setAccepted(false);};
  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    setError("");
    try {
      await fn();markSaved("Permission");
      setShow(false);
    } catch (e) {
      setError(userError(e));
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="case-card">
      <h2>Let Genie send and follow up</h2><SavedTick field={recentSaved}/>
      {!show&&!chase?.active&&<SharedSummary screen="chase-permission" items={[{label:"Company",value:company},{label:"PNR",value:pnr}]}/>}
      <p>You can keep sending from your own Gmail instead.</p>
      <p>
        Test release: Genie can mail only approved test addresses. Real-company
        sending is off.
      </p>
      {demo && <p>Demo. Nothing is sent to a real company.</p>}
      {chase && !chase.active && <p>Genie is stopped. No more queued mail will be sent.</p>}
      {chase?.active ? (
        <>
          <p>Written permission saved. {status}</p>
          <p>{mode==="live"?callingCopy.liveTestOnly:callingCopy.simulatedNotice}</p>
          {!chase.callsAuthorisedAt ? <><AnswerStep step={callReview?2:1} total={2}/>{callReview?<SharedSummary screen="call-confirm" confirm items={[{label:"Company",value:company},{label:"PNR",value:pnr},{label:"Mobile",value:mobile,edit:()=>setCallReview(false)}]}/>:<SharedSummary screen="call-question" items={[{label:"Company",value:company},{label:"PNR",value:pnr}]}/>}<label><input id="calling-consent" type="checkbox" checked={callAccepted} onChange={e=>{setCallAccepted(e.target.checked);setCallReview(false);}}/><WhyAsk field="consent"/>{callingCopy.permission(company)}</label>{callAccepted&&!callReview&&<label>{callingCopy.mobileLabel}<input required type="tel" value={mobile} onChange={e=>setMobile(e.target.value)}/><WhyAsk field="mobile" personal/></label>}<button disabled={busy||!callAccepted||!/^\+?[0-9 ()-]{7,20}$/.test(mobile)} onClick={()=>callReview?run(()=>allowCalls({code,token,accepted:callAccepted,mobile})):setCallReview(true)}>{callReview?callingCopy.savePermission:"Review calling permission"}</button></> : demo && <button disabled={busy||!mode} onClick={()=>run(()=>requestCall({code,token,fixture:"reference",expectedMode:mode!}))}>{mode==="live"?callingCopy.startLiveTest:callingCopy.runSimulation}</button>}

          <button
            disabled={busy}
            className="text-button"
            onClick={() => run(() => stop({ code, token }))}
          >
            Stop Genie
          </button>
          {canSkip && (
            <button
              disabled={busy}
              className="button button-primary"
              onClick={() => run(() => skip({ code, token }))}
            >
              Skip ahead 5 days
            </button>
          )}
          <p>
            Stops queued mail. A mail already accepted by Gmail cannot be
            recalled.
          </p>
        </>
      ) : (
        <button className="button button-primary" onClick={() => {const held=intakeIdentity(saved);setName(held.name||name);setEmail(held.email||email);setMobile(held.mobile||mobile);setReview(false);setShow(true);}}>
          Let Genie send and follow up
        </button>
      )}
      {chase?.letterUrl && (
        <p>
          <a href={chase.letterUrl} target="_blank" rel="noreferrer">
            Letter of authority (PDF)
          </a>
        </p>
      )}
      {show && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if(!review){setReview(true);return;}
            void run(() =>
              authorise({ code, token, name, email, accepted }),
            );
          }}
        >
          <AnswerStep step={review?2:1} total={2}/>{review?<SharedSummary screen="mail-confirm" confirm items={[{label:"Company",value:company},{label:"PNR",value:pnr},{label:"Name",value:name,edit:backToDetails},{label:"Email",value:email,edit:backToDetails}]}/>:<SharedSummary screen="mail-question" items={[{label:"Company",value:company},{label:"PNR",value:pnr},{label:"Name",value:name||"Not yet shared"},{label:"Email",value:email||"Not yet shared"}]}/>}
          <div hidden={review}><label>
            Full name (as on your booking)
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            /><WhyAsk field="name" personal/>
          </label>
          <label>
            Your email (copied on every mail)
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><WhyAsk field="email" personal/>
          </label>
          </div><div hidden={!review}><label>
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            /><WhyAsk field="consent"/>
            {authorityLine(company, pnr)}
          </label>
          <p>
            This permission and its time are saved. The first mail includes your
            letter of authority, name, email and PNR. Stop Genie ends
            future sending.
          </p></div>
          <button
            className="button button-primary"
            disabled={busy || (review&&!accepted)}
          >
            {review?"Save permission":"Review permission"}
          </button>
          {review&&<button type="button" className="text-button" onClick={backToDetails}>Back to details</button>}
          <button
            type="button"
            className="text-button"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        </form>
      )}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
