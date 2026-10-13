export function intakeIdentity(saved?:{name?:string|null;contact?:string|null;chase?:{name?:string;mobile?:string;email?:string}|null}) {
 const contact=saved?.contact?.trim()??'';
 return {name:saved?.chase?.name??saved?.name??'',email:saved?.chase?.email??(contact.includes('@')?contact:''),mobile:saved?.chase?.mobile??(contact&&!contact.includes('@')?contact:'')};
}
