import {it,expect} from 'vitest';
import {chaseHistoryRows} from './chase-history';
it('shows newest only by received order without mutating saved history',()=>{const rows=[{createdAt:1,id:'old'},{createdAt:3,id:'new'},{createdAt:2,id:'middle'}];expect(chaseHistoryRows(rows).map(r=>r.id)).toEqual(['new']);expect(rows.map(r=>r.id)).toEqual(['old','new','middle']);expect(chaseHistoryRows(rows,true).map(r=>r.id)).toEqual(['new','middle','old']);});
it('a newly received event replaces the collapsed entry, including from an empty history',()=>{expect(chaseHistoryRows([])).toEqual([]);expect(chaseHistoryRows([{createdAt:1,id:'old'},{createdAt:5,id:'just received'}])).toEqual([{createdAt:5,id:'just received'}]);});
