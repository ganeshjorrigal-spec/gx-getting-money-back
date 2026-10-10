import {randomBytes,createHash} from 'node:crypto';
import {writeFileSync} from 'node:fs';
// CLI access is required for internal seeding; keep all private values in ignored files.
const fixtures=[];
for(const [label,landed,refundType] of [['zero',0,'flight'],['three',3,'flight'],['event',3,'event']]) {
 const token=randomBytes(32).toString('base64url'),deviceId=randomBytes(32).toString('base64url'),code='TB-'+randomBytes(3).toString('hex').toUpperCase();
 fixtures.push({label,landed,refundType,token,deviceId,code,tokenHash:createHash('sha256').update(token).digest('hex')});
}
writeFileSync('.env.trial-proof.json',JSON.stringify(fixtures));
console.log('Private synthetic fixture inputs saved to ignored file.');
