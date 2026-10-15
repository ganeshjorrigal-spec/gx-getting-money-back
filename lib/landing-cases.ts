import type {SavedCase} from './case-link';
export function landingCases(serialized:string|null,limit=3):SavedCase[]{
 try{const items=JSON.parse(serialized||'[]');return Array.isArray(items)?items.filter(item=>item&&/^(?:TB|RG)-[A-Z0-9]{6}$/.test(item.code)&&typeof item.token==='string'&&item.token.length>0).slice(0,Math.max(0,Math.min(limit,20))):[];}catch{return [];}
}
