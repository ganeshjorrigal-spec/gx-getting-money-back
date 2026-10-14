import {enhanceHeaderMenu} from '../lib/header-menu';
// Only the static landing uses this small browser entry. Intake and cases keep Next/React.
import {CASE_STORAGE_KEY} from '../lib/case-link';
import {savedCasesNotice} from '../lib/app-url';
import {readDomainMove} from '../lib/domain-notice';
import {landingCases} from '../lib/landing-cases';
import {playSample} from '../lib/sample-animation';

enhanceHeaderMenu(document.querySelector('.site-header'));
const savedList=document.querySelector('.saved-cases>div');
try {
 const saved=landingCases(localStorage.getItem(CASE_STORAGE_KEY));
 for(const item of saved) {
  const link=document.createElement('a');link.className='saved-case';
  link.href=`/c/index.html?code=${encodeURIComponent(item.code)}#k=${encodeURIComponent(item.token)}`;
  const title=document.createElement('span');title.textContent=typeof item.title==='string'&&item.title?item.title:item.code;
  const open=document.createElement('span');open.textContent='Open →';link.append(title,open);savedList?.append(link);
 }
 const section=document.querySelector<HTMLElement>('.saved-cases');if(section)section.hidden=!savedList?.childElementCount;
}catch{/* Storage can be blocked or malformed. Existing private links still work. */}
const hero=document.getElementById('hero'),sticky=document.querySelector('.sticky-cta');
const observer=new IntersectionObserver(entries=>{for(const entry of entries){
 if(entry.target===hero){const visible=!entry.isIntersecting;sticky?.classList.toggle('is-visible',visible);sticky?.setAttribute('aria-hidden',String(!visible));sticky?.querySelector('a')?.setAttribute('tabindex',visible?'0':'-1');}
 else if(entry.isIntersecting){if(entry.target instanceof HTMLImageElement&&entry.target.dataset.lazySrc)entry.target.src=entry.target.dataset.lazySrc;else if(entry.target instanceof HTMLElement&&entry.target.dataset.lazyBackground)entry.target.style.backgroundImage=`url(${entry.target.dataset.lazyBackground})`;else entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}
}},{threshold:0});
document.querySelectorAll('[data-reveal]').forEach(node=>{node.classList.add('reveal-ready');observer.observe(node);});
document.querySelectorAll('img[data-lazy-src],[data-lazy-background]').forEach(node=>observer.observe(node));
if(hero)observer.observe(hero);
const animate=()=>playSample(document.querySelector('.animated-sample'),matchMedia('(prefers-reduced-motion: reduce)').matches);
const start=()=>{'requestIdleCallback' in window?window.requestIdleCallback(animate,{timeout:1500}):setTimeout(animate,0);};
document.readyState==='complete'?start():window.addEventListener('load',start,{once:true});
// Import only on the old address. No client/provider, query or case-page code on the new domain.
void readDomainMove(location.origin,process.env.NEXT_PUBLIC_CONVEX_URL,async()=>{
 const [{ConvexHttpClient},{api}]=await Promise.all([import('convex/browser'),import('../convex/_generated/api')]);
 const client=new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);return ()=>client.query(api.site.urls,{});
}).then(moved=>{if(!moved)return;const notice=document.createElement('aside');notice.className='section-wrap';notice.setAttribute('aria-label','New address');const p=document.createElement('p'),link=document.createElement('a');link.href='https://refundgenie.app';link.textContent='refundgenie.app';p.append("We've moved to ",link,'.');const saved=document.createElement('p');saved.textContent=savedCasesNotice;notice.append(p,saved);document.body.prepend(notice);});
