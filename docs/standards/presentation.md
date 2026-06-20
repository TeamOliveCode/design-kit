# Surface Standard — Presentation (HTML decks)

> Internal slide decks shared as HTML, on the same OliveKit tokens, so a deck reads as OliveLabs just like the apps. Reference: `packages/presentation/deck.html` (self-contained, keyboard-navigable).

## When
Internal share-outs, reviews, proposals built as a single HTML file (PPT-style) and sent as a link or file.

## How it works
A standalone HTML file that links the token CSS (`@olivekit/tokens/css`, or any expression bundle), defines slide CSS, and a tiny keyboard-nav script. No build, no framework. Switch the linked expression to reskin the whole deck.

## Format
- 16:9, one slide per viewport, `padding: ~9vh 9vw`. Arrow keys / click advance; a thin olive progress bar + `n / total` page marker.
- Surfaces and color come from tokens: `var(--background)`, `var(--foreground)`, `var(--card)`, `var(--primary)`, `var(--muted-foreground)`, `var(--border)`. Never ad-hoc hex.

## Type (deck scale, larger than app/landing)
- Title headline: `clamp(2.5rem, 6.5vw, 5.25rem)`, Hanken display, weight 800, tight tracking.
- Section heading: `clamp(1.875rem, 4vw, 3rem)`.
- Big statement slide: `clamp(2rem, 5vw, 4rem)`, max ~20ch.
- Body/lead: `clamp(1.1rem, 1.6vw, 1.4rem)`, muted, measure ≤ 46ch.
- Eyebrow + footer + metric numbers: IBM Plex Mono (uppercase eyebrow, sparingly).

## Slide layouts (reach for these)
title, section/agenda (bulleted with a small olive marker, not icons), big-statement (one idea, accent on the key phrase), metrics (mono numbers in a hairline-divided grid), closing. One idea per slide; one accent moment per slide.

## Signature + restraint
Grain + a single olive glow on title/closing slides only. Olive used sparingly (eyebrow, progress bar, one emphasized phrase, the mark). Korean renders in Pretendard.

## Never (same AI-tell bans as everything else)
No purple gradients, no clip-art/emoji, no symmetric 3-icon-card slides, no em-dashes / middle-dots, no all-caps sans headings, no transition-heavy builds. See `anti-ai-patterns.md`. Keep it to the layouts above.
