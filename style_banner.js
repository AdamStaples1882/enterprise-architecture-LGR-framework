const fs = require('fs');
const path = require('path');

const baseDir = '.';
const files = ['index.html', 'strategy.html'];

const professionalBannerCSS = `
<style>
.draft-banner {
  display: flex;
  gap: 16px;
  background: linear-gradient(to right, #fffbeb, #fef3c7);
  border: 1px solid #fcd34d;
  border-left: 4px solid #f59e0b;
  border-radius: 8px;
  padding: 20px 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}
.draft-banner .draft-icon {
  flex-shrink: 0;
  color: #d97706;
  margin-top: 2px;
}
.draft-banner .draft-content h3 {
  margin: 0 0 8px 0;
  color: #92400e;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.draft-banner .draft-content p {
  margin: 0 0 12px 0;
  color: #b45309;
  font-size: 0.95rem;
  line-height: 1.5;
}
.draft-banner .draft-content p:last-child {
  margin-bottom: 0;
}
.draft-instruction {
  display: inline-flex;
  align-items: center;
  background-color: #fefce8;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #fde047;
  color: #854d0e;
  font-size: 0.9rem;
}
.draft-instruction strong {
  color: #713f12;
  margin-right: 6px;
}
</style>
`;

const professionalBannerHtml = `
${professionalBannerCSS}
<div class="draft-banner">
  <div class="draft-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
  </div>
  <div class="draft-content">
    <h3>Draft Strategy for Review</h3>
    <p>This Operating Model Strategy is currently in draft format. We invite constructive feedback and annotations from all stakeholders to shape the final version.</p>
    <div class="draft-instruction">
      <strong>How to comment:</strong> Select any specific text, sentence, or paragraph on this page. A pop-up will appear allowing you to attach an exact note or comment directly to that highlighted text.
    </div>
  </div>
</div>
`;

// Crude banner from before
const crudeBannerRegex = /<div class="panel" style="background-color: var\(--gold\); color: #000; border-left-color: #b45309; margin-bottom: 24px;">[\s\S]*?<\/div>/g;

for (const file of files) {
  const filePath = path.join(baseDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the crude banner with the professional banner
    content = content.replace(crudeBannerRegex, professionalBannerHtml);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated banner in ${file}`);
  }
}
