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

Purple/blue gradients, gradient-on-white, glassmorphism everywhere. A colored stripe on one edge of a card. A decorative rule before a label. Em-dashes and middle-dots in copy. Soft-tint pill spam. Big-number gradient stat heroes. Inter / Roboto / Geist / Space Grotesk / system fonts; emoji as decoration. `transition: all` and animating layout properties; scattered ping/fade. Symmetric three-icon-card feature grids; centered-hero + two-buttons template. Banned copy: leverage, elevate, unlock, seamless, transformative, effortless, robust. Full list: `https://github.com/TeamOliveCode/design-kit/blob/main/docs/standards/anti-ai-patterns.md`.

## Workflow (two passes, then check)

1. **Plan against the system.** Pick the surface standard (app/product UI vs landing/marketing). List the exact tokens and existing `@olivekit/*` components you will use. Do not introduce new colors, fonts, or spacing values.
2. **Self-critique before writing code.** Work the plan against `https://github.com/TeamOliveCode/design-kit/blob/main/docs/standards/anti-ai-patterns.md`. If any choice could read as generic AI or off-system, revise it and say what you changed. Then build, deriving every value from tokens.
3. **After building**, run `npm run lint:design`, then eyeball against the anti-AI checklist. If the result could have been generated for any other brand, it is off-system; revise.

## Composition — when to use what (positive rules, not just tokens)

Pick the type role by meaning, never an arbitrary size: hero `text-display-2xl`, page title `text-display-sm`/`text-h1`, section `text-h2`, card title `text-h4`, body `text-body`/`text-sm`, meta `text-caption`, data `font-mono`/`text-code`. One display per page. Body measure 60-75ch (`max-w-[68ch]`). Group with spacing not nested cards; one density per surface; one primary action and one accent moment per view. Use the layout primitives (Container/Stack/Cluster/Grid). Full rules: composition.md. Copy: sentence case, controlled action verbs (Log in, Start, Back, Apply), designed empty/loading/error states — content.md.

## Reach for

- Composition (when → what: type/spacing/layout): `https://github.com/TeamOliveCode/design-kit/blob/main/docs/standards/composition.md`
- Content & voice (action vocabulary, state copy, i18n): `https://github.com/TeamOliveCode/design-kit/blob/main/docs/standards/content.md`
- App / product UI (dense, dark, mono data, dot status): `https://github.com/TeamOliveCode/design-kit/blob/main/docs/standards/app-ui.md`
- Landing / marketing (airy, big display type, one signature): `https://github.com/TeamOliveCode/design-kit/blob/main/docs/standards/landing.md`
- Component anatomy and depth bar: `https://github.com/TeamOliveCode/design-kit/blob/main/docs/standards/components.md`
