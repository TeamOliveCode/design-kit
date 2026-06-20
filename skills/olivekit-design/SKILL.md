---
name: olivekit-design
description: Apply the OliveKit house design system when building or changing any web UI in a project that uses OliveKit (look for a CLAUDE.md mentioning OliveKit, an olivekit/ tokens folder, or a components.json with the @olivekit registry). Use for pages, components, layouts, and styling so output stays on-system and never reads as generic AI.
---

# OliveKit design

You are applying **OliveKit**, a shared house design system, not inventing a new look. This inverts a normal design brief: spend zero novelty on palette/type/layout direction (that decision is already made and lives in the tokens); spend all your effort executing the house system precisely and consistently. Every service should look like one system.

## The law (non-negotiable)

1. **Tokens only.** Use semantic token utilities (`bg-background`, `bg-card`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`, `bg-success`/`warning`/`destructive`). Never hardcode a color (`#hex`, `rgb()`, ad-hoc `oklch()`), an arbitrary color utility, or a one-off font/spacing/radius.
2. **Reuse, do not reinvent.** Pull components with `npx shadcn@latest add @olivekit/<name>` (button, card, dialog, select, tabs, ...). Compose pages from them; do not hand-roll a primitive that exists.
3. **It must pass `npm run lint:design`.** Hard gate. If it fails, the UI is off-system; fix it, never bypass.

## House look: "Lab Instrument" (dark-first)

- Warm near-black `ink` neutrals with a fine film grain (`.grain-layer`), not flat.
- ONE electric lime-olive accent (`--primary`), used with restraint: primary actions, active state, live/running, a single olive glow. Never a second competing accent.
- Hanken Grotesk display (huge, tight) + IBM Plex Mono for IDs, numbers, durations, code, and spec labels. Headlines lead; kickers are mono spec labels, not decorative sans all-caps.
- Signature, used once per page: grain + a single olive radial glow + the product shown as itself. One memorable moment, nothing scattered.
- Status = a colored dot + plain text, not soft-tint pills.

## Never (AI tells)

Purple/blue gradients, gradient-on-white, glassmorphism everywhere. A colored stripe on one edge of a card. A decorative rule before a label. Em-dashes and middle-dots in copy. Soft-tint pill spam. Big-number gradient stat heroes. Inter / Roboto / Geist / Space Grotesk / system fonts; emoji as decoration. `transition: all` and animating layout properties; scattered ping/fade. Symmetric three-icon-card feature grids; centered-hero + two-buttons template. Banned copy: leverage, elevate, unlock, seamless, transformative, effortless, robust. Full list: `docs/standards/anti-ai-patterns.md`.

## Workflow (two passes, then check)

1. **Plan against the system.** Pick the surface standard (app/product UI vs landing/marketing). List the exact tokens and existing `@olivekit/*` components you will use. Do not introduce new colors, fonts, or spacing values.
2. **Self-critique before writing code.** Work the plan against `docs/standards/anti-ai-patterns.md`. If any choice could read as generic AI or off-system, revise it and say what you changed. Then build, deriving every value from tokens.
3. **After building**, run `npm run lint:design`, then eyeball against the anti-AI checklist. If the result could have been generated for any other brand, it is off-system; revise.

## Reach for

- App / product UI (dense, dark, mono data, dot status): `docs/standards/app-ui.md`
- Landing / marketing (airy, big display type, one signature): `docs/standards/landing.md`
- Component anatomy and depth bar: `docs/standards/components.md`
