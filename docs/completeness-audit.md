# OliveKit Completeness Audit — for an AI-agent design system

> Self-audit against a complete design-system taxonomy, before company-wide rollout. WIP: being merged
> with a deep-research pass. Status: ✅ have · 🟡 partial · ❌ missing.
> The goal is "nothing missed" — every ❌/🟡 below is a real gap to close or consciously defer.

## 0. Most critical misses (fix before rollout)

1. ❌ **CJK / Korean font.** Hanken Grotesk + IBM Plex Mono are **Latin-only**. Korean (and other CJK) text falls back to the system font, breaking the type identity and consistency. We are a Korean team. → Add a Korean+Latin pairing (e.g., **Pretendard** for UI, a Korean mono or `D2Coding`/`IBM Plex Sans KR` for data) into the font stack with correct fallback order.
2. 🟡 **Positive composition guidance.** We have tokens (what is allowed) and prose standards, but not agent-followable rules for *when to use which type size / weight / spacing / layout*. This is the explicitly requested gap.
3. 🟡 **Type scale is display-only.** Body/label/caption/code/heading roles lean on Tailwind defaults with no semantic roles or usage rules.
4. 🟡 **Single expression.** Only the "Lab Instrument" SaaS look. No brand/expression layer for consumer / expressive / warm products.
5. 🟡 **React-only components.** Tokens are universal; components are not.

## 1. Foundations (tokens)

- ✅ Color primitives (olive, ink, red, amber, green) + 23 semantic roles + light/dark
- ❌ **Interactive state tokens** (hover/active/pressed/selected/focus backgrounds per role) — components hardcode `/90` `/80` opacity. Tokenize state layers.
- ❌ **Data-visualization palette** (categorical/qualitative set of distinct hues + sequential + diverging scales) for charts.
- ❌ **Full state ramps** (info/success/warning/danger each with subtle/default/strong/foreground).
- ❌ Link, selection, scrim/overlay, disabled, code-syntax colors.
- ✅ Radius scale (sm/md/lg/xl)
- 🟡 Typography: families ✅, display scale ✅ — but ❌ **semantic text roles** (h1–h6, body-lg/md/sm, label, caption, overline, code, lead, quote) with size+weight+line-height+tracking+usage; ❌ weight scale/roles; ❌ measure (65–75ch) tokenized; ❌ fluid/responsive type; ❌ font-loading (font-display) strategy.
- ❌ **Spacing system** — we use Tailwind defaults; no semantic spacing (inset/stack/inline/section) or rhythm rules.
- ❌ **Sizing scale** (icon sizes, control heights, container widths) — currently hardcoded.
- ❌ **Elevation scale** + usage (we have one `--shadow-card`). Dark-mode elevation strategy (surface tint vs shadow).
- ❌ **Motion system** — `--ease-brand` only. Need duration scale, named transitions, enter/exit, stagger, and reduced-motion tokens/behavior.
- ❌ **Z-index scale** (components hardcode z-10/20/50).
- ❌ **Breakpoints** documented + responsive rules (using Tailwind defaults implicitly).
- ❌ Opacity scale, border-width tokens, blur tokens, aspect-ratio tokens.
- 🟡 **Icon system** — lucide chosen; ❌ no size/stroke tokens or icon-usage guidance.
- ❌ **Grid system** (columns, gutters, container).

## 2. Components

- ✅ ~24 (button, card, badge, input, textarea, label, select, checkbox, radio, switch, slider, dialog, alert-dialog, popover, tooltip, dropdown-menu, tabs, accordion, avatar, progress, alert, skeleton, spinner, separator)
- ❌ **Missing common components (~30):** form (validation), combobox, command (⌘K), date/calendar, sheet/drawer, toast/sonner, context-menu, hover-card, menubar, navigation-menu, breadcrumb, pagination, sidebar, stepper, table/data-table (sortable/filterable), tree, carousel, scroll-area, resizable, collapsible, aspect-ratio, kbd, code-block, chart, timeline, empty-state, banner, file-upload, input-otp, toggle/toggle-group, description-list, prose/typography components (heading/text/link/blockquote).
- ❌ **Blocks / pre-composed patterns** (settings page, auth, dashboard shell, pricing, data-table-with-toolbar, page header) — standards describe recipes but no block components.
- ❌ **Layout primitives** (Stack/Cluster/Grid/Container/Spacer) to make composition deterministic.

## 3. Composition & usage guidance (the requested gap)

- 🟡 Prose surface standards (app-ui, landing) exist.
- ❌ **Deterministic "when to use what" rules**: type role per context (hero→display-xl, page title→display-sm, section→…, body→…), measure limits, spacing/rhythm per surface, grid usage, card-grouping rules, hierarchy rules — encoded as agent-followable recipes + ideally lint-checkable.
- ❌ **Page templates / layout recipes** as reusable artifacts.
- ❌ **Density modes** (comfortable/compact) — mentioned, not implemented.
- ❌ **Responsive composition rules** (what reflows how).

