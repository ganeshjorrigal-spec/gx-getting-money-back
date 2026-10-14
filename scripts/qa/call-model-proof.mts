import {mkdir,writeFile} from 'node:fs/promises';
import {assistantOverrides,startCall} from '../../lib/call-transport';
const overrides=assistantOverrides({name:'Demo Passenger',pnr:'SAMPLE',company:'Demo Air',mobile:''});
let requests=0;
const result=await startCall({}, {assistantOverrides:overrides},'Care: Demo refund reference.',async()=>{requests++;throw new Error('Unexpected network request');});
if(result.mode!=='simulated'||requests)throw new Error('Simulated mode must not request a call');
// Remove destination numbers entirely from saved proof, including fixture values.
const saved=JSON.parse(JSON.stringify({mode:result.mode,requests,assistantOverrides:overrides},(key,value)=>key==='number'?undefined:value));
await mkdir('docs/qa/d050-2026-10-14',{recursive:true});
await writeFile('docs/qa/d050-2026-10-14/default-simulated-override.json',JSON.stringify(saved,null,2)+'\n');
console.log('Saved default simulated override: zero requests, no phone numbers.');
