import {ReceiptSlip,StatusBadge,Icon} from './receipts';
import {landingSections as c} from '../copy';
export function AnimatedSample(){return <div className="animated-sample" aria-label={c.sample}>
 <div aria-hidden="true"><ReceiptSlip label={c.sample} rows={[{label:c.receiptLabels[0],value:c.sampleCompany},{label:c.receiptLabels[1],value:c.sampleDate},{label:c.receiptLabels[2],value:c.sampleNext},{label:c.receiptLabels[3],value:c.sampleAmount}]}>
 <div className="sample-message"><div className="sample-mail"><Icon/><span className="sample-ready">{c.mailReady}</span><span className="sample-sent">{c.sent}</span></div><blockquote className="sample-reply">{c.reply}</blockquote></div>
 <div className="sample-stamps"><span className="sample-overdue"><StatusBadge kind="overdue" label={c.overdue}/></span><span className="sample-landed"><StatusBadge kind="landed" label={c.landed}/></span></div>
 </ReceiptSlip></div>
 <div className="sr-only"><h2>{c.sample}</h2><p>{c.receiptLabels[0]}: {c.sampleCompany}. {c.receiptLabels[1]}: {c.sampleDate}. {c.receiptLabels[2]}: {c.sampleNext}. {c.receiptLabels[3]}: {c.sampleAmount}. {c.overdue}. {c.mailReady}. {c.sent}. {c.reply}. {c.landed}.</p></div>
 <p className="source-note sample-note">{c.sampleNote}</p>
 </div>;}
