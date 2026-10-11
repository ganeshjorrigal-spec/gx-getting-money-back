// Only a company-owned page can supply a care number. Missing companies remain blocked.
export const flightCareNumbers=[{company:"IndiGo",careNumber:"+911246173838",sourceUrl:"https://www.goindigo.in/contact-us/complaints.html",checkedAt:"2026-10-11",menuNotes:"Listen to the current menu; no verified key sequence is available."}];
export const flightCare=(company:string)=>flightCareNumbers.find(c=>c.company===company)??null;
