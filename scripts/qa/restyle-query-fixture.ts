// Local-only presentation fixtures. No network, mutations, mail or calls.
import {getFunctionName} from 'convex/server';
export let proofData:any={};
export function setProofData(value:any){proofData=value;}
export function useQuery(ref:any){const name=getFunctionName(ref);if(name==='chaseDemo:view')return proofData.demoView;if(name==='cases:get')return proofData.item;if(name==='cases:drafts')return proofData.drafts;if(name==='googleConnect:status')return {inboxAddress:'fixture@example.invalid'};if(name==='flights:workCount')return {taps:4,replies:3,dates:3,drafts:3};if(name==='flights:replies')return proofData.replies??[];if(name==='cases:timeline')return [];return undefined;}
export function useMutation(){return ()=>{throw new Error('Local visual proof cannot change data');};}
export const useAction=useMutation;
