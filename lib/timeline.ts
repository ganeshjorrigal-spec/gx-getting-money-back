export function visibleTimeline<T extends {type:string;createdAt:number;summary:string}>(rows:T[],company:string) {
 const seen=new Set<string>();
 return rows.filter(row=>{const key=`${row.type}:${Math.floor(row.createdAt/60000)}`;if(seen.has(key))return false;seen.add(key);return true;}).map(row=>{
  let summary=row.summary;
  if(/^Prepared /.test(summary))summary=summary.includes("FLIGHT_bank")?"Bank tracing message ready":summary.includes("FLIGHT_call")?"Support call ready":/airsewa|nch/i.test(summary)?"Complaint steps ready":`Mail to ${company} ready`;
  if(/^You sent the \w+ message$/.test(summary))summary=`Mail sent to ${company}`;
  if(/^You answered /.test(summary))summary="You confirmed a case detail";
  return {...row,summary};
 });
}
