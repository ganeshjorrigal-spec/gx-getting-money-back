const usefulTerms = /\b(refund|processed|initiated|credited|bank|working days?|reference|arn|rrn|utr|booking|need|unable|cannot|failed)\b/i;

export function replyKeySentence(text: string): string {
  const sentences = (text.replace(/\r?\n+/g, " ").match(/[^.!?]+[.!?]?/g) ?? [])
    .map((sentence) => sentence.trim().replace(/\s+/g, " "))
    .filter((sentence) => sentence.length > 2 && !/^(hello|hi|dear|thanks|thank you)[,.!]?$/i.test(sentence));
  const ranked = sentences.map((sentence, index) => ({ sentence, index, score: (sentence.match(new RegExp(usefulTerms.source, "gi")) ?? []).length }));
  ranked.sort((a, b) => b.score - a.score || a.index - b.index);
  return (ranked[0]?.sentence ?? "Their reply was received.").slice(0, 240);
}

export function replyNextStepLabel(step: string | null, platform: string | null): string {
  const name = platform ?? "the organiser";
  const labels: Record<string, string> = {
    L0_email: `Email ${name} support`,
    L0_chat: `Send the next chat message to ${name}`,
    L1: `Escalate to ${name}'s Grievance Officer`,
    L2: "Prepare the consumer complaint",
    TRACE_ask: "Ask for the refund reference",
    TRACE_bank: "Ask your bank to trace the refund",
    FAILED_platform: `Ask ${name} for the payment status`,
    ACTION_form: "Complete the required refund step",
    NO_ROUTE_ask: `Ask ${name} about the refund option`,
    questions: "Answer the new questions",
    options: "Review your refund options",
    waitlist: "Join the waitlist",
    none: "Wait for the next check-in",
  };
  return step ? labels[step] ?? "Open the case for your updated next step" : "Open the case for your updated next step";
}
