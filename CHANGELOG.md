# Changelog

All notable changes to OliveKit. Follows [SemVer](https://semver.org); see [governance](docs/governance.md). Consumers pin a tag in production.

## Unreleased

### Added
- **Expression layer** (`primitive → semantic → expression`): pick one preset per project — `instrument` (SaaS / dark / electric olive), `warm` (consumer / light / coral), `editorial` (content / serif / claret). Same components, swappable soul. Per-expression CSS bundles in `dist/expressions/`.
- **Type system**: full semantic roles (`text-display-2xl…sm`, `text-h1…h6`, `text-body-lg/body/body-sm`, `text-label`, `text-caption`, `text-2xs`, `text-code`, `text-overline`).
- **Motion system**: named easing (`ease-out` enter / `ease-in` exit / `ease-in-out` / `ease-brand`) + duration scale.
- **Korean / CJK font fallback** (Pretendard) — Hanken Grotesk + IBM Plex Mono are Latin-only.
- **Composition + content standards** (`docs/standards/composition.md`, `content.md`) and **layout primitives** (Container/Stack/Cluster/Grid/Spacer).
- **llms.txt** machine-readable index; **governance** model.
- Lint: `no-arbitrary-text-size` (enforces the type scale).

### Changed
- Token build refactored to a per-expression generator; `instrument` remains the default `tokens.css` / `theme.css` (back-compatible).

## v0.1.0 — 2026-06-20

Initial release: DTCG tokens → CSS vars + Tailwind v4 theme; ~24 Radix components; shadcn registry on GitHub raw; `olivekit init` CLI; CLAUDE.md + `olivekit-design` skill/plugin; `lint:design` guardrail + CI; "Lab Instrument" aesthetic.
