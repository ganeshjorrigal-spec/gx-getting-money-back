import React from 'react';
export default function Link({children,href,prefetch,...props}:any){return <a href={href} {...props}>{children}</a>;}
