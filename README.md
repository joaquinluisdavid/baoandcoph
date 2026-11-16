# Bao & Co.

Portfolio showcase for Bao & Co., built with React, TypeScript, and Vite.

## Local development

```bash
npm install
npm run dev
```

## Vercel deployment

This repository is configured for direct deployment through Vercel's GitHub integration:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

The same settings are recorded in [`vercel.json`](./vercel.json). The project intentionally uses Vite's default root path, so no GitHub Pages-specific `base` setting is required.

To deploy, import the public GitHub repository into Vercel and leave the detected project settings in place. Every push to the connected branch can then trigger a new production deployment.
