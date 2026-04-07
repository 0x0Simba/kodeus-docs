# Kodeus Docs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Fumadocs-powered documentation site for Kodeus covering the Platform (developer docs) and Warren (end-user trading product) sections, runnable locally and ready for the Kodeus team to deploy.

**Architecture:** Next.js App Router + Fumadocs MDX. Content lives in `content/docs/**/*.mdx`. Two top-level sidebar groups: Platform and Warren. Custom dark theme matching Kodeus brand. No backend, no auth, no API ref content (stub only).

**Tech Stack:** Next.js 15 (App Router), TypeScript, Fumadocs (`fumadocs-ui`, `fumadocs-mdx`), Tailwind CSS, MDX.

**Spec:** `docs/superpowers/specs/2026-04-07-kodeus-docs-design.md`
**Source content:** `/tmp/kodeus.txt` (Notion dump), Warren design screenshots in `~/Downloads/Frame *.png`

**Note on testing:** This is a static docs site with no business logic. "Tests" = `npm run build` succeeding + manual visual check of each page. No unit tests.

---

## Task 1: Initialize repo and Fumadocs scaffold

**Files:**
- Create: `/Users/apple/Downloads/Projects/FORKOFF/kodeus-docs/` (project root)
- Working dir for all subsequent tasks: same path

- [ ] **Step 1: Create project via Fumadocs CLI**

```bash
cd /Users/apple/Downloads/Projects/FORKOFF
npx create-fumadocs-app@latest kodeus-docs --template +next+content-collections --tailwind --src false
```

When prompted, choose:
- Use Tailwind CSS: Yes
- Install dependencies: Yes
- Package manager: npm

- [ ] **Step 2: Verify scaffold runs**

```bash
cd kodeus-docs
npm run dev
```

Visit `http://localhost:3000` — should show default Fumadocs landing. Ctrl-C to stop.

- [ ] **Step 3: Init git and first commit**

```bash
cd /Users/apple/Downloads/Projects/FORKOFF/kodeus-docs
git init
git add -A
git commit -m "chore: scaffold fumadocs app"
```

---

## Task 2: Wipe default content and set up IA skeleton

**Files:**
- Delete: `content/docs/**` (default fumadocs sample content)
- Create: `content/docs/meta.json`
- Create: empty MDX stubs for every page in the IA

- [ ] **Step 1: Remove default content**

```bash
rm -rf content/docs
mkdir -p content/docs
```

- [ ] **Step 2: Create top-level meta.json**

Create `content/docs/meta.json`:

```json
{
  "title": "Kodeus Docs",
  "pages": [
    "introduction",
    "core-concepts",
    "build-agents",
    "integrations",
    "security",
    "marketplace",
    "warren",
    "resources"
  ]
}
```

- [ ] **Step 3: Create folder + meta.json + stub MDX for each section**

For each section below, create the folder, a `meta.json`, and one stub `.mdx` per page. Use this exact mapping (run as a script or by hand):

