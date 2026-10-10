import { PolicyPage } from "../policy-page";
import { SupportContact } from "../support-contact";
export const metadata = { title: "Contact | Refund Genie" };
export default function Page() { return <PolicyPage title="Contact"><section><h2>Contact Ganesh</h2><p>For support, questions, or a refund or cancellation request, email <SupportContact />.</p><p>Your case code helps us find the right case. Do not send OTPs, passwords or bank details.</p></section></PolicyPage>; }
