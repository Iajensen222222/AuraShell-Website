// Generates public/og-image.png — the 1280×640 social-share preview image.
//
// Run with: npm run gen:og
//
// The image is composed as a single SVG (gradient background + diamond mark +
// wordmark + tagline + subtitle) and rasterized to PNG by `sharp`. Re-run any
// time the brand or tagline changes.

import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(here, '..', 'public', 'og-image.png');

const W = 1280;
const H = 640;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1f1f23"/>
      <stop offset="100%" stop-color="#0c0c14"/>
    </linearGradient>

    <radialGradient id="aurora1" cx="0.78" cy="0.25" r="0.55">
      <stop offset="0%" stop-color="#4cc2ff" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="#4cc2ff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="aurora2" cx="0.92" cy="0.75" r="0.55">
      <stop offset="0%" stop-color="#9c52ff" stop-opacity="0.45"/>
      <stop offset="60%" stop-color="#9c52ff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="aurora3" cx="0.55" cy="1" r="0.6">
      <stop offset="0%" stop-color="#0067c0" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#0067c0" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="diamond" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0067c0"/>
      <stop offset="100%" stop-color="#4cc2ff"/>
    </linearGradient>

    <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#aurora1)"/>
  <rect width="${W}" height="${H}" fill="url(#aurora2)"/>
  <rect width="${W}" height="${H}" fill="url(#aurora3)"/>

  <!-- Subtle inner border -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="2"/>

  <!-- Diamond brand mark, top-left -->
  <g transform="translate(80, 92)" filter="url(#softShadow)">
    <path d="M28 0 L56 28 L28 56 L0 28 Z" fill="url(#diamond)"/>
    <path d="M28 14 L42 28 L28 42 L14 28 Z" fill="#ffffff" fill-opacity="0.92"/>
  </g>

  <!-- Wordmark -->
  <text x="160" y="135" font-family="Segoe UI Variable Display, Segoe UI Variable, Segoe UI, system-ui, sans-serif"
        font-size="36" font-weight="600" fill="#ffffff" letter-spacing="-0.5">AuraShell</text>

  <!-- Tagline -->
  <text x="80" y="280" font-family="Segoe UI Variable Display, Segoe UI Variable, Segoe UI, system-ui, sans-serif"
        font-size="72" font-weight="600" fill="#ffffff" letter-spacing="-2">Customize every pixel</text>
  <text x="80" y="365" font-family="Segoe UI Variable Display, Segoe UI Variable, Segoe UI, system-ui, sans-serif"
        font-size="72" font-weight="600" fill="#ffffff" letter-spacing="-2">of Windows 11.</text>

  <!-- Subtitle -->
  <text x="80" y="430" font-family="Segoe UI Variable, Segoe UI, system-ui, sans-serif"
        font-size="26" font-weight="400" fill="#ffffff" fill-opacity="0.7">Free. Open source. No telemetry.</text>

  <!-- Bottom-left URL -->
  <text x="80" y="${H - 80}" font-family="Segoe UI Variable, Segoe UI, system-ui, sans-serif"
        font-size="20" font-weight="500" fill="#ffffff" fill-opacity="0.55"
        letter-spacing="0.5">iajensen222222.github.io/AuraShell-Website</text>

  <!-- Bottom-right kind chip -->
  <g transform="translate(${W - 220}, ${H - 110})">
    <rect width="160" height="44" rx="22" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1"/>
    <text x="80" y="29" font-family="Segoe UI Variable, Segoe UI, system-ui, sans-serif"
          font-size="16" font-weight="600" fill="#4cc2ff" text-anchor="middle"
          letter-spacing="1.5">WINDOWS 11</text>
  </g>
</svg>`;

await mkdir(dirname(outPath), { recursive: true });
await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, palette: false })
  .toFile(outPath);

console.log(`[gen:og] ${outPath}`);
console.log(`         ${W}×${H} PNG`);
