const fs = require('fs');
const path = require('path');

const baseDir = '.';
const files = ['index.html', 'strategy.html'];

const linkReplacements = [
  {
    search: /<li>Local Government Act 1972\.<\/li>/g,
    replace: '<li><a href="https://www.legislation.gov.uk/ukpga/1972/70/contents" target="_blank">Local Government Act 1972</a>.</li>'
  },
  {
    search: /<li>Local Government and Public Involvement in Health Act 2007\.<\/li>/g,
    replace: '<li><a href="https://www.legislation.gov.uk/ukpga/2007/28/contents" target="_blank">Local Government and Public Involvement in Health Act 2007</a>.</li>'
  },
  {
    search: /<li>Data Protection Act 2018 and UK GDPR\.<\/li>/g,
    replace: '<li><a href="https://www.legislation.gov.uk/ukpga/2018/12/contents" target="_blank">Data Protection Act 2018</a> and <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank">UK GDPR</a>.</li>'
  },
  {
    search: /<li>Freedom of Information Act 2000\.<\/li>/g,
    replace: '<li><a href="https://www.legislation.gov.uk/ukpga/2000/36/contents" target="_blank">Freedom of Information Act 2000</a>.</li>'
  },
  {
    search: /<li>Equality Act 2010 and the Public Sector Equality Duty\.<\/li>/g,
    replace: '<li><a href="https://www.legislation.gov.uk/ukpga/2010/15/contents" target="_blank">Equality Act 2010</a> and the Public Sector Equality Duty.</li>'
  },
  {
    search: /<li>Public Sector Bodies \(Websites and Mobile Applications\) Accessibility Regulations 2018\.<\/li>/g,
    replace: '<li><a href="https://www.legislation.gov.uk/uksi/2018/952/contents" target="_blank">Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018</a>.</li>'
  },
  {
    search: /<li>Procurement Act 2023\.<\/li>/g,
    replace: '<li><a href="https://www.legislation.gov.uk/ukpga/2023/54/contents" target="_blank">Procurement Act 2023</a>.</li>'
  },
  {
    search: /<li>NCSC cyber security guidance\.<\/li>/g,
    replace: '<li><a href="https://www.ncsc.gov.uk/" target="_blank">NCSC cyber security guidance</a>.</li>'
  },
  {
    search: /<li>GDS Service Standard and Technology Code of Practice\.<\/li>/g,
    replace: '<li><a href="https://www.gov.uk/service-manual/service-standard" target="_blank">GDS Service Standard</a> and <a href="https://www.gov.uk/guidance/the-technology-code-of-practice" target="_blank">Technology Code of Practice</a>.</li>'
  },
  {
    search: /<li>MHCLG Local Government Reorganisation policy, programme and implementation guidance\.<\/li>/g,
    replace: '<li><a href="https://www.gov.uk/government/collections/local-government-reorganisation-policy-and-programme-updates" target="_blank">MHCLG Local Government Reorganisation policy, programme and implementation guidance</a>.</li>'
  }
];

for (const file of files) {
  const filePath = path.join(baseDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Update the Legal Background list with links
    for (const rule of linkReplacements) {
      content = content.replace(rule.search, rule.replace);
    }

    // 2. Update the global CSS for links (make them blue, normal weight, underlined)
    // The existing css is roughly: a{color:var(--green);text-decoration:none;font-weight:500}
    // and a:hover{text-decoration:underline}
    content = content.replace(/a\{color:var\(--green\);text-decoration:none;font-weight:500\}/g, 'a{color:#2563eb;text-decoration:underline;font-weight:400}');
    content = content.replace(/a:hover\{text-decoration:underline\}/g, 'a:hover{color:#1d4ed8;text-decoration:underline}');

    // Update the nav links so they remain green and bold, but we ensure they don't get the global underline
    // We don't necessarily need to change the nav CSS because it already has `text-decoration: none` and `color: var(--gray-dark)`.
    // Wait, the active nav link is color: var(--green). Let's make sure `.nav a` specifies text-decoration: none!
    // Original nav CSS: .nav a{display:block;padding:8px 12px;color:var(--gray-dark);text-decoration:none;border-radius:6px;margin-bottom:4px;font-weight:500}
    // So it does specify text-decoration: none. That is safe.

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated legal links and CSS in ${file}`);
  }
}
