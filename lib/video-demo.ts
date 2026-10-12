export const isVideoDemoEntry=(search:string)=>new URLSearchParams(search).get('demo')==='flight-self';
export const isSelfSendFlightDemo=(demo:{kind?:string;chaseStory?:boolean}|null|undefined)=>demo?.kind==='flight'&&!demo.chaseStory;
export function demoCcRoles(addresses:string[]){
 return Object.fromEntries(addresses.map(address=>[address,/\+airline@/i.test(address)?'Nodal Officer, Demo Air (demo)':/\+travelsite@/i.test(address)?'Grievance Officer, DemoTrips (demo)':'Refund Genie case inbox']));
}
