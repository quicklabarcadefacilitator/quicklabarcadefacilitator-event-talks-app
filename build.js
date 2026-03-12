const fs = require('fs');
const path = require('path');

const srcDir = 'src';
const distDir = 'dist';
const htmlFile = 'index.html';
const cssFile = 'style.css';
const jsFile = 'script.js';

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Read the source files
const htmlContent = fs.readFileSync(path.join(srcDir, htmlFile), 'utf-8');
const cssContent = fs.readFileSync(path.join(srcDir, cssFile), 'utf-8');
const jsContent = fs.readFileSync(path.join(srcDir, jsFile), 'utf-8');

// Inject CSS and JS into the HTML
let finalHtml = htmlContent.replace(
    '<link rel="stylesheet" href="style.css">',
    `<style>${cssContent}</style>`
);
finalHtml = finalHtml.replace(
    '<script src="script.js"></script>',
    `<script>${jsContent}</script>`
);

// Write the final bundled HTML file
fs.writeFileSync(path.join(distDir, htmlFile), finalHtml, 'utf-8');

console.log('Website has been successfully bundled into dist/index.html');
