"use client";
import {useAction} from 'convex/react';
import {useEffect,useRef,useState} from 'react';
import {api} from '../../convex/_generated/api';
import {userError} from '../../lib/user-error';
export default function DemoConfirmation(){const confirm=useAction(api.demoEmailActions.confirm),started=useRef(false),[error,setError]=useState('');useEffect(()=>{if(started.current)return;started.current=true;const confirmation=new URLSearchParams(location.search).get('confirmation')??'';void confirm({confirmation}).then(({url})=>location.replace(url)).catch(e=>setError(userError(e)));},[confirm]);return <main className="case-shell"><h1>Confirming your demo email</h1>{error?<><p role="alert">{error}</p><a href="/start/?demo=flight">Return to the demo</a></>:<p role="status"><span className="spinner"/> Opening your demo…</p>}</main>;}
