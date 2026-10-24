import {renderToStaticMarkup} from 'react-dom/server';
import {ChaseAuthority} from '../../app/c/chase-authority';
export function renderCall(demo=false,airline='IndiGo'){return renderToStaticMarkup(<ChaseAuthority emailConfirmed={true} code="RG-COPY" token="synthetic" company="IndiGo and DemoTrips" callCompany={airline} pnr="SAMPLE" demo={demo} chase={{active:true,letterUrl:null,callsAuthorisedAt:1,mobile:'0000000000'}}/>);}
