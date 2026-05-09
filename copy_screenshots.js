import fs from 'fs';
import path from 'path';

const files = [
  { src: '/Users/shoheimuto/.gemini/antigravity/brain/5c6a7e37-6ac0-41a1-8394-7f974d1a9c98/home_page_1778314140402.png', dest: 'public/guides/home_mobile.png' },
  { src: '/Users/shoheimuto/.gemini/antigravity/brain/5c6a7e37-6ac0-41a1-8394-7f974d1a9c98/morning_form_1778314483618.png', dest: 'public/guides/morning_mobile.png' },
  { src: '/Users/shoheimuto/.gemini/antigravity/brain/5c6a7e37-6ac0-41a1-8394-7f974d1a9c98/night_form_1778314504441.png', dest: 'public/guides/night_mobile.png' },
  { src: '/Users/shoheimuto/.gemini/antigravity/brain/5c6a7e37-6ac0-41a1-8394-7f974d1a9c98/history_page_1778314516153.png', dest: 'public/guides/history_mobile.png' }
];

files.forEach(file => {
  try {
    fs.copyFileSync(file.src, file.dest);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } catch (err) {
    console.error(`Failed to copy ${file.src}:`, err);
  }
});
