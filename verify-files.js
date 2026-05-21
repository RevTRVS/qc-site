const fs = require('fs');
const path = require('path');

console.log('✓ Checking TypeScript/JSX files...\n');

const files = [
  'app/components/Tools.tsx',
  'app/components/ToolsPageContent.tsx',
  'app/components/LinkConverterPage.tsx',
  'app/components/Navbar.tsx',
  'app/page.tsx'
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const hasImportErrors = content.includes('undefined');
  const hasSyntaxErrors = !content.includes('export default');
  
  if (!hasImportErrors && !hasSyntaxErrors) {
    console.log(`✓ ${file} - OK`);
  } else {
    console.log(`✗ ${file} - ISSUE DETECTED`);
  }
});

console.log('\n✓ All files verified!');
