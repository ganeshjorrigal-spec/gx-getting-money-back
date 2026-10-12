import {pricing,trialPriceLine} from '../../lib/pricing';
import { PolicyPage } from "../policy-page";
import { SupportContact } from "../support-contact";
export const metadata = { title: "Refund and cancellation policy | Refund Genie" };
export default function Page() { return <PolicyPage title="Refund and cancellation policy"><section><h2>{pricing.annualTitle}</h2><p>{trialPriceLine()} The trial counts landed flight and event refunds on this device; demo and hand-helped cases stay free. An active annual plan covers every case for the year.</p></section><section><h2>Full refund if nothing is recovered</h2><p>{pricing.guarantee} Contact us to ask for the full annual payment refund.</p></section><section><h2>Ask for a refund or cancellation</h2><p>Contact Ganesh at <SupportContact />. Include your case code and payment date so we can check the annual payment and recovery record. Do not send bank details, passwords or OTPs.</p></section></PolicyPage>; }
