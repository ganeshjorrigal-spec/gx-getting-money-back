// Run through the approved browser tool, after building demo-flow-proof.mts.
// Accepts a CUA tab and the JSON steps. No browser install or external service.
export async function canFinishPublicDemo(tab,steps){
 const results=[];
 for(const [index,step] of steps.entries()){
  const control=tab.playwright.getByRole(step.role,step.name?{name:step.name,exact:true}:{});
  if(step.action==='click')await control.click();else if(step.action==='check')await control.check();else await control.waitFor({state:'visible',timeoutMs:8000});
  await tab.playwright.domSnapshot();
  results.push({step:index+1,...step,passed:true});
 }
 return results;
}
