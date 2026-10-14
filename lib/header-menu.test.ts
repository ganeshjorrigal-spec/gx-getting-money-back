import {it,expect,vi} from 'vitest';
import {enhanceHeaderMenu} from './header-menu';
it('menu closes outside, on Escape with focus restored, and on navigation; listeners clean up',()=>{
 const listeners:Record<string,Function>={},menuListeners:Record<string,Function>={},focus=vi.fn();
 vi.stubGlobal('document',{addEventListener:(key:string,fn:Function)=>listeners[key]=fn,removeEventListener:(key:string)=>delete listeners[key]});
 const menu={open:true,querySelector:()=>({focus}),addEventListener:(key:string,fn:Function)=>menuListeners[key]=fn,removeEventListener:(key:string)=>delete menuListeners[key]};
 const root={querySelector:()=>menu,contains:(target:string)=>target==='inside'};
 const clean=enhanceHeaderMenu(root as any);listeners.click({target:'inside'});expect(menu.open).toBe(true);listeners.click({target:'outside'});expect(menu.open).toBe(false);
 menu.open=true;listeners.keydown({key:'Escape'});expect(menu.open).toBe(false);expect(focus).toHaveBeenCalledOnce();
 menu.open=true;menuListeners.click({target:{closest:()=>true}});expect(menu.open).toBe(false);clean();expect(listeners).toEqual({});expect(menuListeners).toEqual({});vi.unstubAllGlobals();
});
