import React from 'react';import {navigate} from './demo-flow-store';
export default function Link({href,children,prefetch,...props}:any){return <a href={href} {...props} onClick={e=>{if(String(href).startsWith('/')){e.preventDefault();navigate(href);}}}>{children}</a>;}
