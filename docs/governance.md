# Governance

This kit is deployed across many internal projects and is hard to roll back. These rules keep it evolving without breaking consumers.

## Versioning (SemVer, by-library)

The kit ships **one version for everything** (the registry, tokens, and components move together) to avoid CSS-variable and class conflicts between mixed versions. Follow [SemVer](https://semver.org):

- **MAJOR** — any breaking change for consumers. This includes things that look small: renaming a CSS variable or a class, removing a component, changing a token's *meaning*, or changing default markup. When in doubt, it is MAJOR.
- **MINOR** — backward-compatible additions: new component, new token, new variant.
- **PATCH** — backward-compatible fixes: a value tweak that does not change intent, a bug fix.

Consumers **pin a tag** in production (`.../design-kit/v0.1.0/r/...`), not `main`. `npx shadcn diff` previews an update before they take it.

## Component status

Every component is labelled so consumers know what is safe to depend on:

- **stable** — API frozen; only PATCH/MINOR changes.
- **beta** — usable, API may still change in a MINOR.
- **experimental** — may change or be removed; do not use in production.

Current: tokens, button, card, badge, input, separator are stable; the rest are beta until the visual-regression suite covers them.

## Deprecation (never break consumers without a path)

Soft-deprecate in stages (the Carbon model), with a window proportional to switching cost (target **6 months** minimum for anything load-bearing):

1. Ship the replacement; keep the old name as a thin re-export/alias.
2. Mark the old one deprecated in docs + a console/postinstall note, with the migration step.
3. After the window, remove it in the next MAJOR. Provide a codemod when the change is mechanical.

## Drift prevention

- `npm run lint:design` is a required CI gate in every consuming repo (objective tells: ad-hoc color, banned font, em-dash, middle-dot, arbitrary text size, transition-all).
- **Visual regression** (Playwright/Chromatic screenshots of the showcase) gates the kit's own PRs, so a token change cannot silently restyle every component.
- Subjective quality (composition, taste) is guided by the standards + skill, reviewed by a human, not linted (objective rules only, per Carbon — avoid false failures).

## Contribution

Changes to tokens or shared components require: a PR, the lint + visual-regression gates green, and one design review. New components must meet the [component depth bar](./standards/components.md) and ship their states (empty/loading/error where relevant). Token/expression changes update `CHANGELOG.md` with the SemVer bump.
