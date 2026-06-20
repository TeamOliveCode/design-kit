# Changelog

All notable changes to OliveKit. Follows [SemVer](https://semver.org); see [governance](docs/governance.md). Consumers pin a tag in production.

## Unreleased

### Added
- **Expression layer** (`primitive → semantic → expression`): pick one preset per project — `instrument` (SaaS / dark / electric olive), `warm` (consumer / light / coral), `editorial` (content / serif / claret). Same components, swappable soul. Per-expression CSS bundles in `dist/expressions/`.
- **Type system**: full semantic roles (`text-display-2xl…sm`, `text-h1…h6`, `text-body-lg/body/body-sm`, `text-label`, `text-caption`, `text-2xs`, `text-code`, `text-overline`).
- **Motion system**: named easing (`ease-out` enter / `ease-in` exit / `ease-in-out` / `ease-brand`) + duration scale.
- **Korean / CJK font fallback** (Pretendard) — Hanken Grotesk + IBM Plex Mono are Latin-only.
- **Composition + content standards** (`docs/standards/composition.md`, `content.md`) and **layout primitives** (Container/Stack/Cluster/Grid/Spacer).
- **llms.txt** machine-readable index; **governance** model; **@olivekit/mcp** server (6 tools for agents).
- **a11y**: WCAG AA verified across every expression × mode (`scripts/check-contrast.mjs`) + global reduced-motion; **RTL** via logical properties; **visual-regression** (`pnpm test:visual`).
- **Cross-stack outputs**: `tokens.ts`, `tokens.scss`, `tokens.swift` (SwiftUI), `tokens.kt` (Compose), and **@olivekit/web-components** (Lit).
- **Surfaces**: presentation/deck (`packages/presentation/deck.html`). Components: data-viz `chart`, plus ~30 more to shadcn parity (~57 total). Tokens: elevation + data-viz palette.
- Lint: `no-arbitrary-text-size` (enforces the type scale). CI gates: lint + typecheck + contrast (+ visual on macOS).

### Changed
- Token build refactored to a per-expression generator; `instrument` remains the default `tokens.css` / `theme.css` (back-compatible).
- `olivekit init` writes rules to a managed `.claude/olivekit.md` + an idempotent CLAUDE.md pointer (no longer appends to the project's CLAUDE.md).

## v0.1.0 — 2026-06-20

Initial release: DTCG tokens → CSS vars + Tailwind v4 theme; ~24 Radix components; shadcn registry on GitHub raw; `olivekit init` CLI; CLAUDE.md + `olivekit-design` skill/plugin; `lint:design` guardrail + CI; "Lab Instrument" aesthetic.
