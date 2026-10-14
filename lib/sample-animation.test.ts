import {it,expect,vi,afterEach} from 'vitest';
import {playSample} from './sample-animation';
afterEach(()=>{vi.useRealTimers();vi.unstubAllGlobals();});
function fixture(){
 vi.useFakeTimers();vi.stubGlobal('requestAnimationFrame',(fn:Function)=>setTimeout(fn,0));vi.stubGlobal('cancelAnimationFrame',(id:any)=>clearTimeout(id));let notify:(entries:any[])=>void=()=>{};const classes=new Set<string>(),listeners:Record<string,Function>={},disconnect=vi.fn();
 vi.stubGlobal('IntersectionObserver',class{constructor(fn:any){notify=fn;}observe(){}disconnect=disconnect;});
 const sample={classList:{add:(...values:string[])=>values.forEach(v=>classes.add(v)),remove:(...values:string[])=>values.forEach(v=>classes.delete(v)),contains:(v:string)=>classes.has(v),toggle:(v:string,on:boolean)=>on?classes.add(v):classes.delete(v)},addEventListener:(key:string,fn:Function)=>listeners[key]=fn,removeEventListener:(key:string)=>delete listeners[key],closest:()=>null,getAnimations:()=>[]};
 const end=()=>listeners.animationend({target:{classList:{contains:(v:string)=>v==='sample-landed'}}});
 return {sample:sample as any,classes,listeners,end,visible:(value:boolean)=>notify([{isIntersecting:value}]),disconnect};
}
it('rests on the finished frame exactly three seconds then replays, and cleans up',()=>{
 const f=fixture(),stop=playSample(f.sample);f.end();expect(f.classes.has('sample-finished')).toBe(true);vi.advanceTimersByTime(2999);expect(f.classes.has('sample-finished')).toBe(true);vi.advanceTimersByTime(1);expect(f.classes.has('sample-finished')).toBe(false);vi.advanceTimersByTime(2);expect(f.classes.has('sample-playing')).toBe(true);f.end();stop();vi.advanceTimersByTime(4000);expect(f.classes.has('sample-finished')).toBe(true);expect(f.disconnect).toHaveBeenCalledOnce();expect(f.listeners).toEqual({});
});
it('offscreen pauses animation and preserves remaining final-frame rest',()=>{
 const f=fixture();playSample(f.sample);f.end();vi.advanceTimersByTime(1000);f.visible(false);expect(f.classes.has('sample-paused')).toBe(true);vi.advanceTimersByTime(10000);expect(f.classes.has('sample-finished')).toBe(true);f.visible(true);expect(f.classes.has('sample-paused')).toBe(false);vi.advanceTimersByTime(1999);expect(f.classes.has('sample-finished')).toBe(true);vi.advanceTimersByTime(1);expect(f.classes.has('sample-finished')).toBe(false);
});
it('reduced motion is the final still, with no animation, observer or timer',()=>{
 const f=fixture();playSample(f.sample,true);expect(f.classes).toEqual(new Set(['sample-finished']));expect(f.listeners).toEqual({});expect(vi.getTimerCount()).toBe(0);
});

it('the known eight-second story reaches its final frame even if a browser delays animationend',()=>{const f=fixture();playSample(f.sample);vi.advanceTimersByTime(8000);expect(f.classes.has('sample-finished')).toBe(true);vi.advanceTimersByTime(2999);expect(f.classes.has('sample-finished')).toBe(true);vi.advanceTimersByTime(3);expect(f.classes.has('sample-finished')).toBe(false);expect(f.classes.has('sample-playing')).toBe(true);});
