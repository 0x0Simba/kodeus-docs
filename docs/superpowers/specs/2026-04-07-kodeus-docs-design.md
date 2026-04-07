# Kodeus Docs — Design Spec

**Date:** 2026-04-07
**Owner:** ForkOff (Simba's GitHub)
**Reference:** https://docs.robonet.finance/

## 1. Goal

Build a public documentation site for Kodeus covering:

1. **Platform** — Kodeus OS, Core Concepts, Build Agents, MCP, Security, Marketplace (developers)
2. **Warren** — AI trading assistant inside Kodeus (end users)

Robonet docs are the visual + structural reference. Brand voice: Futuristic, Precise, Minimal, Authoritative, Collaborative.

## 2. Audience

- **Developers** integrating with / building on Kodeus (Platform section)
- **End users / traders** using Warren (Warren section)

Two top-level sections in the sidebar, similar to how Robonet groups Getting Started / Workflows / Platform Features.

## 3. Stack

- **Framework:** Fumadocs (Next.js App Router, MDX) — free, OSS, modern
- **Language:** TypeScript
- **Repo:** new repo `kodeus-docs` under Simba's GitHub
- **Hosting:** local-only for v1; Vercel + custom domain (`docs.kodeus.xyz`) deferred to Kodeus team
- **Search:** Fumadocs built-in (Orama) — no Algolia for v1
- **Theming:** Custom dark theme matching Kodeus brand (black bg, green accent `#2EE6A6`-ish from screenshots, monospace headers)
- **Content format:** MDX with frontmatter

## 4. Information Architecture

```
Introduction
  ├── What is Kodeus
  ├── Why Kodeus (the Agent Economy)
  └── Quickstart

Core Concepts
  ├── The Agent Layer
  ├── Kodeus OS Overview (7 components)
  ├── Creator Agent
  ├── Tools / Agents / Data Repository (TAD)
  ├── Agent Orchestration Layer
  ├── Multi-Agent Execution Engine
  ├── ACP — Agent Communication Protocol
  ├── MetaMind — Feedback Loop Engine
  ├── DNAChain — Provenance & Memory
  └── x402 Payment Rails

Build & Run Agents
  ├── Your First Agent
  ├── Defining Logic & Tools
  ├── Memory & State
  ├── Running & Monitoring
  └── Private vs Marketplace Deployment

Integrations (MCP)
  ├── MCP Overview
  ├── Connecting Tools (4,000+ catalog)
  └── Custom MCP Servers

Security, Governance & Trust
  ├── TEE Execution
  ├── Verifiable Provenance (ERC-8004)
  ├── DNAChain Audit Trail
  └── Identity & Wallets

Marketplace & Monetization
  ├── Listing an Agent
  ├── Subscriptions, Forks & Royalties
  └── x402 Settlement

Warren
  ├── Getting Started
  │    ├── Meet Warren
  │    ├── Quick Start
  │    └── Experience Levels & Risk Profiles
  ├── Connecting Your Setup
  │    ├── Connect an Exchange (Binance / Kraken / OKX / Bybit)
  │    ├── Live vs Paper vs Demo Mode
  │    ├── Capital Allocation
  │    └── KYC & Wallet
  ├── Chatting with Warren
  │    ├── Discover Strategies
  │    ├── Create Strategies
  │    └── Review Performance
  ├── Strategy Marketplace
  │    ├── Browsing 450+ Strategies
  │    ├── Kodeus vs Community Strategies
  │    ├── Filters
  │    └── Reading Strategy Cards
  ├── Bots
  │    ├── Deploying a Strategy as a Bot
  │    ├── Managing Bots
  │    └── Bot Performance & Trades
  ├── Portfolio
  │    ├── Portfolio Dashboard
  │    ├── P/L & Win Rate
  │    ├── Capital Allocation
  │    └── Recent Trades & Live Market Feed
  ├── Configuration
  │    ├── Profile & Preferences
  │    ├── Credits & Billing
  │    ├── Autopilot
  │    └── Notifications
  └── FAQ & Troubleshooting

Resources
  ├── FAQ
  ├── Roadmap
  ├── Changelog
  └── API & SDK Reference   ← stub: "Coming soon"
```

## 5. Content Strategy

- **Approach B (rewrite from scratch).** All content rewritten in Robonet's tone (concise, technical, code/screenshot-forward) using Notion content + Warren screens as source material.
- Each Warren page documents one screen/flow with screenshots from the design files.
- Brand voice rules: short sentences, no marketing fluff, no em dashes, no AI-attribution markers.
- Where Notion has stub-only content (e.g. API & SDK), v1 ships a "Coming soon" placeholder so the IA is complete.

## 6. Repo Layout

```
kodeus-docs/
├── app/                      # Next.js app router
│   ├── (home)/               # marketing/landing redirect
│   ├── docs/[[...slug]]/     # Fumadocs route
│   └── layout.tsx
├── content/docs/
│   ├── meta.json             # sidebar order
│   ├── introduction/
│   ├── core-concepts/
│   ├── build-agents/
│   ├── integrations/
│   ├── security/
│   ├── marketplace/
│   ├── warren/
│   │   ├── meta.json
│   │   ├── getting-started/
│   │   ├── connecting/
│   │   ├── chat/
│   │   ├── strategy-marketplace/
│   │   ├── bots/
│   │   ├── portfolio/
│   │   ├── configuration/
│   │   └── faq.mdx
│   └── resources/
├── public/
│   ├── images/warren/        # screenshots
│   └── logo/
├── source.config.ts          # Fumadocs source config
├── next.config.mjs
├── tailwind.config.ts        # brand tokens
└── package.json
```

## 7. Visual Design

- Dark theme by default (no light mode v1 — Kodeus brand is dark-only).
- Brand tokens:
  - Background: near-black (`#0A0A0A`)
  - Accent green: from screenshots (~`#2EE6A6`)
  - Mono font for headings/code (matches Kodeus product UI)
- Sidebar: two-section layout (Platform / Warren) with collapsible groups.
- Header: Kodeus logo, search, GitHub link, Discord/Twitter icons.
- Footer: socials + whitepaper link.

## 8. Out of Scope (v1)

- Real API/SDK reference content (stub only)
- i18n / multi-language
- Versioned docs
- Light mode
- Algolia / paid search
- Custom domain + analytics setup (Kodeus team handles)
- Brand/marketing/positioning content (lives on marketing site)

## 9. Success Criteria

- All sidebar pages exist with real (rewritten) content, not lorem ipsum
- `npm run dev` runs cleanly locally
- Search works across all pages
- Warren screenshots embedded for every Warren screen
- Repo pushed to Simba's GitHub as `kodeus-docs`
- README documents local dev + deploy steps so Kodeus team can take over hosting
