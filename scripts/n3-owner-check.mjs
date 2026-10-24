// Authenticated Convex CLI only. No public admin endpoint and no stored credentials.
import {execFileSync} from 'node:child_process';
const target='abundant-marten-136';
const args=process.argv.slice(2),code=args[0],date=args[1],execute=args.includes('--run');
if(!/^RG-[A-Z0-9]{6}$/.test(code??'')||!/^\d{4}-\d{2}-\d{2}$/.test(date??''))throw new Error('Use: node scripts/n3-owner-check.mjs RG-CODE01 YYYY-MM-DD [--run]');
const parsed=new Date(`${date}T00:00:00Z`);if(!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==date)throw new Error('Use a valid date');
function cli(a){return execFileSync(process.execPath,['node_modules/convex/bin/main.js',...a,'--deployment',target],{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();}
function query(source){return JSON.parse(cli(['run','--inline-query',source]));}
function mutation(name,a){cli(['run',name,JSON.stringify(a)]);}
try{
 if(cli(['env','get','CHASE_REAL_COMPANIES_ENABLED'])==='true')throw new Error('Refusing: real-company sending must be off');
 const source=`const item=await ctx.db.query('cases').withIndex('by_code',q=>q.eq('code',${JSON.stringify(code)})).unique(); if(!item)return null; const inputs=await ctx.db.query('inputs').withIndex('by_case',q=>q.eq('caseId',item._id)).take(20); return {id:item._id,code:item.code,stage:item.stage,kind:item.refundType,demo:!!item.demo,confirmed:!!item.emailConfirmedAt&&item.email===item.confirmedCaseEmail,hasLink:!!(item.confirmedEncryptedCaseToken||item.chase?.encryptedCaseToken),synthetic:item.facts?.pnr==='SAMPLE'&&item.facts?.bookingId==='TEST-ID'&&inputs.some(i=>i.kind==='initial'&&/made.up|fictional/i.test(i.text??'')),rung:item.ladderLevel,read:item.facts,plan:item.flightPlan,runId:item.latestRunId};`;
 const item=query(source);
 if(!item||!item.synthetic||item.demo||item.kind!=='flight'||item.stage.startsWith('CLOSED')||!item.confirmed||!item.hasLink||!item.runId)throw new Error('Refusing: use an open, confirmed, explicitly made-up flight with SAMPLE PNR and TEST-ID booking');
 const previous=query(`const rows=await ctx.db.query('chaseNotices').withIndex('by_key',q=>q.eq('caseId',${JSON.stringify(item.id)}).eq('key',${JSON.stringify('due-check:'+date)})).take(1);return {exists:rows.length>0};`);
 if(previous.exists)throw new Error('Already attempted for this case/date. Do not reset the notice to send again');
 console.log(JSON.stringify({deployment:target,case:code,testDeadline:date,mode:execute?'prepare-and-check':'read-only-preview',realCompanySending:false}));
 if(!execute)process.exit(0);
 const read={...item.read,reply:{...item.read.reply,fromCompany:item.read.bookedVia==='direct'?item.read.airline:item.read.bookedVia,claim:'under_review',promisedDate:date,summary:'Made-up owner test: refund is under review.',confidence:1}};
 const plan={...item.plan,route:'WAIT',pastDue:true,dueDate:date,checkDate:date,dueSource:'user_choice',dueSourceText:'Owner-only made-up due-date test.',rung:item.rung,nextStep:'FLIGHT_status',nextPerson:null,body:null,to:null,cc:[],questions:[],note:'Made-up owner test. Waiting for your answer.'};
 mutation('flights:apply',{caseId:item.id,runId:item.runId,read,plan,model:'owner-fixture',latencyMs:0,inputTokens:0,outputTokens:0,totalTokens:0});
 const checks=query(`return await ctx.db.query('checkins').withIndex('by_case',q=>q.eq('caseId',${JSON.stringify(item.id)})).order('desc').take(5).then(rows=>rows.filter(c=>c.date===${JSON.stringify(date)}&&c.status==='scheduled').map(c=>({_id:c._id})));`);
 // The scheduler may already have fired. Repeated fire is intentionally harmless.
 for(const check of checks){mutation('checkins:fire',{checkinId:check._id});mutation('checkins:fire',{checkinId:check._id});}
 console.log('Owner test prepared. Check the phone inbox. No company mail or call requested.');
}catch(error){console.error(error instanceof Error&& !('status' in error)?error.message:'Convex owner command failed; details withheld to protect case data');process.exitCode=1;}
