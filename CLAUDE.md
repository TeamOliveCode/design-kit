# OliveKit — house design rules (Claude Code)

Mission: every project our team ships looks like ONE system. Apply OliveKit; never drift outside it.
Copy this file into each consuming project's root so it auto-loads every session.

## The law (non-negotiable)

1. **Tokens only.** Use semantic token utilities (`bg-background`, `bg-card`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`, `bg-success`/`warning`/`destructive`). NEVER hardcode a color (`#hex`, `rgb()`, ad-hoc `oklch()`), an arbitrary color utility (`bg-[#...]`), or a one-off font/spacing/radius. The only allowed raw values are documented signature effects (the olive glow, the grain layer).
2. **Reuse, don't reinvent.** Pull components from the registry (`npx shadcn add @olivekit/<name>`); do not hand-roll a button/dialog/select. Compose pages from existing primitives.
3. **It must pass `npm run lint:design`.** This is a hard gate (CI + pre-commit). If it fails, the UI is off-system - fix it, do not bypass.
4. **Self-check before showing UI** against `docs/standards/anti-ai-patterns.md`.

## House look - "Lab Instrument" (dark-first)

- Surface: warm near-black `ink` neutrals (green-tinted) + a fine film grain (`.grain-layer`). Not flat.
- Accent: ONE electric lime-olive (`--primary`), used with restraint - primary actions, active state, live/running, a single olive glow. Never a second competing accent.
- Type: Hanken Grotesk (display, huge + tight) + IBM Plex Mono (IDs, numbers, durations, code, spec labels). Headlines lead; mono spec labels for kickers (not decorative sans all-caps).
- Signature (spend boldness here, once): grain + a single olive radial glow + product-shown-as-itself. One memorable moment per page, nothing scattered.
- Status: a colored dot + plain text, not soft-tint pills.

## Never (AI tells - full list in docs/standards/anti-ai-patterns.md)

Purple/blue gradients, gradient-on-white, glassmorphism everywhere. A colored stripe on one edge of a card. A decorative rule before a label. em-dashes and middle-dots in copy (use commas, colons, parentheses). Soft-tint pill spam. Big-number + gradient stat heroes. Inter / Roboto / Geist / Space Grotesk / system fonts; emoji as decoration. `transition: all` and animating layout properties; scattered ping/fade. Symmetric three-icon-card feature grids; centered-hero + two-buttons template. Banned copy: leverage, elevate, unlock, seamless, transformative, effortless, robust.

## How to apply (easy adoption)

1. `npx shadcn@latest add @olivekit/tokens` (pulls `tokens.css` + `theme.css` + base config) and import them after `@import "tailwindcss"`.
2. `npx shadcn@latest add @olivekit/button @olivekit/card ...` for components (or `@olivekit/registry` for all).
3. Wrap the app root in `TooltipProvider`; default the document to `.dark`.
4. Drop this `CLAUDE.md` in the repo root. Point the shadcn MCP server at the private registry so you can "add a login form" in natural language.

## Surfaces (same tokens, different rules)

- App / Product UI: dense, dark, mono data, dot status. See `docs/standards/app-ui.md`.
- Landing / Marketing: airy, big display type, one signature, restrained olive. See `docs/standards/landing.md`.

## Before you ship

Run `npm run lint:design`. Then eyeball against the anti-AI checklist. If anything could have been generated for any other brand, it is off-system - revise it.
