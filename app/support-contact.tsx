export function SupportContact() {
  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim();
  return email ? <a className="text-link" href={`mailto:${email}`}>{email}</a> : <span>Our support email is being set up. Please check this page again before purchasing.</span>;
}
