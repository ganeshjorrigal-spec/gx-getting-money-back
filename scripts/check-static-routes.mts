import {readFile} from 'node:fs/promises';
import {publicRoutes} from '../lib/public-routes';
const origin=process.argv[2];if(!origin)throw new Error('Supply the static site origin');
const results=[];
for(const route of publicRoutes){
 const path='out'+route+'index.html';const html=await readFile(path,'utf8');
 const response=await fetch(new URL(route,origin));if(response.status!==200||!html.includes('<main'))throw new Error('Static route failed: '+route);
 results.push({route,status:response.status,export:path});
}
console.log(JSON.stringify(results,null,2));
