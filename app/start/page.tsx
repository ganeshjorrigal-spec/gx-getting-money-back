"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { caseCopy, intakeCopy as c, productName } from "../copy";
import { compressScreenshot } from "../../lib/images";
import { getDeviceId, makeToken, saveCase, tokenHash } from "../../lib/case-link";
import { redact } from "../../lib/redact";

type Picture = { file: File; preview: string };

export default function StartPage() {
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [pasteHint, setPasteHint] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const create = useMutation(api.cases.create);
  const uploadUrl = useMutation(api.files.generateUploadUrl);

  useEffect(() => {
    const field = inputRef.current;
    if (field) { field.style.height = "auto"; field.style.height = `${field.scrollHeight}px`; }
  }, [message]);

  function toggleChip(label: string, line: string) {
    if (selected.includes(label)) {
      setSelected(selected.filter((item) => item !== label));
      setMessage(message.split("\n").filter((item) => item !== line).join("\n"));
    } else {
      setSelected([...selected, label]);
      setMessage(message.trim() ? `${message.trim()}\n${line}` : line);
    }
  }

  async function paste() {
    try {
      const value = await navigator.clipboard.readText();
      setMessage((current) => current ? `${current}\n${value}` : value);
      setPasteHint("");
    } catch { setPasteHint(c.pasteRefused); inputRef.current?.focus(); }
  }

  function addPictures(files: FileList | null) {
    if (!files) return;
    const room = 4 - pictures.length;
    const added = Array.from(files).filter((file) => file.type.startsWith("image/")).slice(0, room).map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setPictures((current) => [...current, ...added]);
  }

  function removePicture(preview: string) {
    URL.revokeObjectURL(preview);
    setPictures((current) => current.filter((picture) => picture.preview !== preview));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (working || (!message.trim() && pictures.length === 0 && selected.length === 0)) return;
    setWorking(true);
    setError("");
    try {
      const deviceId = getDeviceId();
      const storageIds = [];
      for (const picture of pictures) {
        const blob = await compressScreenshot(picture.file);
        const url = await uploadUrl({ deviceId });
        const response = await fetch(url, { method: "POST", headers: { "Content-Type": "image/jpeg" }, body: blob });
        if (!response.ok) throw new Error("Could not upload screenshot. Try again.");
        const result = await response.json();
        storageIds.push(result.storageId);
      }
      const token = makeToken();
      const hash = await tokenHash(token);
      const result = await create({ text: redact(message.trim()) || undefined, storageIds, chips: selected, tokenHash: hash, deviceId });
      saveCase({ code: result.code, token, updatedAt: Date.now() });
      window.location.assign(`/c/${result.code}#k=${token}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Your message is still here. Try again.");
      setWorking(false);
    }
  }

  return <main className="case-shell">
    <header className="site-header"><Link className="wordmark" href="/">{productName}<span className="wordmark-dot">.</span></Link><Link className="text-link" href="/sample">See a real case</Link></header>
    <div className="case-wrap intake-page">
      <p className="section-kicker">START YOUR CASE</p>
      <h1>{c.title}</h1>
      <p className="intake-helper">{c.helper}</p>
      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="refund-message">{c.title}</label>
        <textarea id="refund-message" ref={inputRef} value={message} onChange={(event) => setMessage(event.target.value)} maxLength={8000} rows={5} placeholder={c.placeholder} />
        <div className="intake-tools">
          <button type="button" className="text-button" onClick={paste}>{c.paste}</button>
          <button type="button" className="text-button" onClick={() => fileRef.current?.click()}>{c.screenshot}</button>
          <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(event) => { addPictures(event.target.files); event.target.value = ""; }} />
        </div>
        {pasteHint && <p className="input-hint">{pasteHint}</p>}
        {pictures.length > 0 && <div className="picture-list">{pictures.map((picture) => <div className="picture" key={picture.preview}>
          <img src={picture.preview} alt="Screenshot to add" />
          <button type="button" onClick={() => removePicture(picture.preview)} aria-label="Remove screenshot">×</button>
        </div>)}</div>}
        <fieldset className="chip-fieldset">
          <legend>{c.chipsLabel}</legend>
          <div className="situation-list">{c.chips.map(([label, line]) => <button type="button" className={`situation-chip ${selected.includes(label) ? "chip-selected" : ""}`} aria-pressed={selected.includes(label)} onClick={() => toggleChip(label, line)} key={label}>{label}</button>)}</div>
        </fieldset>
        <p className="input-safety">{c.safety}</p>
        {error && <p className="error-banner" role="alert">{error}</p>}
        <button className="button button-primary intake-submit" disabled={working || (!message.trim() && pictures.length === 0 && selected.length === 0)}>{working ? <><span className="spinner" aria-hidden="true" /> Reading your message…</> : c.submit}</button>
        {working && <div className="case-card progress-card intake-progress" role="status" aria-live="polite">
          <div className="progress-lead"><span className="spinner" aria-hidden="true" /><strong>Reading your message…</strong></div>
          <ol>{caseCopy.progress.map((step, index) => <li className={index === 0 ? "progress-current" : ""} key={step}><span>{index + 1}</span>{step}</li>)}</ol>
        </div>}
        {!message.trim() && pictures.length === 0 && selected.length === 0 && <p className="input-hint">{c.disabled}</p>}
      </form>
    </div>
  </main>;
}
