# AuraShell Website

Landing page for [AuraShell](https://github.com/Iajensen222222/AuraShell) — a Windows 11 customization suite.

**Live:** https://iajensen222222.github.io/AuraShell-Website/

Built with [Astro](https://astro.build/) (TypeScript, static output). Fluent-inspired design, dark/light theming, no client-side framework.

---

## Pages

| Path | Purpose |
|---|---|
| `/` | Hero, features, demo video slot, screenshots gallery, system requirements |
| `/privacy-policy` | Canonical privacy URL referenced by the winget manifest. **Do not break this URL.** |
| `/changelog` | Release history (synced from `src/content/releases/`) |

## Stack

- **Astro 6** (`output: 'static'`) — static site generation
- **TypeScript strict** — type-checked components and content schemas
- **No CSS framework** — hand-written CSS in scoped `<style>` blocks; design tokens in `src/styles/tokens.css`
- **Content collections** — markdown sources in `src/content/`, schema in `src/content.config.ts`
- **Sharp** (dev dep) — used by `npm run gen:og` to rasterize the OG image

## Develop

```pwsh
npm install
npm run dev    # → http://localhost:4321/AuraShell-Website/
```

The dev server hot-reloads everything except `content.config.ts` — if you edit that, restart the server.

## Build & preview

```pwsh
npm run build    # outputs to ./dist/
npm run preview  # serves ./dist/ at http://localhost:4321/AuraShell-Website/
```

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Local dev server (Vite + Astro) |
| `npm run build` | Static build to `./dist/` |
| `npm run preview` | Serve built `./dist/` for local smoke-testing |
| `npm run sync:legal` | Copy `../AuraShell Legal/privacy-policy.md` → `src/content/legal/`, prepending Astro frontmatter. Run whenever the canonical legal doc changes. |
| `npm run gen:og` | Re-rasterize `public/og-image.png` from the SVG defined in `scripts/generate-og-image.mjs`. Run whenever the brand or tagline changes. |

## Content sources

| Where it lives | What it is | How to update |
|---|---|---|
| `src/content/legal/privacy-policy.md` | Privacy policy rendered at `/privacy-policy` | **Do not edit directly.** Edit `../AuraShell Legal/privacy-policy.md`, then run `npm run sync:legal`, then commit both files. |
| `src/content/releases/*.md` | Release notes rendered at `/changelog` | Add a new markdown file per release (e.g., `v0.2.0.md`) with the required frontmatter (see `src/content.config.ts`). |
| `src/components/FeatureGrid.astro` | The 4 feature cards on the home page | Hand-edit the `features` array. |
| `src/components/SystemRequirements.astro` | System reqs list on the home page | Hand-edit the `requirements` array. Keep aligned with `../AuraShell Press Kit/description.txt`. |
| `src/components/DemoVideo.astro` | Demo video slot on the home page | Pass a `youtubeId` prop to render the embed; otherwise the empty-state card is shown. |

## Visual design

- Color tokens: `src/styles/tokens.css` (light is the default `:root`; dark applies via `[data-theme="dark"]` on `<html>`)
- Typography stack: `Segoe UI Variable Display, Segoe UI Variable, system-ui, …` — Windows 11 visitors get the native font; others fall back cleanly
- Theme detection: `prefers-color-scheme` first, overridden by `localStorage.aura-theme` if the user toggles
- Anti-FOUC: the initial theme is set inline in `BaseLayout.astro` before `<body>` renders

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and publishes via the official `actions/deploy-pages` action.

One-time setup in repo Settings → Pages:
1. **Source**: choose "GitHub Actions" (not "Deploy from a branch")
2. Push to main and confirm the first deploy lands at https://iajensen222222.github.io/AuraShell-Website/

## Repo layout (planned)

```
.
├── .github/workflows/deploy.yml
├── astro.config.mjs
├── package.json
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── scripts/
│   ├── sync-legal.mjs
│   └── generate-og-image.mjs
├── src/
│   ├── components/        ← Header, Footer, ThemeToggle, Hero, FeatureCard, etc.
│   ├── content/
│   │   ├── legal/         ← Synced from ../AuraShell Legal/
│   │   └── releases/
│   ├── content.config.ts  ← Content collection schemas
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── privacy-policy.astro
│   │   └── changelog.astro
│   └── styles/
│       ├── tokens.css
│       └── global.css
└── tsconfig.json
```

## License

Source for the website itself: MIT (matches the AuraShell project license).
