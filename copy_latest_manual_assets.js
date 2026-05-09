import fs from 'fs';

const files = [
  { src: '/Users/shoheimuto/.gemini/antigravity/brain/5c6a7e37-6ac0-41a1-8394-7f974d1a9c98/input_file_1.png', dest: 'public/guides/download_confirm.png' },
  { src: '/Users/shoheimuto/.gemini/antigravity/brain/5c6a7e37-6ac0-41a1-8394-7f974d1a9c98/input_file_2.png', dest: 'public/guides/notebooklm_new.png' },
  { src: '/Users/shoheimuto/.gemini/antigravity/brain/5c6a7e37-6ac0-41a1-8394-7f974d1a9c98/input_file_3.png', dest: 'public/guides/files_app.png' }
];

files.forEach(file => {
  try {
    fs.copyFileSync(file.src, file.dest);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } catch (err) {
    console.error(`Failed to copy ${file.src}:`, err);
  }
});
