import type {SavedCase} from './case-link';
export function landingCases(serialized:string|null):SavedCase[]{
 try{const items=JSON.parse(serialized||'[]');return Array.isArray(items)?items.filter(item=>item&&/^(?:TB|RG)-[A-Z0-9]{6}$/.test(item.code)&&typeof item.token==='string'&&item.token.length>0).slice(0,3):[];}catch{return [];}
}
