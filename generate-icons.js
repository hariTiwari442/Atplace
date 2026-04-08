// Run this once: node generate-icons.js
const fs = require('fs');
const path = require('path');

const svg192 = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192">
  <rect width="192" height="192" rx="38" fill="#002677"/>
  <text x="96" y="115" text-anchor="middle"
    font-family="Arial, sans-serif" font-weight="700" font-size="72">
    <tspan fill="#FFFFFF">&#923;t</tspan><tspan fill="#FF6900">.</tspan>
  </text>
</svg>`;

const svg512 = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="100" fill="#002677"/>
  <text x="256" y="305" text-anchor="middle"
    font-family="Arial, sans-serif" font-weight="700" font-size="192">
    <tspan fill="#FFFFFF">&#923;t</tspan><tspan fill="#FF6900">.</tspan>
  </text>
</svg>`;

const sharp = require('sharp');

async function generate() {
  await sharp(Buffer.from(svg192)).png().toFile(path.join(__dirname, 'public', 'logo192.png'));
  console.log('✅ logo192.png generated');

  await sharp(Buffer.from(svg512)).png().toFile(path.join(__dirname, 'public', 'logo512.png'));
  console.log('✅ logo512.png generated');

  console.log('Done! Deploy to Netlify now.');
}

generate().catch(console.error);
