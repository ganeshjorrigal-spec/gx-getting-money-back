import type {ReactNode} from 'react';
export function Icon({kind='mail'}:{kind?:'mail'|'rule'|'follow'|'warning'|'check'}){
 const paths={mail:'M3 5h18v14H3z M3 5l9 7 9-7',rule:'M5 3h14v18H5z M8 8h8 M8 12h8 M8 16h5',follow:'M20 8a8 8 0 1 0 0 8 M20 3v5h-5',warning:'M12 3L2 21h20L12 3z M12 9v5 M12 17v1',check:'M5 12l4 4L19 6'};
 return <svg className='ui-icon' width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><path d={paths[kind]}/></svg>;
}
export function SourceLine({children,href}:{children:ReactNode;href?:string|null}){return <p className='source-line' data-source-line>{href?<a href={href} target='_blank' rel='noreferrer'>{children}</a>:children}</p>;}
export function StatusBadge({kind,label}:{kind:'overdue'|'waiting'|'landed'|'ready';label:string}){return <span className={`status-badge status-${kind}`}>{kind==='overdue'?<Icon kind='warning'/>:kind==='landed'?<Icon kind='check'/>:null}{label}</span>;}
export type ReceiptRow={label:string;value:ReactNode;source?:ReactNode};
export function ReceiptSlip({rows,status,stamp,children,label='Who owes you'}:{rows:ReceiptRow[];status?:ReactNode;stamp?:string;children?:ReactNode;label?:string}){return <section className='receipt-slip' aria-label={label}><div className='receipt-head'><h2>{label}</h2>{status}</div>{stamp&&<p className='overdue-stamp'><Icon kind='warning'/>{stamp}</p>}<dl className='receipt-rows'>{rows.map(row=><div className='receipt-row' key={row.label}><dt>{row.label}</dt><dd>{row.value}{row.source&&<SourceLine>{row.source}</SourceLine>}</dd></div>)}</dl>{children}</section>;}
export function NextMoveCard({title,children}:{title:string;children:ReactNode}){return <section className='case-card next-move-card' aria-label='Your next move' id='next-move'><div className='next-move-heading'><Icon/><h2>{title}</h2></div>{children}</section>;}