```
content/docs/introduction/
  meta.json -> { "title": "Introduction", "pages": ["what-is-kodeus", "why-kodeus", "quickstart"] }
  what-is-kodeus.mdx
  why-kodeus.mdx
  quickstart.mdx

content/docs/core-concepts/
  meta.json -> { "title": "Core Concepts", "pages": ["agent-layer","kodeus-os","creator-agent","tad","orchestration","execution-engine","acp","metamind","dnachain","x402"] }
  agent-layer.mdx
  kodeus-os.mdx
  creator-agent.mdx
  tad.mdx
  orchestration.mdx
  execution-engine.mdx
  acp.mdx
  metamind.mdx
  dnachain.mdx
  x402.mdx

content/docs/build-agents/
  meta.json -> { "title": "Build & Run Agents", "pages": ["first-agent","logic-and-tools","memory-state","running-monitoring","deployment"] }
  first-agent.mdx
  logic-and-tools.mdx
  memory-state.mdx
  running-monitoring.mdx
  deployment.mdx

content/docs/integrations/
  meta.json -> { "title": "Integrations (MCP)", "pages": ["mcp-overview","connecting-tools","custom-mcp"] }
  mcp-overview.mdx
  connecting-tools.mdx
  custom-mcp.mdx

content/docs/security/
  meta.json -> { "title": "Security & Trust", "pages": ["tee","provenance","audit-trail","identity-wallets"] }
  tee.mdx
  provenance.mdx
  audit-trail.mdx
  identity-wallets.mdx

content/docs/marketplace/
  meta.json -> { "title": "Marketplace", "pages": ["listing","royalties","x402-settlement"] }
  listing.mdx
  royalties.mdx
  x402-settlement.mdx

content/docs/warren/
  meta.json -> { "title": "Warren", "pages": ["getting-started","connecting","chat","strategy-marketplace","bots","portfolio","configuration","faq"] }
  faq.mdx
  getting-started/
    meta.json -> { "title": "Getting Started", "pages": ["meet-warren","quick-start","experience-risk"] }
    meet-warren.mdx
    quick-start.mdx
    experience-risk.mdx
  connecting/
    meta.json -> { "title": "Connecting Your Setup", "pages": ["exchanges","modes","capital","kyc-wallet"] }
    exchanges.mdx
    modes.mdx
    capital.mdx
    kyc-wallet.mdx
  chat/
    meta.json -> { "title": "Chatting with Warren", "pages": ["discover","create","review"] }
    discover.mdx
    create.mdx
    review.mdx
  strategy-marketplace/
    meta.json -> { "title": "Strategy Marketplace", "pages": ["browsing","kodeus-vs-community","filters","strategy-cards"] }
    browsing.mdx
    kodeus-vs-community.mdx
    filters.mdx
    strategy-cards.mdx
  bots/
    meta.json -> { "title": "Bots", "pages": ["deploying","managing","performance"] }
    deploying.mdx
    managing.mdx
    performance.mdx
  portfolio/
    meta.json -> { "title": "Portfolio", "pages": ["dashboard","pl-winrate","capital-allocation","trades-feed"] }
    dashboard.mdx
    pl-winrate.mdx
    capital-allocation.mdx
    trades-feed.mdx
  configuration/
    meta.json -> { "title": "Configuration", "pages": ["profile","credits","autopilot","notifications"] }
    profile.mdx
    credits.mdx
    autopilot.mdx
    notifications.mdx

content/docs/resources/
  meta.json -> { "title": "Resources", "pages": ["faq","roadmap","changelog","api-sdk"] }
  faq.mdx
  roadmap.mdx
  changelog.mdx
  api-sdk.mdx
```

Each stub `.mdx` file must have valid frontmatter so Fumadocs doesn't error:

```mdx
---
title: <Page Title>
description: <one-line description>
---

Coming soon.
```

- [ ] **Step 4: Verify dev server still runs and sidebar renders all sections**

```bash
npm run dev
```

Open `http://localhost:3000/docs/introduction/what-is-kodeus` and confirm sidebar shows every section. Fix any frontmatter / meta.json errors before committing.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold full IA with stub pages"
```

---

## Task 3: Brand theme (dark, Kodeus green)

**Files:**
- Modify: `app/global.css` (or `tailwind.config.ts` depending on Fumadocs template)
- Modify: `app/layout.tsx` to force dark mode
- Add: `public/logo.svg` (Kodeus wordmark — placeholder text logo if asset not available)

- [ ] **Step 1: Add brand tokens to global.css**

Append to `app/global.css`:

```css
:root {
  --color-fd-background: #0a0a0a;
  --color-fd-foreground: #f5f5f5;
  --color-fd-primary: #2EE6A6;
  --color-fd-accent: #2EE6A6;
  --color-fd-border: #1f1f1f;
  --color-fd-muted: #141414;
}