## 4. Content & voice

- 🟡 Anti-AI banned copy list only.
- ❌ **Voice & tone**, microcopy patterns, capitalization rules, button/label conventions, error / empty / loading / success copy system, number/date formatting voice.

## 5. Accessibility

- 🟡 Radix keyboard/ARIA, focus-visible, dot+text status.
- ❌ **Verified contrast** (light-mode primary button is ~3:1 = AA-large only; document + fix), documented target sizes, **reduced-motion** systematically respected (grain done; ping/accordion/transitions not), skip-links, focus-management guidance, a11y CI test.

## 6. Internationalization

- ❌ **CJK/Korean fonts** (see §0), **RTL** (logical properties), locale-aware number/date/currency, pluralization, font fallback chains per script.

## 7. Theming / multi-category (requested)

- ✅ light/dark swap.
- ❌ **Expression/brand layer**: primitive → semantic → **brand/expression** layering so the same skeleton supports multiple categories (utility SaaS vs expressive/warm consumer). Needs swappable palette + type + radius + density + motion budget + texture per expression.
- ❌ Preset/theme mechanism (shadcn presets), per-product theming on shared primitives.

## 8. Cross-stack (requested)

- ✅ Tokens → CSS vars + Tailwind v4 @theme + JSON.
- ❌ Token outputs for: SCSS, typed JS/TS, Tailwind v3, native (Swift/Compose), per-stack Style Dictionary platforms.
- ❌ **Non-React components**: Vue/Svelte/server-rendered/Python; ❌ framework-agnostic option (web components).

## 9. Governance / ops (rollout-critical, irreversible)

- 🟡 v0.1.0 tag.
- ❌ Semver + breaking-change policy, **changelog**, deprecation policy, migration codemods, component status (alpha/beta/stable), **visual-regression tests** (Chromatic/Playwright snapshots), contribution guide + design review, registry auto-rebuild CI, a11y CI.

## 10. Tooling / DX

- 🟡 live demo (Overview) + lint + CI.
- ❌ Per-component docs site / Storybook, **MCP server** wired to the registry, Figma↔token sync, richer lint (all-caps sans, measure, contrast), pre-commit hook.

---

---

# Part 2 — Deep-research confirmation + recommended architecture

A 5-axis deep-research pass (Material 3, IBM Carbon, Shopify Polaris, Adobe Spectrum 2, Style Dictionary, EightShapes; 24/25 claims confirmed) **validated the audit above** and added specifics. No new top-level category was missed; research deepened several and pinned the machine-readable AI surface (llms.txt + MCP) as a confirmed gap.

## Research-confirmed specifics (adopt verbatim where useful)

- **Motion = named token vocabulary.** M3: duration in 4 tiers (short 50–200, medium 250–400, long 450–600, extra-long 700–1000ms) + easing families with an **enter=decelerate / exit=accelerate** convention (decelerate `cubic-bezier(0.05,0.7,0.1,1)`, accelerate `cubic-bezier(0.3,0,0.8,0.15)`). We have one `--ease-brand`. → Add named duration + easing tokens; components reference them.
- **Content = first-class + deterministic.** Carbon rejects subjective "important words"; ships a controlled action-label vocabulary (Log in not Sign in; Start not Launch; Back not Previous; Apply not Save changes). → Add a content/voice standard. **Verified caveat:** do NOT make sentence-case an absolute lint rule — proper nouns/trademarks are exceptions (that strong claim was refuted 0–3).
- **i18n = design requirement.** Polaris: localized text +50% on average, short labels up to +300%. → Components must tolerate extreme text growth; add logical properties (RTL), locale formatting, and (critical) a CJK/Korean font.
- **AI-ready surface = explicit artifact.** React Spectrum ships per-page markdown + "Copy for LLM" + **llms.txt** + an **MCP server**. We have CLAUDE.md + skill + registry but no llms.txt and no MCP server. → Add both.
- **Governance = SemVer + windows.** Even a CSS class rename is a breaking MAJOR; choose by-library vs by-component versioning; deprecation windows proportional to lock-in (Salesforce 18mo … FT 3–6mo); Carbon soft-deprecation (re-export shim → postinstall warning → npm deprecate → remove in major). → Add semver policy + changelog + deprecation policy + visual-regression.

## The irreversible core to lock NOW: token layering with an EXPRESSION layer

