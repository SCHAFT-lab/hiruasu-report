#!/bin/bash
sips -z 192 192 public/mighty-icon.png --out public/pwa-192x192.png
sips -z 512 512 public/mighty-icon.png --out public/pwa-512x512.png
sips -z 180 180 public/mighty-icon.png --out public/apple-touch-icon.png
sips -z 64 64 public/mighty-icon.png --out public/favicon.png
