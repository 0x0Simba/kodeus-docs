## Kodeus Docs

Public documentation for Kodeus and Warren, built with [Fumadocs](https://fumadocs.dev) on Next.js.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `content/docs/` all MDX docs (Platform and Warren sections)
- `public/images/warren/` Warren product screenshots
- `app/` Next.js app router and Fumadocs config
- `lib/layout.shared.tsx` shared nav config (logo, social links)

## Deployment

### Netlify (this repo)

1. Push to GitHub and import on Netlify (framework: **Next.js**).
2. `netlify.toml` sets `ASSET_PREFIX=/docs` so assets work under `warren.kodeus.ai/docs`.

### Warren marketing site (`warren.kodeus.ai`)

Docs live at `/docs` on the **marketing** Netlify site. Copy `netlify.warren-proxy.toml` into that site's `netlify.toml`, replace `DOCS_DEPLOY_URL` with this deploy's URL (e.g. `https://kodeus-docs.netlify.app`), and place those `[[redirects]]` **above** any SPA `/* → /index.html` rules.

### Vercel (alternative)

1. Import project, framework preset: Next.js
2. (Optional) Custom domain `docs.kodeus.xyz`

## Editing Content

All content lives in `content/docs/**/*.mdx`. Sidebar order is controlled by each folder's `meta.json`.
