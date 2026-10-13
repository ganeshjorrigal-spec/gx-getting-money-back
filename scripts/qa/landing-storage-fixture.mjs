// Local browser proof only. Run after build-web.mjs; never part of deployment.
import {writeFile} from 'node:fs/promises';
await writeFile('out/proof-local-cases.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Local UI fixture</title></head><body>
<h1>Local UI fixture only</h1><p>No backend access. Only RG-SEED01 is added or removed.</p>
<button id="save">Save a local sample case</button><button id="remove">Remove the local sample case</button><p id="status"></p><a href="/">Open local landing</a>
<script>
const key='tickback.cases';
function cases(){try{const value=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(value)?value:[];}catch{return [];}}
document.getElementById('save').onclick=()=>{const value=cases().filter(c=>c.code!=='RG-SEED01');value.unshift({code:'RG-SEED01',token:'synthetic-local-preview',title:'Local sample case',updatedAt:Date.now()});localStorage.setItem(key,JSON.stringify(value));document.getElementById('status').textContent='Local sample saved';};
document.getElementById('remove').onclick=()=>{localStorage.setItem(key,JSON.stringify(cases().filter(c=>c.code!=='RG-SEED01')));document.getElementById('status').textContent='Only local sample removed';};
</script></body></html>`);
console.log('Local saved-case fixture written. No backend access.');
