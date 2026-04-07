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

This repo is a standard Next.js app. Recommended: deploy to Vercel.

1. Push to GitHub
2. Import project on Vercel
3. Framework preset: Next.js
4. No env vars needed
5. (Optional) Set custom domain `docs.kodeus.xyz`

## Editing Content

All content lives in `content/docs/**/*.mdx`. Sidebar order is controlled by each folder's `meta.json`.