html { color-scheme: dark; }
```

- [ ] **Step 2: Force dark mode in root layout**

In `app/layout.tsx`, add `className="dark"` to the `<html>` tag and remove any theme toggle if present.

- [ ] **Step 3: Add Kodeus logo**

Save Kodeus wordmark to `public/logo.svg`. If asset not available, create a text-based SVG placeholder:

```bash
cat > public/logo.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40"><text x="0" y="28" font-family="ui-monospace,monospace" font-size="28" font-weight="700" fill="#f5f5f5">KODEUS</text></svg>
SVG
```

Wire it into the docs layout's nav by editing `app/layout.config.tsx` (Fumadocs convention) — set `nav.title` to an `<img src="/logo.svg" alt="Kodeus" className="h-6" />` element.

- [ ] **Step 4: Verify locally**

```bash
npm run dev
```

Confirm dark theme + Kodeus logo show. Confirm green accent on active sidebar item.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: kodeus brand theme (dark + green accent + logo)"
```

---

## Task 4: Save Warren screenshots into the repo

**Files:**
- Create: `public/images/warren/*.png`

- [ ] **Step 1: Copy screenshots from Downloads**

```bash
mkdir -p public/images/warren
cp ~/Downloads/Frame\ 24518176.png   public/images/warren/home-warren-prompt.png
cp ~/Downloads/Frame\ 1820557258.png public/images/warren/profile-modal.png
cp ~/Downloads/Frame\ 1820557256.png public/images/warren/dashboard.png
cp ~/Downloads/Frame\ 1820557170.png public/images/warren/portfolio.png
cp ~/Downloads/Frame\ 1820556983.png public/images/warren/chat-workflow.png
cp ~/Downloads/Frame\ 24518255.png   public/images/warren/onboarding-volume.png
cp ~/Downloads/Frame\ 24518251.png   public/images/warren/strategy-marketplace.png
cp ~/Downloads/Frame\ 24518248.png   public/images/warren/chat-risk-profile.png
cp ~/Downloads/Frame\ 24518220.png   public/images/warren/onboarding-strategies.png
cp ~/Downloads/Frame\ 24518219.png   public/images/warren/onboarding-configuring.png
cp ~/Downloads/Frame\ 24518218.png   public/images/warren/onboarding-risk.png
cp ~/Downloads/Frame\ 24518217.png   public/images/warren/onboarding-experience.png
cp ~/Downloads/Frame\ 24518215.png   public/images/warren/connect-exchange.png
cp ~/Downloads/Frame\ 24518203.png   public/images/warren/meet-warren.png
```

- [ ] **Step 2: Commit**

```bash
git add public/images/warren
git commit -m "chore: add warren design screenshots"
```

---

## Task 5: Write Introduction section content

**Files:**
- Modify: `content/docs/introduction/what-is-kodeus.mdx`
- Modify: `content/docs/introduction/why-kodeus.mdx`
- Modify: `content/docs/introduction/quickstart.mdx`

**Source:** Notion "Blurb about Brand" (3000-char version) and "Why We Built Kodeus" page in `/tmp/kodeus.txt` lines 4-65 and 1178+.

**Voice rules:** Short sentences. No em dashes (use commas, periods, or colons). No marketing fluff. Technical and direct. Robonet-style.

- [ ] **Step 1: Write `what-is-kodeus.mdx`**

