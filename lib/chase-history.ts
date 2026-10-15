export function chaseHistoryRows<T extends {createdAt:number}>(events:T[],expanded=false){
 const ordered=[...events].sort((a,b)=>b.createdAt-a.createdAt);return expanded?ordered:ordered.slice(0,1);
}
