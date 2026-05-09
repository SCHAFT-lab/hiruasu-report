import fs from 'fs';

const files = [
  { src: '/Users/shoheimuto/.gemini/antigravity/brain/5c6a7e37-6ac0-41a1-8394-7f974d1a9c98/.system_generated/click_feedback/click_feedback_1778331559903.png', dest: 'public/guides/notebooklm_steps_video.png' },
  { src: '/Users/shoheimuto/.gemini/antigravity/brain/5c6a7e37-6ac0-41a1-8394-7f974d1a9c98/.system_generated/click_feedback/click_feedback_1778331540771.png', dest: 'public/guides/history_card_video.png' }
];

files.forEach(file => {
  try {
    fs.copyFileSync(file.src, file.dest);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } catch (err) {
    console.error(`Failed to copy ${file.src}:`, err);
  }
});
