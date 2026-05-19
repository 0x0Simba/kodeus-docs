import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Serve JS/CSS under /docs/_next when the site is reached via warren.kodeus.ai/docs.
  assetPrefix: process.env.ASSET_PREFIX || undefined,
};

export default withMDX(config);
