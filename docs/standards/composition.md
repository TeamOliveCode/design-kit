# Composition standard — when to use what

> Tokens say what is *allowed*; this says *when to use which* and *how to compose*. Agent-followable.
> Pair with [app-ui.md](./app-ui.md), [landing.md](./landing.md), [content.md](./content.md).

## Type — role per context (never set an arbitrary font size)

| Context | Role (class) |
|---|---|
| Landing hero headline | `text-display-2xl` (→ `display-xl` / `display-lg` on smaller screens) |
| Marketing section heading | `text-display-md` / `text-display-sm` |
| App page title | `text-display-sm` or `text-h1` |
| Section heading | `text-h2` |
| Subsection | `text-h3` |
| Card / list / dialog title | `text-h4` |
| Body (marketing) | `text-body-lg` / `text-body` |
| Body (dense app) | `text-body-sm` or `text-sm` |
| Secondary / meta | `text-caption` + `text-muted-foreground` |
| Form label, table header | `text-label` (table headers: small, sentence-case, NOT all-caps sans) |
| IDs, numbers, durations, timestamps, code, metrics | `font-mono` (`text-code`), `tabular-nums` |
| Eyebrow / kicker | `text-overline` (mono, used sparingly) |

Rules: **one display role per page** (the hero). Pick the role by *meaning*, not by eyeballing a size. Headings render in `font-display`; body in `font-sans`; data in `font-mono`.

## Measure (line length)

Body text: **60–75 characters per line.** Use `max-w-[68ch]` / `max-w-prose`; never run body the full container width.

## Spacing & rhythm (group with space, not boxes)

- Section vertical rhythm: landing `py-20`–`py-32`; app `py-8`–`py-12`.
- **Group related items with spacing, not borders or nested cards** (Carbon/Polaris). Tight group `gap-2`/`gap-3`; comfortable `gap-6`.
- Page gutters `px-6` (→ `px-8` desktop). Card padding `p-5` (comfortable) / `p-4` (compact).
- **One density per surface** (comfortable OR compact) — never mix.

## Layout

- Prefer the layout primitives (`Container`, `Stack`, `Cluster`, `Grid`) over ad-hoc flex/grid.
- Container max-width: app `1180px`, landing `1140px`, **reading/editorial `720px`**.
- Grids: no empty cells; features use an **asymmetric bento with a dominant cell**, never a symmetric three-icon-card row.
- Hero: asymmetric, **one** signature artifact — not centered-headline + two-buttons.

## Hierarchy

- **One primary action per view** (one `Button` default-variant); everything else secondary / outline / ghost.
- **One accent moment per page** — the expression accent (olive / coral / claret) used sparingly. Never a second competing accent.
- States are never an afterthought: design empty / loading / error (see [content.md](./content.md)).

## Motion

- Enter with `ease-out` + `duration-base`; exit with `ease-in` + `duration-fast`. High-frequency actions: no animation (instant). One orchestrated moment per view. Respect `prefers-reduced-motion`.
