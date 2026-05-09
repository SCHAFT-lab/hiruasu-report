import fs from 'fs';

const files = [
  { src: '/Users/shoheimuto/.gemini/antigravity/brain/5c6a7e37-6ac0-41a1-8394-7f974d1a9c98/history_page_with_audio_1778315701483.png', dest: 'public/guides/history_mobile.png' },
  { src: '/Users/shoheimuto/.gemini/antigravity/brain/5c6a7e37-6ac0-41a1-8394-7f974d1a9c98/notebooklm_button_area_1778315702531.png', dest: 'public/guides/notebooklm_guide.png' }
];

files.forEach(file => {
  try {
    fs.copyFileSync(file.src, file.dest);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } catch (err) {
    console.error(`Failed to copy ${file.src}:`, err);
  }
});
