from pathlib import Path
import json, re

text = Path('docs/research/playbooks/flights.md').read_text(encoding='utf-8')
rules = []
for line in text.splitlines():
    if re.match(r'\| F\d\d \|', line):
        cells = [s.strip() for s in line.strip('|').split('|')]
        rules.append(dict(zip(['id','scenario','sentence','deadline','quote','source','readAt','label'], cells)))
contacts = []
for line in text.split('## C. Contacts table')[1].split('## D.')[0].splitlines():
    if line.startswith('| ') and not line.startswith('| company'):
        cells = [s.strip() for s in line.strip('|').split('|')]
        if len(cells) == 6:
            company, role, value, page, readAt, label = cells
            email = re.search(r'[\w.+-]+@[\w.-]+\.[A-Za-z]+', value)
            contacts.append(dict(company=company, role=role, value=value, email=email.group(0).lower() if email else None, url='https://'+page if page != 'n/a' else None, readAt='2026-10-09', label=label))
assert len(rules) == 23
source = '''// Imported from the HQ-verified playbook. Rule ids remain internal; UI shows source sentences.
export type FlightContact = {company:string; role:string; value:string; email:string|null; url:string|null; readAt:string; label:string};
export const flightRules = ''' + json.dumps(rules, ensure_ascii=False, indent=2) + ''' as const;
export const flightContacts: FlightContact[] = ''' + json.dumps(contacts, ensure_ascii=False, indent=2) + ''';
export const refundRuleUrl = "https://www.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView&attachId=cuYJ%2FdQQ6Gx93z%2Fwchd5xw%3D%3D";
export function flightContact(company:string, role:string):FlightContact|null {
  return flightContacts.find(c => c.company.toLowerCase() === company.toLowerCase() && c.role === role && c.email && c.label.startsWith("VERIFIED")) ?? null;
}
export function flightRule(id:string) { return flightRules.find(r => r.id === id)!; }
'''
Path('lib/flight-kb.ts').write_text(source, encoding='utf-8')