```
primitive    raw scales (olive/ink ramps, full type/space/motion/elevation scales, dataviz hues)
   | ref
semantic     roles (bg, fg, primary, text-h1..body..caption, space-section, motion-enter, ...)
   |          <- components consume ONLY these
   | themed by
EXPRESSION   a swappable preset that re-points the semantics: palette + type + radius + density
             + motion budget + texture. e.g. "Instrument" (SaaS / dark / precise) and
             "Warm" (consumer / light / expressive). Same components, different soul.
   | within
mode         light / dark per expression.
```

This is the Material 3 / Spectrum "expression generated or swapped from one source" pattern. **Getting this layering right now is the single most important, hardest-to-reverse decision** — adding categories after rollout without it would break every consumer.

**Full token namespace to fill** (today: color + radius + display-type + 1 ease):
`color(+interactive-states +dataviz)` · `type(h1-h6/body/label/caption/code roles + weight + line-height + measure)` · `space(semantic: inset/stack/section)` · `size(control/icon/container)` · `radius` · `border-width` · `elevation(scale)` · `motion(duration + easing + reduced-motion)` · `z-index` · `breakpoints` · `opacity`.

## Cross-stack architecture

- **Tokens:** we already use Style Dictionary — add output platforms (SCSS, typed TS, Tailwind v3, native Swift/Compose). One source → every stack. (Lower effort than expected; SD is already in the build.)
- **Components:** tokens reach every stack as CSS variables. For framework-agnostic *components*, the proven path is **web components** (Adobe Spectrum SWC: one implementation runs in React/Vue/Svelte/server-rendered/no-framework). Realistic plan: keep React, add a web-component core for everything else — or ship tokens-only for non-React first and port components by demand.

## Composition guidance (the requested "when→what")

Encode positive rules three ways: (1) **machine-checkable** where possible — extend the lint to flag measure >75ch, all-caps sans headings, sub-AA contrast; (2) **recipes/blocks** — page templates + layout primitives (Stack/Cluster/Grid); (3) the skill's 2-pass. Carbon's controlled vocabulary is the content-level model.

## Sequenced plan (by irreversibility / rollout risk)

1. **Lock architecture + fill foundations** (irreversible if wrong): the expression layer; full token namespace (motion/space/elevation/type-roles/state/dataviz); **Korean font (Pretendard)**; semantic type roles + usage rules.
2. **Expression layer + a 2nd expression** ("Warm" / consumer) to prove multi-category from one base.
3. **Composition guidance:** extend lint (measure/contrast/all-caps) + layout primitives + blocks + content/voice standard.
4. **AI surface:** llms.txt + per-component markdown + MCP server.
5. **Cross-stack:** extend token outputs; web-component core (or token-only baseline) for non-React.
6. **Governance:** semver + changelog + deprecation + visual-regression + component status + contribution.
7. **Breadth:** the ~30 missing components + a11y verification + systematic reduced-motion.

## Biggest pitfalls

- Locking the token architecture WITHOUT an expression layer → cannot add categories later without breaking consumers. **Fix first.**
- The Korean font miss → every Korean screen is silently off-brand.
- Over-encoding subjective rules as absolute lint (sentence-case) → false failures; keep lint objective, use guidance for the rest.
- `main`-tracking with no semver/deprecation → a kit change silently breaks consumers.

## Open questions (research could not fully verify; we design these ourselves)

- No single confirmed case of one system unifying utility-SaaS **and** expressive-consumer aesthetics (candidates: Atlassian, Mailchimp/Intuit, Spotify Encore) → we design the expression layer.
- Server-rendered (Rails/Django/Laravel) and Python/Streamlit sharing *components* (vs only tokens) → web-component-embed vs per-stack partials, our call.
- Layout composition as machine-checkable rules → no mature precedent; our own lint design.

---

# Part 3 — Build status (Phase 2 complete)

✅ **Done + live** (`github.com/TeamOliveCode/design-kit`): type roles (19) · motion system · **Korean/Pretendard** · elevation · data-viz · **expression layer + 3 expressions** (Instrument/Warm/Editorial, visually validated) · composition + content standards · layout primitives · **WCAG AA contrast 60/60 (verified, CI gate)** · reduced-motion · governance (semver/deprecation/changelog) · **llms.txt** + MCP wiring · cross-stack token outputs (TS/SCSS) · **web-component core** (Lit, framework-agnostic, proven) · ~54 components (shadcn parity + extras) · **presentation/deck surface** · CI gates (lint + typecheck + contrast).

🟡 **Marginal / deferred (with reason)**: native Swift/Compose token outputs (React Native already covered by `tokens.ts`; native-native is niche, addable via Style Dictionary) · full RTL logical-property sweep across all components (LTR team; `content.md` documents the rule, partial) · `@playwright/test` visual-regression runner (governance documents the approach; lint+typecheck+contrast CI already gate drift) · `chart`/recharts component · a bespoke MCP server (shadcn MCP + llms.txt cover it).
