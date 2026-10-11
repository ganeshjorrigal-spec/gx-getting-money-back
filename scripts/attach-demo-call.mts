import {readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const filename=process.argv[2];if(!filename)throw new Error('Pass a local JSON input file; never paste credentials.');
const input=JSON.parse(await readFile(filename,'utf8'));
const result=spawnSync(process.execPath,['node_modules/convex/bin/main.js','run','calls:attachRecording',JSON.stringify({id:input.callId,url:input.url,transcript:input.transcript})],{encoding:'utf8'});
// Do not print a private URL, transcript or argument-validation echo.
if(result.status!==0){console.error('Recording was not saved. Check the demo record and safe HTTPS input.');process.exit(1);}console.log('Demo role-play recording saved. Call mode unchanged.');
