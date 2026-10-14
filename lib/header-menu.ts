export function enhanceHeaderMenu(root:HTMLElement|null){
 const menu=root?.querySelector<HTMLDetailsElement>('.header-menu');if(!menu)return ()=>{};
 const close=(event:Event)=>{if(!root!.contains(event.target as Node))menu.open=false;};
 const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'&&menu.open){menu.open=false;menu.querySelector<HTMLElement>('summary')?.focus();}};
 const follow=(event:Event)=>{if((event.target as Element).closest('a'))menu.open=false;};
 document.addEventListener('click',close);document.addEventListener('keydown',escape);menu.addEventListener('click',follow);
 return ()=>{document.removeEventListener('click',close);document.removeEventListener('keydown',escape);menu.removeEventListener('click',follow);};
}
