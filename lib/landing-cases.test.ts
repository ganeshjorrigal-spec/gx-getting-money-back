import {it,expect} from 'vitest';import {landingCases} from './landing-cases';
it('empty or broken storage does not display a Your cases section',()=>{for(const value of [null,'[]','not json','{}','[null,{"code":"bad","token":"test"}]'])expect(landingCases(value)).toEqual([]);});
it('keeps valid legacy and new case links, limits the display to three, and ignores unusable links',()=>{const old={code:'TB-ABC123',token:'synthetic-old'},fresh={code:'RG-ABC123',token:'synthetic-new'};expect(landingCases(JSON.stringify([{code:'RG-INVALID',token:''},old,fresh,fresh,fresh]))).toEqual([old,fresh,fresh]);});

it('cases page reads up to twenty valid saved links without changing the landing default',()=>{const rows=Array.from({length:22},(_,i)=>({code:'RG-'+String(i).padStart(6,'0'),token:'synthetic',updatedAt:1}));expect(landingCases(JSON.stringify(rows),20)).toHaveLength(20);expect(landingCases(JSON.stringify(rows))).toHaveLength(3);});
