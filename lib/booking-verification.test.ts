import {it,expect} from 'vitest';
import {sampleFlight} from './flight-sample';
import {groundFlightRead} from './flight-ground';
import {missingVerification,bookingCallFacts,verificationReady} from './booking-verification';
it('screenshot booking values are retained and never asked again; extraction cannot grant consent',()=>{
 const extracted={...sampleFlight(),bookingMobile:'+910000000000',bookingEmail:'fixture@example.invalid',shareBookingContact:true};
 const read=groundFlightRead(extracted,'',null,true);
 expect(read.routeFrom).toBe('Delhi');expect(read.nameOnTicket).toBe('Fixture Passenger');expect(missingVerification(read)).toEqual([]);expect(read.shareBookingContact).toBe(false);
 expect(bookingCallFacts(read)).not.toHaveProperty('bookingEmail');expect(bookingCallFacts(read)).not.toHaveProperty('bookingMobile');
});
it('missing required and optional booking values ask; reviewed optional blanks do not block',()=>{
 const read={...sampleFlight(),routeFrom:null,routeTo:null,nameOnTicket:null,bookingContactReviewed:false};
 expect(missingVerification(read)).toEqual(['routeFrom','routeTo','nameOnTicket','bookingMobile','bookingEmail']);expect(verificationReady(read)).toBe(false);
 expect(verificationReady(sampleFlight())).toBe(true);
});
it('only saved consent allows booking contact into call facts and survives rereading',()=>{
 const prior={...sampleFlight(),bookingMobile:'+910000000000',bookingEmail:'fixture@example.invalid',shareBookingContact:true};
 const read=groundFlightRead({...sampleFlight(),routeFrom:null,nameOnTicket:null},'',prior);
 expect(read.routeFrom).toBe('Delhi');expect(bookingCallFacts(read)).toMatchObject({bookingEmail:prior.bookingEmail,bookingMobile:prior.bookingMobile});
});

import {convexTest} from 'convex-test';
import {api} from '../convex/_generated/api';
import schema from '../convex/schema';
import {hashToken} from '../convex/lib/access';
it('booking fields and explicit consent save separately from notification email',async()=>{
 const t=convexTest(schema,import.meta.glob('../convex/**/*.ts')),token='x'.repeat(43),code='RG-BOOKQA';
 const id=await t.run(async ctx=>ctx.db.insert('cases',{code,tokenHash:await hashToken(token),stage:'READY',refundType:'flight',facts:{...sampleFlight(),bookingContactReviewed:false},email:'user@example.invalid',createdAt:1,updatedAt:1,ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none'}));
 await t.mutation(api.flights.verification,{code,token,field:'bookingEmail',value:'booking@example.invalid'});
 await t.mutation(api.flights.verification,{code,token,field:'bookingContactReviewed',consent:false});
 let item=await t.run(ctx=>ctx.db.get(id));expect(item?.email).toBe('user@example.invalid');expect(bookingCallFacts(item!.facts)).not.toHaveProperty('bookingEmail');
 await t.mutation(api.flights.verification,{code,token,field:'bookingContactReviewed',consent:true});
 item=await t.run(ctx=>ctx.db.get(id));expect(bookingCallFacts(item!.facts).bookingEmail).toBe('booking@example.invalid');
});

it('review edit saves ticket facts and validates sharing and booking contact',async()=>{
 const t=convexTest(schema,import.meta.glob('../convex/**/*.ts')),token='x'.repeat(43),code='RG-EDITQA';
 const id=await t.run(async ctx=>ctx.db.insert('cases',{code,tokenHash:await hashToken(token),stage:'READY',route:'OVERDUE',refundType:'flight',facts:sampleFlight(),email:'user@example.invalid',factsConfirmedAt:1,createdAt:1,updatedAt:1,ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none'}));
 for(const [field,value] of [['routeFrom','Pune'],['routeTo','Delhi'],['nameOnTicket','Demo Passenger'],['bookingEmail','booking@example.invalid'],['shareBookingContact','Yes']] as const)await t.mutation(api.flights.editFact,{code,token,field,value});
 const item=await t.run(ctx=>ctx.db.get(id));expect(item!.facts).toMatchObject({routeFrom:'Pune',routeTo:'Delhi',nameOnTicket:'Demo Passenger',bookingEmail:'booking@example.invalid',shareBookingContact:true});expect(item!.email).toBe('user@example.invalid');
 await expect(t.mutation(api.flights.editFact,{code,token,field:'bookingEmail',value:'not-email'})).rejects.toThrow(/booking email/);
});
