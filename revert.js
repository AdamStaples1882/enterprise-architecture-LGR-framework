const fs = require('fs');
const path = require('path');

const baseDir = '.';
const files = ['index.html', 'strategy.html'];

for (const file of files) {
  const filePath = path.join(baseDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove hypothesis exact string
    const hyp = `<!-- Hypothesis Annotation Tool -->
<script type="application/json" class="js-hypothesis-config">
  {"showHighlights": true, "openSidebar": false}
</script>
<script async src="https://hypothes.is/embed.js"></script>`;
    content = content.replace(hyp, '');

    // Remove banner CSS
    const cssStart = '<style>\n.draft-banner {';
    const bannerStart = '<div class="draft-banner">';
    const bannerEnd = '</div>\n</div>\n';
    
    if (content.includes(cssStart) && content.includes(bannerStart)) {
      const idx1 = content.indexOf(cssStart);
      const idx2 = content.indexOf(bannerEnd, content.indexOf(bannerStart));
      if (idx1 !== -1 && idx2 !== -1) {
        content = content.substring(0, idx1) + content.substring(idx2 + bannerEnd.length);
      }
    }

    // Rename
    content = content.replace(/>Draft Strategy</g, '>Overall Strategy<');
    content = content.replace(/>Draft Operating Model Strategy</g, '>Operating Model Strategy<');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Reverted in ${file}`);
  }
}
