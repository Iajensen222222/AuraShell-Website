// Copies AuraShell Legal\privacy-policy.md into src/content/legal/
// with Astro content-collection frontmatter prepended.
//
// Run with: npm run sync:legal
//
// The legal folder remains the canonical source. Re-run this script whenever
// the canonical privacy-policy.md changes, then commit the synced file.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');

const sourcePath = resolve(projectRoot, '..', 'AuraShell Legal', 'privacy-policy.md');
const destPath = resolve(projectRoot, 'src', 'content', 'legal', 'privacy-policy.md');

const raw = await readFile(sourcePath, 'utf8');

// Extract Last updated date from the source if present
let updated = new Date().toISOString().slice(0, 10);
const updatedMatch = raw.match(/\*\*Last updated\*\*:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/);
if (updatedMatch) updated = updatedMatch[1];

// Strip the source H1 and the "Last updated / Applies to" block + its trailing
// horizontal rule, so the rendered page doesn't duplicate the title and meta header.
let body = raw.replace(/^# AuraShell Privacy Policy\s*\n+/, '');
body = body.replace(/^\*\*Last updated\*\*[\s\S]*?\n---\s*\n+/, '');
body = body.trimStart();

const frontmatter = `---
title: Privacy policy
updated: "${updated}"
---

`;

await mkdir(dirname(destPath), { recursive: true });
await writeFile(destPath, frontmatter + body, 'utf8');

console.log(`[sync:legal] ${sourcePath}`);
console.log(`         → ${destPath}`);
console.log(`         Last updated: ${updated}`);