```mdx
---
title: What is Kodeus
description: Kodeus is the Internet's Agent Layer where users create programmable, monetizable agents that act, settle, and prove autonomously.
---

Kodeus is the Internet's Agent Layer. Users create programmable agents that reason, act, transact, and prove outcomes on behalf of humans and other agents.

Every agent on Kodeus has:

- **Identity** via decentralized credentials (ERC-8004)
- **Memory** that persists across runs
- **A wallet** for autonomous payments through x402
- **Verifiable provenance** via DNAChain

Agents connect to 4,000+ tools through MCP and run inside a TEE-backed execution environment. They can be deployed privately or listed on the Kodeus marketplace where other users and agents can subscribe to, fork, or compose them.

## What you can build

- DeFi agents that monitor markets and rebalance positions
- Data pipeline agents that ingest, transform, and post results on-chain
- Multi-agent workflows that negotiate and settle between systems
- Productivity agents for daily coordination

## Where to start

- New to agents? Read [Why Kodeus](/docs/introduction/why-kodeus).
- Ready to build? Jump to the [Quickstart](/docs/introduction/quickstart).
- Looking to trade? See [Warren](/docs/warren/getting-started/meet-warren).
```

- [ ] **Step 2: Write `why-kodeus.mdx`**

Use the "Why We Built Kodeus" Notion content as source. Rewrite into 5-8 short paragraphs covering: the problem (bots + glue code don't compose), the gap (no shared OS for agents), and Kodeus's answer (open agentic OS with provenance and settlement). No em dashes. Save to file.

- [ ] **Step 3: Write `quickstart.mdx`**

5-step quickstart skeleton (sign up → connect wallet → create your first agent via Creator Agent prompt → connect a tool via MCP → run and view in DNAChain). Mark each step concretely; if exact UI flow is unknown, describe it using the closest information from the Notion "Build and Run Agents" page (lines 2516-2556 of `/tmp/kodeus.txt`).

- [ ] **Step 4: Verify pages render**

```bash
npm run dev
```

Visit each page. Fix any MDX errors.

- [ ] **Step 5: Commit**

```bash
git add content/docs/introduction
git commit -m "docs: write introduction section"
```

---

## Task 6: Write Core Concepts section

**Files:**
- Modify: every `.mdx` in `content/docs/core-concepts/`

**Source:** Notion "Existing Keywords & Signals" + "Kodeus Documentation > Core Concepts" pages in `/tmp/kodeus.txt`. Specifically the 7 OS components: Creator Agent, TAD, Agent Orchestration Layer, Multi-Agent Execution Engine, ACP, MetaMind, DNAChain.

- [ ] **Step 1: Write `agent-layer.mdx`**

One-page conceptual intro: what "the Agent Layer" means, why it sits beneath products, and how it relates to the existing web stack. ~200 words. Voice rules apply.

- [ ] **Step 2: Write `kodeus-os.mdx`**

Overview of the 7 components with one paragraph each and links to the dedicated page. End with a diagram placeholder:

```mdx
> Architecture diagram coming soon.
```

- [ ] **Step 3: Write `creator-agent.mdx`**

What it is, what it does (turns prompts into agent definitions), inputs, outputs. ~150 words.

- [ ] **Step 4: Write `tad.mdx`** (Tools/Agents/Data Repository)

Same shape: definition, role, examples. ~150 words.

- [ ] **Step 5: Write `orchestration.mdx`**

Agent Orchestration Layer — JIT execution, planning, delegation. ~150 words.

- [ ] **Step 6: Write `execution-engine.mdx`**

Multi-Agent Execution Engine — runs agents in TEE, handles concurrency, resource limits. ~150 words.

- [ ] **Step 7: Write `acp.mdx`**

Agent Communication Protocol — how agents talk to each other, message format, alignment with A2A and MCP. ~150 words.

- [ ] **Step 8: Write `metamind.mdx`**

Feedback Loop Engine — how Kodeus learns from execution outcomes. ~150 words.

- [ ] **Step 9: Write `dnachain.mdx`**

Immutable log + memory layer. Provenance chain. Why ERC-8004 matters. ~200 words.

- [ ] **Step 10: Write `x402.mdx`**

Payment rails — how agents pay each other and charge users. ~200 words.

- [ ] **Step 11: Verify and commit**

```bash
npm run dev    # spot-check 2-3 pages
git add content/docs/core-concepts
git commit -m "docs: write core concepts section"
```

---

## Task 7: Write Build & Run Agents section

**Files:** every `.mdx` in `content/docs/build-agents/`

**Source:** Notion "Build and Run Agents" (line 2516+) and "From Prompt to Execution: Auto-Tooling Engine" (line 1554+).

- [ ] **Step 1: Write `first-agent.mdx`** — narrative walkthrough of creating an agent from a prompt. ~250 words. Use placeholder UI screenshots.

- [ ] **Step 2: Write `logic-and-tools.mdx`** — defining behavior, attaching MCP tools, setting triggers. ~200 words.

- [ ] **Step 3: Write `memory-state.mdx`** — how agent memory works, persistence, scoping. ~150 words.

- [ ] **Step 4: Write `running-monitoring.mdx`** — running agents, viewing logs, DNAChain trace. ~200 words.

- [ ] **Step 5: Write `deployment.mdx`** — private vs marketplace deployment, what each means. ~150 words.

- [ ] **Step 6: Verify and commit**

```bash
npm run dev
git add content/docs/build-agents
git commit -m "docs: write build-and-run-agents section"
```

---

## Task 8: Write Integrations (MCP) section

**Files:** `content/docs/integrations/*.mdx`

**Source:** Notion "Integrations and Tooling (MCP)" (line 2556+).

- [ ] **Step 1: Write `mcp-overview.mdx`** — what MCP is, why Kodeus uses it, scope of the 4,000+ catalog. ~200 words.

- [ ] **Step 2: Write `connecting-tools.mdx`** — how to attach a tool to an agent. Step-by-step. ~200 words.

- [ ] **Step 3: Write `custom-mcp.mdx`** — bringing your own MCP server. Note this links out to Anthropic's MCP spec. ~150 words.

- [ ] **Step 4: Verify and commit**

```bash
npm run dev
git add content/docs/integrations
git commit -m "docs: write integrations section"
```

---

## Task 9: Write Security & Trust section

**Files:** `content/docs/security/*.mdx`

**Source:** Notion "Security, Governance, and Trust" (line 2585+) and DNAChain blog (line 1283+).

- [ ] **Step 1: Write `tee.mdx`** — TEE execution model, what it guarantees. ~200 words.

- [ ] **Step 2: Write `provenance.mdx`** — ERC-8004, what's signed and stored. ~200 words.

- [ ] **Step 3: Write `audit-trail.mdx`** — DNAChain log structure, how to query. ~200 words.

- [ ] **Step 4: Write `identity-wallets.mdx`** — how every agent gets a wallet and identity. ~150 words.

- [ ] **Step 5: Verify and commit**

```bash
npm run dev
git add content/docs/security
git commit -m "docs: write security section"
```

---

## Task 10: Write Marketplace section

**Files:** `content/docs/marketplace/*.mdx`

**Source:** Notion "Marketplace and Monetization" (line 2612+) and "The Agent Marketplace" blog (line 1454+).

- [ ] **Step 1: Write `listing.mdx`** — how to list an agent. Steps + screenshot placeholder. ~200 words.

- [ ] **Step 2: Write `royalties.mdx`** — subscriptions, forks, royalty model. ~200 words.

- [ ] **Step 3: Write `x402-settlement.mdx`** — how settlement happens via x402. ~150 words.

- [ ] **Step 4: Verify and commit**

```bash
npm run dev
git add content/docs/marketplace
git commit -m "docs: write marketplace section"
```

---

## Task 11: Write Warren — Getting Started

**Files:** `content/docs/warren/getting-started/*.mdx`

**Source:** Notion "Warren Your AI Fund Manager" (line 3294+) + screenshots in `public/images/warren/`.

- [ ] **Step 1: Write `meet-warren.mdx`**

```mdx
---
title: Meet Warren
description: Warren is the AI trading assistant inside Kodeus. It analyzes markets, suggests strategies, and helps you trade.
---

Warren is the AI trading assistant built into Kodeus. You talk to Warren in plain English and it does three things:

1. **Analyze markets** in real time across major pairs
2. **Discover and create strategies** matched to your risk profile
3. **Run bots** that execute strategies on your connected exchange

Your funds stay on your exchange. Warren only interacts through API access. You stay in control.

![Meet Warren](/images/warren/meet-warren.png)

## What Warren is not

- Not a custodian. Funds live on Binance, Kraken, OKX, or Bybit.
- Not a black box. Every trade is logged in your portfolio with full attribution.
- Not financial advice. Always review strategies before deploying.

Next: [Quick Start](/docs/warren/getting-started/quick-start)
```

- [ ] **Step 2: Write `quick-start.mdx`**

7-step onboarding walkthrough mapped to the design screens. Use this exact structure:

```mdx
---
title: Quick Start
description: Onboard Warren in seven steps.
---

## 1. Open Trading Bay

From the Kodeus home screen, click **Trading Bay** in the top nav.

![Trading Bay](/images/warren/home-warren-prompt.png)

## 2. Pick your experience level

Warren tailors recommendations to your trading background.

![Experience level](/images/warren/onboarding-experience.png)

Options: **Beginner**, **Novice**, **Experienced**, **Seasoned**.

## 3. Choose a risk profile

![Risk profile](/images/warren/onboarding-risk.png)

- **Conservative** — capital preservation, smaller positions, slower turnover
- **Balanced** — diversified mix, controlled volatility
- **Aggressive** — momentum-heavy, larger positions, higher volatility

## 4. Set the volume to manage

![Volume](/images/warren/onboarding-volume.png)

Pick a starting allocation. You can change it later.

## 5. Review suggested strategies

![Suggestions](/images/warren/onboarding-strategies.png)

Warren picks 3 starter strategies based on the inputs above.

## 6. Choose a mode

- **Live Trading** — real funds on a connected exchange
- **Paper Trading** — simulated capital
- **Demo** — explore the UI without connecting anything

## 7. Connect your exchange

![Connect exchange](/images/warren/connect-exchange.png)

Supported: Binance, Kraken, OKX, Bybit. Kodeus only requests API access. You stay in custody of funds.

Done. Warren is now configuring your setup.

![Configuring](/images/warren/onboarding-configuring.png)
```

- [ ] **Step 3: Write `experience-risk.mdx`**

Reference page explaining each experience level and risk profile in detail. ~250 words. Pull from the screenshot copy.

- [ ] **Step 4: Verify and commit**

```bash
npm run dev
git add content/docs/warren/getting-started
git commit -m "docs(warren): write getting-started section"
```

---

## Task 12: Write Warren — Connecting Your Setup

**Files:** `content/docs/warren/connecting/*.mdx`

- [ ] **Step 1: Write `exchanges.mdx`** — which exchanges, how to generate API keys, what permissions Warren needs (read + spot trade, no withdraw). One subsection per exchange. Embed `connect-exchange.png`. ~400 words total.

- [ ] **Step 2: Write `modes.mdx`** — Live vs Paper vs Demo, when to use each, how to switch. ~200 words.

- [ ] **Step 3: Write `capital.mdx`** — how to set and adjust capital allocation; embed `onboarding-volume.png`. ~150 words.

- [ ] **Step 4: Write `kyc-wallet.mdx`** — Digilocker KYC, wallet address, member-since. Embed `profile-modal.png`. ~150 words.

- [ ] **Step 5: Verify and commit**

```bash
npm run dev
git add content/docs/warren/connecting
git commit -m "docs(warren): write connecting section"
```

---

## Task 13: Write Warren — Chatting with Warren

**Files:** `content/docs/warren/chat/*.mdx`

- [ ] **Step 1: Write `discover.mdx`** — using the chat to discover strategies. Show example prompts. Embed `chat-workflow.png`. ~250 words.

- [ ] **Step 2: Write `create.mdx`** — using the chat to create strategies (e.g. "Build me an insane BTC volatility strat"), explain the workflow visualization (openai-websearch → hyperliquid-mcp → kodeus). Embed `chat-workflow.png` and `chat-risk-profile.png`. ~300 words.

- [ ] **Step 3: Write `review.mdx`** — using the chat to review bot performance. ~200 words.

- [ ] **Step 4: Verify and commit**

```bash
npm run dev
git add content/docs/warren/chat
git commit -m "docs(warren): write chat section"
```

---

## Task 14: Write Warren — Strategy Marketplace

**Files:** `content/docs/warren/strategy-marketplace/*.mdx`

- [ ] **Step 1: Write `browsing.mdx`** — overview of the 450+ marketplace, recommended/best-performing/relevant sections. Embed `strategy-marketplace.png`. ~250 words.

- [ ] **Step 2: Write `kodeus-vs-community.mdx`** — difference between official Kodeus strategies and community-published ones. ~150 words.

- [ ] **Step 3: Write `filters.mdx`** — every filter listed in the design (Risk Level, Strategy Type, Market, Timeframe, Performance, Capital Range, Execution Style, Complexity). ~250 words.

- [ ] **Step 4: Write `strategy-cards.mdx`** — what ROI, Win Rate, risk badge, and source badge mean on a card. ~150 words.

- [ ] **Step 5: Verify and commit**

```bash
npm run dev
git add content/docs/warren/strategy-marketplace
git commit -m "docs(warren): write strategy marketplace section"
```

---

## Task 15: Write Warren — Bots, Portfolio, Configuration, FAQ

**Files:** remaining `.mdx` under `content/docs/warren/`

- [ ] **Step 1: Write `bots/deploying.mdx`** — picking a strategy → deploying as a bot → naming → starting. ~200 words. Embed `dashboard.png`.

- [ ] **Step 2: Write `bots/managing.mdx`** — pausing, stopping, reallocating, deleting. Reference the active-bots panel. ~200 words.

- [ ] **Step 3: Write `bots/performance.mdx`** — reading per-bot ROI, win rate, and trades. ~150 words.

- [ ] **Step 4: Write `portfolio/dashboard.mdx`** — total volume, today's P/L, bots active, win rate. Embed `portfolio.png`. ~250 words.

- [ ] **Step 5: Write `portfolio/pl-winrate.mdx`** — how P/L is calculated, realized vs unrealized. ~150 words.

- [ ] **Step 6: Write `portfolio/capital-allocation.mdx`** — In Trading Bay vs Idle vs Open Positions. ~150 words.

- [ ] **Step 7: Write `portfolio/trades-feed.mdx`** — recent trades table + live market feed sidebar. ~150 words.

- [ ] **Step 8: Write `configuration/profile.mdx`** — Personal Info tab. ~150 words. Embed `profile-modal.png`.

- [ ] **Step 9: Write `configuration/credits.mdx`** — Credits tab, what credits are spent on. ~150 words.

- [ ] **Step 10: Write `configuration/autopilot.mdx`** — Autopilot tab, what it automates. ~150 words.

- [ ] **Step 11: Write `configuration/notifications.mdx`** — notification preferences. ~100 words.

- [ ] **Step 12: Write `warren/faq.mdx`** — 10 Q&A pairs covering: custody, supported exchanges, fees, paper trading, stopping bots, KYC, withdrawals, risk warnings, supported pairs, getting help.

- [ ] **Step 13: Verify and commit**

```bash
npm run dev
git add content/docs/warren
git commit -m "docs(warren): write bots/portfolio/configuration/faq sections"
```

---

## Task 16: Write Resources section

**Files:** `content/docs/resources/*.mdx`

- [ ] **Step 1: Write `faq.mdx`** — 8 platform-level Q&As (not Warren-specific): what is Kodeus, who is it for, what's free, do I need a wallet, what chains, is it open source, where's the whitepaper, how to get support.

- [ ] **Step 2: Write `roadmap.mdx`** — placeholder pulled from Notion "Release Stages and Roadmap" (line 2663+). If empty, ship 3 phases: Alpha (current), Beta, GA.

- [ ] **Step 3: Write `changelog.mdx`** — single entry: "v0.1.0 — Initial public docs (2026-04-07)".

- [ ] **Step 4: Write `api-sdk.mdx`** — Coming Soon page:

```mdx
---
title: API & SDK Reference
description: Coming soon.
---

# API & SDK Reference

The Kodeus API and SDK reference is coming soon.

In the meantime:

- See [Build & Run Agents](/docs/build-agents/first-agent) for the no-code path.
- Reach out on [Discord](#) or [Twitter](https://x.com/TheKodeusLabs) if you want early access.
```

- [ ] **Step 5: Verify and commit**

```bash
npm run dev
git add content/docs/resources
git commit -m "docs: write resources section"
```

---

## Task 17: Footer, social links, header polish

**Files:**
- Modify: `app/layout.config.tsx` (Fumadocs nav config)
- Modify: `app/(home)/page.tsx` if it exists, redirect `/` to `/docs/introduction/what-is-kodeus`

- [ ] **Step 1: Add social links to nav**

In `app/layout.config.tsx`, add GitHub + X links:

```ts
links: [
  { type: 'icon', url: 'https://x.com/TheKodeusLabs', text: 'Twitter', icon: <TwitterIcon /> },
  { type: 'icon', url: 'https://github.com/<simba>/kodeus-docs', text: 'GitHub', icon: <GitHubIcon /> },
],
```

- [ ] **Step 2: Redirect root to docs**

In `app/(home)/page.tsx` (or `app/page.tsx`):

```tsx
import { redirect } from 'next/navigation';
export default function Home() {
  redirect('/docs/introduction/what-is-kodeus');
}
```

- [ ] **Step 3: Verify and commit**

```bash
npm run dev
# visit http://localhost:3000 and confirm redirect
git add -A
git commit -m "feat: redirect root + add social nav links"
```

---

## Task 18: README + final build verification

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README**

```markdown
# Kodeus Docs

Public documentation for Kodeus and Warren, built with [Fumadocs](https://fumadocs.dev) on Next.js.

## Local Development

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000

## Structure

- `content/docs/` — all MDX docs (Platform + Warren sections)
- `public/images/warren/` — Warren product screenshots
- `app/` — Next.js app router + Fumadocs config

## Deployment

This repo is a standard Next.js app. Recommended: deploy to Vercel.

1. Push to GitHub
2. Import project on Vercel
3. Framework preset: Next.js
4. No env vars needed
5. (Optional) Set custom domain `docs.kodeus.xyz`

## Editing Content

All content lives in `content/docs/**/*.mdx`. Sidebar order is controlled by each folder's `meta.json`.
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: build succeeds with no errors. Fix any broken links / MDX issues until clean.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "docs: add README and verify production build"
```

---

## Task 19: Push to Simba's GitHub

- [ ] **Step 1: Confirm GitHub token / account**

Per `feedback_vercel_deploy` memory: use the **officialForkoff** GitHub token, not Simba's personal one. Confirm with user before pushing.

- [ ] **Step 2: Create remote repo**

```bash
gh repo create <simba-org>/kodeus-docs --public --source . --remote origin --push
```

- [ ] **Step 3: Verify**

Open the GitHub URL printed by `gh`, confirm files are present.

---

## Self-review notes

- Spec coverage: every section in the spec IA has at least one task. Warren section fully decomposed across tasks 11-15.
- No real API/SDK content (per spec out-of-scope) — only the stub page in Task 16.
- No tests because the spec explicitly notes this is a static docs site.
- All file paths absolute relative to repo root. All MDX uses required frontmatter.
- Voice rules (no em dashes, short sentences) noted at the top of every content task.
