import React from 'react';
import {createRoot} from 'react-dom/client';
import {ChaseAuthority} from '../../app/c/chase-authority';
const calling=new URLSearchParams(location.search).has('calling');
createRoot(document.getElementById('root')!).render(<main className="case-shell"><div className="case-wrap"><p>Local fixture. No network, mail or calls.</p><ChaseAuthority code="RG-QATEST" token="local-fixture" company="Demo Air" pnr="SAMPLE" demo={true} saved={{name:'Sample Passenger',contact:calling?'0000000000':'sample@example.invalid'}} chase={calling?{active:true,letterUrl:null}:null}/></div></main>);
