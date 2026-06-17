const fs = require('fs');
const path = require('path');

const baseDir = '.';
const files = ['index.html', 'strategy.html'];

for (const file of files) {
  const filePath = path.join(baseDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Find and replace the owner
    content = content.replace(
      /<tr><td><strong>Owner<\/strong><\/td><td>Head of Enterprise Architecture<\/td><\/tr>/g,
      '<tr><td><strong>Owner</strong></td><td>Stephen Munyard, Head of Enterprise Architecture</td></tr>'
    );

    // Find and replace the author
    content = content.replace(
      /<tr><td><strong>Author<\/strong><\/td><td>Adam Staples, Head of Enterprise Architecture<\/td><\/tr>/g,
      '<tr><td><strong>Author</strong></td><td>Adam Staples, Enterprise Architect</td></tr>'
    );

    // Also replace the title at the top of the file if it exists, but the title doesn't have the names.
    // Let's also do a general replace for "Adam Staples, Head of Enterprise Architecture" just in case it's elsewhere
    content = content.replace(/Adam Staples, Head of Enterprise Architecture/g, 'Adam Staples, Enterprise Architect');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated names in ${file}`);
  }
}
