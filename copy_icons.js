import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFile = path.join(__dirname, 'public', 'mighty-icon.png');

const targets = [
  'pwa-192x192.png',
  'pwa-512x512.png',
  'apple-touch-icon.png',
  'favicon.png'
];

try {
  targets.forEach(target => {
    fs.copyFileSync(sourceFile, path.join(__dirname, 'public', target));
    console.log(`Copied to ${target}`);
  });
  console.log('All files copied successfully.');
} catch (error) {
  console.error('Error copying files:', error);
}
