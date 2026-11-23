import test from 'node:test';
import assert from 'node:assert/strict';
import { createSeed, donorTotal, entityName, potentialDuplicates, totals } from '../src/domain.js';

test('seed is reproducible in size and uses distinct individual and organisation records',()=>{
  const a=createSeed(),b=createSeed();
  assert.equal(a.donors.length,60);assert.equal(a.organisations.length,15);
  assert.equal(a.contributions.length,108);assert.equal(a.interactions.length,156);
  assert.equal(a.campaigns.length,12);assert.equal(a.events.length,8);assert.equal(a.grants.length,10);
  assert.deepEqual(a.donors,b.donors);assert.ok(a.contributions.every(c=>Boolean(c.donorId)!==Boolean(c.organisationId)));
});
test('contribution totals count completed gifts and remain associated with their entity',()=>{
  const s=createSeed(),d=s.donors[0],g=s.contributions.find(c=>c.donorId===d.id);
  assert.ok(g);assert.equal(entityName(s,g),`${d.firstName} ${d.lastName}`);
  assert.equal(donorTotal(s,d.id),s.contributions.filter(c=>c.donorId===d.id&&c.paymentStatus==='Completed').reduce((n,c)=>n+c.amount,0));
  assert.equal(totals(s).lifetime,s.contributions.filter(c=>c.paymentStatus==='Completed').reduce((n,c)=>n+c.amount,0));
});
test('follow-up status and overdue metrics reflect shared task records',()=>{
  const s=createSeed(),t=s.tasks.find(x=>x.dueDate<'2026-11-23'&&x.status!=='Completed');
  assert.ok(t);const before=totals(s).overdue;t.status='Completed';assert.equal(t.status,'Completed');assert.equal(totals(s).overdue,before-1);
});
test('duplicate matcher flags exact email or phone and leaves uncertain records unresolved',()=>{
  const s=createSeed(),d=s.donors[0];
  const matches=potentialDuplicates([{email:d.email},{phone:d.phone},{email:'other@example.org'}],s.donors);
  assert.equal(matches.length,2);assert.equal(matches[0].match.id,d.id);assert.equal(matches[1].match.id,d.id);
});
