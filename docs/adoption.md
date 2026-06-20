# Adopting OliveKit (via GitHub, no server)

Everything ships from the GitHub repo. There is no registry server to run.
- Components + tokens: `r/*.json`, served by **GitHub raw** (or GitHub Pages). `shadcn build` embeds each file's content, so the JSON is self-contained.
- Rules: `CLAUDE.md` + `docs/standards/*` in the repo.
- Bootstrap CLI: `npx github:TeamOliveCode/design-kit init`.
- Guardrail: `scripts/lint-design.mjs` (`npm run lint:design`).

## Requirements and version pinning

- **Components** require **React + Tailwind v4** (they use the `@theme` directive and Radix primitives).
- **Tokens** (the CSS variables in `tokens.css`) work in **any** stack: Vue, Svelte, server-rendered, plain CSS. Import them and use `var(--primary)`, `var(--background)`, etc. Non-React stacks get the house palette, type, and dark mode for free; full component parity is on the roadmap.
- **Pin a version in production.** `components.json` defaults to `main`, which always pulls the latest. For "must not break", point the registry URL at a release tag instead, e.g. `https://raw.githubusercontent.com/TeamOliveCode/design-kit/v0.1.0/r/{name}.json`, and bump deliberately. `npx shadcn@latest diff` previews changes before you take them.

## A. New project (greenfield)

```bash
npx github:TeamOliveCode/design-kit init        # drops CLAUDE.md + tokens + guardrail + components.json
npx shadcn@latest add @olivekit/tokens @olivekit/button @olivekit/card
npm run lint:design                   # must pass
```

`components.json` points `@olivekit` at `https://raw.githubusercontent.com/TeamOliveCode/design-kit/main/r/{name}.json`, so `@olivekit/button` resolves to GitHub raw with zero infra.

## B. Existing / already-running project

`init` is **append-safe**, so it does not clobber your setup:
- `CLAUDE.md`: appends the OliveKit rules section only if it is not already there (your existing CLAUDE.md is kept).
- tokens, the lint script, and `components.json` are added without touching your code.

Then treat the guardrail as a **migration tool**:

```bash
npx github:TeamOliveCode/design-kit init
npm run lint:design     # AUDITS the existing UI: prints every deviation (ad-hoc color,
                        # banned font, em-dash, middle-dot, transition-all) as a punch-list
```

Work the list down incrementally (swap ad-hoc values for tokens, replace hand-rolled widgets with `@olivekit/*`). Put the lint in CI so no NEW drift lands while you migrate.

Important: `init` makes **future** Claude Code work on-system; it does not retroactively restyle existing screens. The lint gives you the backlog; you (or Claude Code) work through it.

## C. Updates (the kit improves, how do adopters get it?)

Copy-once goes stale. The GitHub model keeps adopters current by **pulling, not copying**:

- **Components + tokens**: re-run `npx shadcn@latest add @olivekit/<name>` to pull the latest from GitHub `main`. Use `npx shadcn@latest diff` to preview changes before applying. Since you own the copied source, you choose when to take an update.
- **Pin a version** for reproducibility by pointing the raw URL at a tag instead of `main`: `.../olivekit/v1.2.0/r/{name}.json`.
- **Rules**: keep each project's `CLAUDE.md` a thin, stable stub (principles rarely change) that links to the live `docs/standards/*` on GitHub; or distribute the rules + skill as a **Claude Code plugin** installed from this GitHub repo, so updating the plugin updates the rules everywhere. (This mirrors how Vercel's `web-design-guidelines` skill fetches its ruleset from GitHub raw at run time, always current.)

## D. Enforce it (so projects cannot drift)

- `npm run lint:design` as a **pre-commit** hook (husky + lint-staged) and a **CI gate** (PR fails on any violation).
- Optionally run Vercel's `web-design-guidelines` skill for the 100+ rule audit alongside.

## E. Publish to GitHub (one-time, by the repo owner)

```bash
pnpm build:tokens
node scripts/build-registry.mjs            # regenerate registry.json from components
npx shadcn@latest build registry.json -o r # regenerate r/*.json (embeds sources)
git add -A && git commit -m "OliveKit design kit"
git remote add origin git@github.com:TeamOliveCode/design-kit.git
git push -u origin main
```

Then replace `TeamOliveCode` in `components.json` and the CLI default URL with your GitHub org. Re-run steps 1-3 (or wire them into CI) whenever components or tokens change, so `r/` on `main` is always the source of truth.
