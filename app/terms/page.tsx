import {callingCopy} from '../copy';
import {pricing,trialPriceLine} from '../../lib/pricing';
import { PolicyPage } from "../policy-page";

export const metadata = { title: "Terms | Refund Genie" };
export default function Page() { return <PolicyPage title="Terms"><section><h2>What Refund Genie does</h2><p>Refund Genie reads the messages you provide, explains refund routes and dates with their sources, and writes refund messages. You can send them yourself or give written permission for Genie to send and follow up.</p></section><section><h2>You stay in control</h2><p>{callingCopy.termsControl}</p></section><section><h2>Free trial and annual plan</h2><p>{trialPriceLine()} Landed refunds are counted on this device across flights and events. Demo and hand-helped cases do not count and stay free. An active annual plan covers every case.</p></section><section><h2>Limits</h2><p>Refund Genie is not legal advice and does not act as your lawyer. The company and your bank control whether and when a refund arrives.</p></section></PolicyPage>; }
