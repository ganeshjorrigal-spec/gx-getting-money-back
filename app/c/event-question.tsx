"use client";
import {WhyAsk} from "../components/why-ask";
import { eventQuestionOptions, isRefundDeadlineQuestion } from "../../lib/event-answers";
import { caseCopy } from "../copy";
export function EventQuestion({ question, busy, earlier, answer, onEarlier, onAnswer, onChange }: {
  question: { id: string; text: string; options: string[] }; busy: boolean; earlier: boolean; answer: string;
  onEarlier: () => void; onAnswer: (value?: string) => void | Promise<void>; onChange: (value: string) => void;
}) {
  return <article className="case-card"><h2>{question.text}</h2><WhyAsk question={question.id}/>
    <div className="answer-options">{eventQuestionOptions(question).map(option => <button className="situation-chip" key={option} onClick={() => option === "Earlier" ? onEarlier() : onAnswer(option)} disabled={busy}>{option}</button>)}</div>
    {(earlier || question.options.length === 0 || isRefundDeadlineQuestion(question)) && <div className="answer-form"><label htmlFor="case-answer">{earlier ? "Choose the date" : "Your answer"}</label><input id="case-answer" type={earlier ? "date" : "text"} value={answer} onChange={event => onChange(event.target.value)} /><button className="button button-primary" onClick={() => onAnswer()} disabled={!answer || busy}>{caseCopy.continue}</button></div>}
  </article>;
}
