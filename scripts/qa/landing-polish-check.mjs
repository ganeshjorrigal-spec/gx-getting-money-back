// Run through the approved browser tool against the local static export.
export async function checkLanding(tab,{width,saved,finished=false}){
 const result=await tab.playwright.evaluate(()=>{
  const section=document.querySelector('.saved-cases'),hero=document.querySelector('#hero'),sample=document.querySelector('.animated-sample');
  const mascot=document.querySelector('.hero-mascot'),receipt=sample.querySelector('.receipt-slip');
  return {width:innerWidth,sections:document.querySelectorAll('.saved-cases').length,savedVisible:!!section&&!section.hidden,links:section?.querySelectorAll('a').length??0,
   belowHero:!section||section.hidden||section.getBoundingClientRect().top>=hero.getBoundingClientRect().bottom-1,
   overflow:document.documentElement.scrollWidth>innerWidth,mascotWidth:mascot.getBoundingClientRect().width,
   finished:sample.classList.contains('sample-finished'),mailDisplay:getComputedStyle(sample.querySelector('.sample-mail')).display,
   replyVisibility:getComputedStyle(sample.querySelector('.sample-reply')).visibility,landedOpacity:getComputedStyle(sample.querySelector('.sample-landed')).opacity,
   messageInside:!!sample.querySelector('.receipt-slip .sample-message'),receiptPresent:!!receipt};
 });
 if(result.width!==width||result.sections!==0||result.savedVisible||!result.belowHero||result.overflow||result.mascotWidth!==(width<=760?64:120)||!result.messageInside)throw new Error('Landing layout failed: '+JSON.stringify(result));
 if(finished&&(!result.finished||result.mailDisplay!=='none'||result.replyVisibility!=='visible'||result.landedOpacity!=='1'))throw new Error('Landing ending failed: '+JSON.stringify(result));
 return result;
}
