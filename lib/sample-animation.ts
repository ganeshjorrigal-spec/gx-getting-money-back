export function playSample(sample:HTMLElement|null,reduced=false){
 if(!sample)return ()=>{};
 if(reduced){sample.classList.add('sample-finished');return ()=>{};}
 let visible=true,finished=false,timer:ReturnType<typeof setTimeout>|undefined,remaining=8000,due=0,disposed=false,frame:number|undefined;
 const arm=()=>{if(!visible||disposed)return;due=Date.now()+remaining;timer=setTimeout(()=>{timer=undefined;finished?restart():finish();},remaining);};
 const finish=()=>{if(finished||disposed)return;if(timer!==undefined)clearTimeout(timer);timer=undefined;finished=true;sample.classList.add('sample-finished');remaining=3000;arm();};
 const restart=()=>{if(disposed||!visible)return;finished=false;remaining=8000;sample.classList.remove('sample-playing','sample-finished');frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(()=>{frame=undefined;if(!disposed&&visible){sample.classList.add('sample-playing');arm();}});});};
 const ended=(event:AnimationEvent)=>{if((event.target as HTMLElement).classList?.contains('sample-landed')&&visible)finish();};
 sample.addEventListener('animationend',ended);sample.classList.add('sample-playing');arm();
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){visible=entry.isIntersecting;sample.classList.toggle('sample-paused',!visible);if(!visible&&timer!==undefined){remaining=Math.max(0,due-Date.now());clearTimeout(timer);timer=undefined;}else if(visible&&timer===undefined){if(!finished&&!sample.classList.contains('sample-playing')&&frame===undefined)restart();else if(frame===undefined)arm();}}},{threshold:0});
 observer.observe(sample.closest('#hero')??sample);
 return ()=>{disposed=true;observer.disconnect();if(frame!==undefined)cancelAnimationFrame(frame);sample.removeEventListener('animationend',ended);if(timer!==undefined)clearTimeout(timer);sample.classList.remove('sample-paused');};
}
