import type {MutationCtx,QueryCtx} from '../_generated/server';
import type {Id} from '../_generated/dataModel';
export async function ownsFile(ctx:QueryCtx|MutationCtx,caseId:Id<'cases'>,storageId:Id<'_storage'>){
 const row=await ctx.db.query('caseFiles').withIndex('by_storage',q=>q.eq('storageId',storageId)).unique();return row?.caseId===caseId;
}
export async function claimCaseFiles(ctx:MutationCtx,ids:Id<'_storage'>[],caseId:Id<'cases'>,deviceHash?:string){
 for(const storageId of new Set(ids)){
  const row=await ctx.db.query('caseFiles').withIndex('by_storage',q=>q.eq('storageId',storageId)).unique();
  if(!row||row.caseId!==caseId&&(row.caseId||!deviceHash||row.deviceHash!==deviceHash||Date.now()-row.createdAt>86400000))throw new Error('Screenshot does not belong to this case or its pending upload');
  if(!row.caseId)await ctx.db.patch(row._id,{caseId});
 }
}
export async function deleteOwnedFiles(ctx:MutationCtx,caseId:Id<'cases'>){
 for(const row of await ctx.db.query('caseFiles').withIndex('by_case',q=>q.eq('caseId',caseId)).take(100)){
  await ctx.storage.delete(row.storageId);await ctx.db.delete(row._id);
 }
}
