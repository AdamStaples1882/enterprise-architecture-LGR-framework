const fs = require('fs');
const path = require('path');

const baseDir = '.';
const files = ['index.html', 'strategy.html'];

const bannerHtml = `
<div class="panel" style="background-color: var(--gold); color: #000; border-left-color: #b45309; margin-bottom: 24px;">
  <h3 style="margin-top:0; color:#000;">⚠️ DRAFT STATUS / UNDER REVIEW</h3>
  <p style="margin-bottom:0;">This Operating Model Strategy is currently in draft format. You can leave comments, highlight text, and propose changes by using the <strong>sidebar on the right edge of the screen</strong> to annotate any part of this document.</p>
</div>
`;

const hypothesisScript = `
<!-- Hypothesis Annotation Tool -->
<script type="application/json" class="js-hypothesis-config">
  {"showHighlights": true, "openSidebar": false}
</script>
<script async src="https://hypothes.is/embed.js"></script>
</head>
`;

for (const file of files) {
  const filePath = path.join(baseDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Rename "Overall Strategy" to "Draft Strategy"
    content = content.replace(/>Overall Strategy</g, '>Draft Strategy<');
    content = content.replace(/>Operating Model Strategy</g, '>Draft Operating Model Strategy<');

    // 2. Add Hypothesis script before </head>
    if (!content.includes('hypothes.is')) {
      content = content.replace('</head>', hypothesisScript);
    }

    // 3. Inject the warning banner at the top of the main content
    // Find the first <section class="section"> and prepend the banner to it
    if (!content.includes('DRAFT STATUS')) {
      content = content.replace('<section class="section">', `${bannerHtml}\n<section class="section">`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
