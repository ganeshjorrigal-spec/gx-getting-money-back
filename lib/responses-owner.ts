// Setup stays unavailable until the owner configures both server-only settings.
export function responsesOwner(): string {
 const owner=process.env.RESPONSES_OWNER_EMAIL?.trim().toLowerCase();
 if(!owner||!process.env.RESPONSES_SETUP_SECRET)throw new Error('Owner setup is not configured');
 return owner;
}
export function requireResponsesSecret(supplied?:string){
 responsesOwner();const expected=process.env.RESPONSES_SETUP_SECRET!;
 let difference=expected.length^(supplied?.length??0);
 for(let i=0;i<expected.length;i++)difference|=expected.charCodeAt(i)^(supplied?.charCodeAt(i)??0);
 if(difference)throw new Error('Owner setup permission required');
}
export function requireResponsesOwner(email?:string){
 if(email?.trim().toLowerCase()!==responsesOwner())throw new Error('Choose the configured owner account');
}
