import React,{useSyncExternalStore} from 'react';import {createRoot} from 'react-dom/client';
import Home from '../../app/page';import Start from '../../app/start/page';import FlightCase from '../../app/c/flight-case-view';
import {subscribe,snapshot,route,escalationFixture} from './demo-flow-store';
function App(){useSyncExternalStore(subscribe,snapshot,snapshot);return <><p>LOCAL TEST · transport replaced; no mail or call</p>{route==='landing'?<Home/>:route==='start'?<Start/>:<FlightCase code='RG-QATEST' token='synthetic'/>}<button onClick={escalationFixture}>Test officer edge</button></>;}
createRoot(document.getElementById('root')!).render(<App/>);
