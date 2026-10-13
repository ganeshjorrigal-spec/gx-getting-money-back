import {it,expect} from 'vitest';
import {intakeIdentity} from './intake-identity';
it('reuses saved name and email for permission rather than asking for them again',()=>{expect(intakeIdentity({name:'Sample Passenger',contact:'sample@example.invalid'})).toEqual({name:'Sample Passenger',email:'sample@example.invalid',mobile:''});});
it('keeps a held phone and previous permission identity',()=>{expect(intakeIdentity({name:'Sample',contact:'+910000000000'}).mobile).toBe('+910000000000');expect(intakeIdentity({name:'Sample',chase:{name:'Confirmed Passenger',email:'demo@example.invalid',mobile:'+910000000000'}})).toEqual({name:'Confirmed Passenger',email:'demo@example.invalid',mobile:'+910000000000'});});
