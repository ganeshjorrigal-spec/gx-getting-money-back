export function greeting(contact?:{value:string;role:string}|null, fallback="Support team") {
 const candidate=contact?.value.split(",")[0].trim();
 const named=candidate&&candidate!==contact?.role&&!/@|\d{5}|demo|https?:/i.test(candidate);
 return `Dear ${named?candidate:contact?.role??fallback},`;
}
// Idempotent: presentation of old drafts and newly prepared drafts uses the same closing.
export function finishMail(body:string,code:string,attachments:string[]=[],name?:string|null) {
 let text=body.replace(/\n*Please reply to all on this mail and keep (?:TB|RG)-[A-Z0-9]{6} in the subject, so my records stay in one thread\./g,"")
  .replace(/\n*Attached: [^\n]+/g,"");
 const closing=text.match(/\n\nThank you[.,]?[^]*$/);
 // Some older flight drafts appended fare facts after their sign-off. Keep those facts.
 let signoff=name?.trim()?`Thank you,\n${name.trim()}`:"Thank you.";
 if(closing){const after=closing[0].replace(/^\n\nThank you[.,]?\s*/,"");text=text.slice(0,closing.index);if(after&&after!==name?.trim())text+=`\n\n${after}`;}
 text=text.trim();
 const attached=attachments.length?`\n\nAttached: ${[...new Set(attachments)].join(", ")}.`:"";
 return `${text}${attached}\n\nPlease reply to all on this mail and keep ${code} in the subject, so my records stay in one thread.\n\n${signoff}`;
}
