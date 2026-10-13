"use client";
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
  chase: { active: boolean; letterUrl: string | null; callsAuthorisedAt?: number | null } | null;
  demo: boolean;
  saved?:{name?:string|null;contact?:string|null};
  canSkip?: boolean;
}) {
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
    [mobile, setMobile] = useState(""),
    [email, setEmail] = useState(""),
    [accepted, setAccepted] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    setError("");
    try {
      await fn();
      setShow(false);
    } catch (e) {
      setError(userError(e));
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="case-card">
      <h2>Let Genie send and follow up</h2>
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
          {!chase.callsAuthorisedAt ? <><label><input type="checkbox" checked={callAccepted} onChange={e=>setCallAccepted(e.target.checked)}/><WhyAsk field="consent"/>{callingCopy.permission(company)}</label><button disabled={busy||!callAccepted} onClick={()=>run(()=>allowCalls({code,token,accepted:callAccepted}))}>{callingCopy.savePermission}</button></> : demo && <button disabled={busy||!mode} onClick={()=>run(()=>requestCall({code,token,fixture:"reference",expectedMode:mode!}))}>{mode==="live"?callingCopy.startLiveTest:callingCopy.runSimulation}</button>}

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
        <button className="button button-primary" onClick={() => {const held=intakeIdentity(saved);setName(held.name||name);setEmail(held.email||email);setMobile(held.mobile||mobile);setShow(true);}}>
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
            void run(() =>
              authorise({ code, token, name, mobile, email, accepted }),
            );
          }}
        >
          <label>
            Full name (as on your booking)
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            /><WhyAsk field="name" personal/>
          </label>
          <label>
            Mobile number
            <input
              required
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            /><WhyAsk field="mobile" personal/>
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
          <label>
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            /><WhyAsk field="consent"/>
            {authorityLine(company, pnr)}
          </label>
          <p>
            This permission and its time are saved. The first mail includes your
            letter of authority, name, mobile, email and PNR. Stop Genie ends
            future sending.
          </p>
          <button
            className="button button-primary"
            disabled={busy || !accepted}
          >
            Save permission
          </button>
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
