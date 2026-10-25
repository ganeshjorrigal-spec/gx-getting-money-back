import {readFile} from 'node:fs/promises';
import {checkTranscript} from '../lib/transcript-checker';
import {n4BaselineFixtures,n4KnownFacts} from '../lib/fixtures/n4-transcripts';
const args=process.argv.slice(2);
if(args.includes('--fixtures')){
 console.log(JSON.stringify(n4BaselineFixtures().map(f=>({id:f.id,source:f.source,...checkTranscript(f.transcript,n4KnownFacts)})),null,2));
}else{
 const file=args.indexOf('--file'),stdin=args.includes('--stdin');
 if(!stdin&&file<0)throw new Error('Use --fixtures, --stdin, or --file outside-repo.json. Output contains scores only.');
 let source='';if(stdin){for await(const chunk of process.stdin)source+=chunk;}else source=await readFile(args[file+1],'utf8');
 const data=JSON.parse(source);
 const transcript=data.artifact?.transcript??data.transcript??data.call?.transcript;
 const known=data.knownFacts??{pnr:data.facts?.pnr,name:data.facts?.nameOnTicket,route:data.facts?.routeFrom&&data.facts?.routeTo?`${data.facts.routeFrom} to ${data.facts.routeTo}`:undefined};
 console.log(JSON.stringify({id:'saved-call',...checkTranscript(transcript,known)},null,2));
}
