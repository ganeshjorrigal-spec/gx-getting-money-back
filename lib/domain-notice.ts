// The move notice only belongs on the former Convex address. Keep its client
// and network request out of the new domain, previews and localhost.
export function needsDomainLookup(hostname:string){return hostname.toLowerCase().endsWith('.convex.site');}
export async function readDomainMove(origin:string,convexUrl:string|undefined,load:()=>Promise<()=>Promise<{app:string;oldApp:string}>>){
 if(!convexUrl||!needsDomainLookup(new URL(origin).hostname))return false;
 try{const query=await load(),{app,oldApp}=await query();return !!app&&!!oldApp&&new URL(app).origin!==new URL(oldApp).origin&&origin===new URL(oldApp).origin;}catch{return false;}
}
