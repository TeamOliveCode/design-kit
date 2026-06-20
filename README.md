# OliveKit

A **Claude Code-native design system**. One source of truth for color, type, and components, applied the same way across every project our team ships, so nothing looks like generic AI output and nothing drifts off-system.

> The problem it solves: many projects, each with a slightly different design, expensive to keep consistent. OliveKit makes the house look a single decision that compiles everywhere and is enforced automatically.

## The look: "Lab Instrument"

Refined, dark-first, engineered. Warm near-black with a fine film grain, one **electric lime-olive** accent used with restraint, Hanken Grotesk display + IBM Plex Mono for data, and a single olive glow as the signature. Deliberately not the purple-gradient AI aesthetic. Run the demo and open `#/overview` to see the whole system on one page.

## Architecture (three layers)

1. **Tokens** — a framework-independent DTCG source (`packages/tokens`) compiles to CSS variables, a Tailwind v4 theme, and JSON. Every stack reads the same contract.
2. **Components** — ~24 components built on Radix + Tailwind, distributed through a shadcn registry so each project **owns** the source (copied in, not a dependency).
3. **Claude Code integration** — a `CLAUDE.md` rules file, the `olivekit-design` skill, and a deterministic guardrail keep the agent on-system and self-checking for AI tells.

## Quick start

**New project** (greenfield):

```bash
npx github:TeamOliveCode/design-kit init
npx shadcn@latest add @olivekit/tokens @olivekit/button @olivekit/card
npm run lint:design
```

`init` drops in `CLAUDE.md`, the tokens, the guardrail, and a `components.json` pointing `@olivekit` at this repo's `r/` on GitHub raw (no server). Add the two token imports to your main CSS after `@import "tailwindcss";`:

```css
@import "./olivekit/tokens.css";
@import "./olivekit/theme.css";
```

**Existing project** and **how updates propagate**: see [`docs/adoption.md`](docs/adoption.md).

## The guardrail (stay on-system)

`npm run lint:design` is a deterministic check (no LLM) that **fails the build** on ad-hoc color, banned fonts, em-dashes, middle-dots, `transition: all`, and other off-system values. It travels with `init` and runs in CI on every PR (`.github/workflows/ci.yml`), so projects cannot drift.

## Standards

- [`docs/design-system-scope.md`](docs/design-system-scope.md) — the full map and roadmap
- [`docs/standards/app-ui.md`](docs/standards/app-ui.md) — dense product / app surfaces
- [`docs/standards/landing.md`](docs/standards/landing.md) — marketing / landing surfaces
- [`docs/standards/components.md`](docs/standards/components.md) — the component depth bar
- [`docs/standards/anti-ai-patterns.md`](docs/standards/anti-ai-patterns.md) — the enforced "no AI smell" list
- [`docs/research-summary.md`](docs/research-summary.md) — the research this is built on

## Repo layout

```
packages/tokens     DTCG token source + Style Dictionary build  (layer 1)
apps/demo           component sources + the live showcase        (layer 2)
  #/overview        the whole system on one page
  #/ , #/landing , #/gallery
packages/cli        `olivekit init`
scripts/            lint-design.mjs (guardrail), build-registry.mjs
r/                  built shadcn registry, served by GitHub raw
.claude-plugin/     Claude Code plugin (rules + skill)
skills/             olivekit-design skill                        (layer 3)
docs/               standards + adoption guide
CLAUDE.md           house rules, auto-loaded every session
```

## Develop

```bash
pnpm install
pnpm dev            # build tokens + run the demo (localhost:5173)
pnpm lint:design    # the guardrail
```

Status: alpha. React + Tailwind v4 is the reference adapter; Vue / server-rendered / Python adapters consume the same token layer and are on the roadmap.
