export function playSample(sample:HTMLElement|null,reduced=false){
 if(!sample)return ()=>{};
 const finish=()=>sample.classList.add('sample-finished');
 const ended=(event:AnimationEvent)=>{if((event.target as HTMLElement).classList?.contains('sample-landed')){finish();sample.removeEventListener('animationend',ended);}};
 if(reduced)finish();else{sample.addEventListener('animationend',ended);sample.classList.add('sample-playing');}
 return ()=>sample.removeEventListener('animationend',ended);
}
