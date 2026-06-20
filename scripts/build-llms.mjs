// Generate llms.txt — the machine-readable index an AI agent reads to consume OliveKit.
// (Mirrors the React Spectrum "AI-ready" surface: one file listing every rule, standard, component.)
import { readFileSync, writeFileSync } from 'node:fs';

const RAW = 'https://raw.githubusercontent.com/TeamOliveCode/design-kit/main';
const reg = JSON.parse(readFileSync('registry.json', 'utf8'));
const components = reg.items
  .filter((i) => i.type === 'registry:ui')
  .map((i) => i.name)
  .sort();

const out = `# OliveKit

> Claude Code-native design system. One house look across every project our team ships, applied by the agent and enforced so nothing drifts off-system or reads as generic AI.

Pull components with: \`npx shadcn@latest add @olivekit/<name>\` (registry served from GitHub raw, no server).
Bootstrap a project with: \`npx github:TeamOliveCode/design-kit init\`.

## Rules (read first)
- House rules (auto-loaded each session): ${RAW}/CLAUDE.md
- Design skill (how to apply): ${RAW}/skills/olivekit-design/SKILL.md

## Standards
- Composition — when to use which type role, measure, spacing, layout, hierarchy: ${RAW}/docs/standards/composition.md
- Content & voice — action vocabulary, state copy, i18n: ${RAW}/docs/standards/content.md
- Anti-AI patterns — the enforced "no AI smell" list: ${RAW}/docs/standards/anti-ai-patterns.md
- App / product UI surface: ${RAW}/docs/standards/app-ui.md
- Landing / marketing surface: ${RAW}/docs/standards/landing.md
- Component depth bar: ${RAW}/docs/standards/components.md

## Expressions (pick one per project; same components, different soul)
- instrument — utility / SaaS, dark-first, electric olive: ${RAW}/packages/tokens/dist/expressions/instrument.css
- warm — consumer / expressive, light-first, coral: ${RAW}/packages/tokens/dist/expressions/warm.css
- editorial — content / magazine, serif display, claret: ${RAW}/packages/tokens/dist/expressions/editorial.css

## Tokens
- Semantic CSS variables + Tailwind v4 @theme (default expression): \`npx shadcn add @olivekit/tokens\`
- Type roles: text-display-2xl…sm, text-h1…h6, text-body-lg/body/body-sm, text-label, text-caption, text-2xs, text-code, text-overline
- Motion: ease-out (enter) / ease-in (exit) / ease-in-out / ease-brand; duration-fast/base/slow/slower

## Components (${components.length})
${components.map((c) => `- ${c}: \`npx shadcn add @olivekit/${c}\``).join('\n')}

## Enforce
- \`npm run lint:design\` — deterministic guardrail (fails on ad-hoc color, banned font, em-dash, middle-dot, arbitrary text size, transition-all). Wire into CI.
`;

writeFileSync('llms.txt', out);
console.log(`✓ llms.txt — ${components.length} components, ${reg.items.length} registry items`);
