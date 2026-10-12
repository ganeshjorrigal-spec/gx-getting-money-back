import Link from 'next/link';
import {PolicyFooter} from './policy-footer';
import {flightLandingCopy as c,productName,annualGuaranteeLine} from './copy';
import {LandingEnhancements} from './landing-enhancements';
import {Icon,ReceiptSlip,SourceLine,StatusBadge} from './components/receipts';
import {flightStatus} from '../lib/flight-status';
import {planFlight} from '../lib/flight';
import {sampleFlight} from '../lib/flight-sample';
import {todayIST,displayDate} from '../lib/dates';
const example=()=>{const r=sampleFlight();r.airline='SpiceJet';r.cancellationDate='2026-09-11';r.amountPaid=6240;return planFlight(r,todayIST());};
export default function Home(){
 const plan=example(),status=flightStatus(plan,todayIST());
 const receipt=<ReceiptSlip label='Sample case' status={<StatusBadge kind={status.pastDue?'overdue':'waiting'} label={status.pastDue?'Overdue':status.label}/>} stamp={status.pastDue?`OVERDUE · ${status.delay} ${status.delayUnit.toUpperCase()}`:undefined} rows={[
  {label:'WHO HAS IT',value:'SpiceJet'},
  {label:'WRITE TO NEXT',value:"MakeMyTrip's grievance officer",source:<a href='https://www.makemytrip.com/legal/in/eng/user_agreement.html' target='_blank' rel='noreferrer'>MakeMyTrip's own page</a>},
  {label:'DUE BY',value:<time dateTime={plan.dueDate!}>{displayDate(plan.dueDate!)}</time>,source:"DGCA paragraph 3(c). Counting from cancellation is Refund Genie's reading."},
  {label:'ABOVE THEM',value:'SpiceJet Nodal Officer',source:<a href={plan.above?.url??undefined} target='_blank' rel='noreferrer'>SpiceJet's own contact page</a>},
  {label:'AMOUNT',value:'₹6,240',source:'Made-up booking details'},
 ]}/>;
 return <main className='home-shell'><header className='site-header'><Link className='wordmark' href='/'>{productName}</Link><nav aria-label='Main'><a href='#how-it-works'>{c.howTitle}</a><Link prefetch={false} href='/start/?demo=flight'>{c.headerLink}</Link><Link prefetch={false} className='button button-primary' href='/start'>{c.primary}</Link></nav></header>
 <LandingEnhancements/>
 <section className='hero section-wrap' id='hero'><div className='hero-copy'><p className='eyebrow'>{c.eyebrow}</p><h1>{c.headline}</h1><p className='hero-sub'>{c.sub}</p><div className='hero-actions'><Link prefetch={false} className='button button-primary' href='/start'>{c.primary}</Link><Link prefetch={false} className='button button-secondary' href='/start/?demo=flight'>{c.secondary}</Link></div><p className='release-note'>{c.releaseNote}</p><div className='hero-receipt'>{receipt}</div></div><div className='illustration-slot hero-art' data-illustration='cancelled-flight' aria-hidden='true'/></section>
 <section className='brand-section section-wrap'><h2>{c.brandTitle}</h2><div className='brand-slot' data-brand-slot aria-hidden='true'/><p className='brand-names'>{c.companies.join(' · ')}</p><p className='source-note'>{c.notAffiliated}</p></section>
 <section className='story-band'><div className='section-wrap story-grid'><div><h2>{c.familiarTitle}</h2><div className='illustration-slot' data-illustration='customer-care' aria-hidden='true'/></div><div><p className='story-line'>{c.familiar}</p><p>{c.familiarAnswer}</p><SourceLine>{c.familiarSource}</SourceLine></div></div></section>
 <section className='section-wrap section-block'><h2>{c.whatTitle}</h2><div className='three-grid'>{c.what.map(([title,body],i)=><article className='value-card' key={title}><Icon kind={i===0?'mail':i===1?'rule':'follow'}/><h3>{title}</h3><p>{body}</p></article>)}</div></section>
 <section className='section-wrap section-block why-section'><h2>{c.whyTitle}</h2><div className='why-grid'>{c.why.map(([title,body])=><article key={title}><Icon kind='check'/><h3>{title}</h3><p>{body}</p></article>)}</div><div className='price-note'><p>{c.priceLine}</p><p>{annualGuaranteeLine}</p></div></section>
 <section className='assurance-band'><div className='section-wrap sample-showcase'><div><h2>{c.realCaseTitle}</h2><p>{c.realCaseNote}</p><Link className='button button-primary' prefetch={false} href='/start/?demo=flight'>{c.tryDemo}</Link></div><div className='phone-frame' aria-label='Sample flight case'>{receipt}</div></div></section>
 <section className='section-wrap section-block' id='how-it-works'><h2>{c.howTitle}</h2><div className='steps-grid'>{c.how.map(([title,body],i)=><article className='step' key={title}><span className='step-number'>{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
 <footer className='site-footer'><div className='section-wrap footer-inner'><Link className='wordmark' href='/'>{productName}</Link><p>{c.notAffiliated}</p><PolicyFooter/></div></footer></main>;
}
