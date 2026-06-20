// @olivekit/tokens — single DTCG source → multi-target build.
// Proves the layer-1 thesis: one token source, many stack outputs.
//   - tokens.css : :root + .dark CSS custom properties  (★ the universal channel — every stack can consume this)
//   - theme.css  : Tailwind v4 @theme mapping            (React/Vue/Svelte + Tailwind)
//   - tokens.json: flat resolved values                 (JS/TS, native bridges, docs)
//
// Light and dark are built as two SEPARATE Style Dictionary passes on disjoint sources. They must not share one
// pass: tokens merge by path (e.g. `background` exists in both files), so a single pass would let dark clobber light.
import StyleDictionary from 'style-dictionary';
import { promises as fs } from 'node:fs';

const SRC = 'src';
const OUT = 'dist';
const BANNER = '/* @olivekit/tokens — GENERATED, do not edit. Source: packages/tokens/src/*.json */';

// Keep only the mode's semantic tokens in the output; primitives stay build-time (referenced + resolved, never emitted).
const onlyFrom = (file) => (token) => token.filePath.endsWith(file);

function buildMode(modeFile, { selector, css, json }) {
  const files = [];
  if (css) files.push({ destination: css, format: 'css/variables', filter: onlyFrom(modeFile), options: { selector } });
  const jsonFiles = json ? [{ destination: json, format: 'json/flat', filter: onlyFrom(modeFile) }] : [];
  return new StyleDictionary({
    source: [`${SRC}/primitive.json`, `${SRC}/${modeFile}`],
    platforms: {
      css: { transforms: ['name/kebab'], buildPath: `${OUT}/`, files },
      ...(json ? { js: { transforms: ['name/kebab'], buildPath: `${OUT}/`, files: jsonFiles } } : {}),
    },
    log: { verbosity: 'silent' },
  }).buildAllPlatforms();
}

await buildMode('semantic.light.json', { selector: ':root', css: '_root.css', json: 'tokens.json' });
await buildMode('semantic.dark.json', { selector: '.dark', css: '_dark.css' });

// Merge the two selector blocks into one stylesheet (stripping each pass's auto-generated comment header).
const block = async (file, selector) => {
  const raw = await fs.readFile(`${OUT}/${file}`, 'utf8');
  return raw.slice(raw.indexOf(selector)).trim();
};
const rootBlock = await block('_root.css', ':root');
const darkBlock = await block('_dark.css', '.dark');
await fs.writeFile(`${OUT}/tokens.css`, `${BANNER}\n\n${rootBlock}\n\n${darkBlock}\n`);
await fs.rm(`${OUT}/_root.css`);
await fs.rm(`${OUT}/_dark.css`);

// Tailwind v4 @theme mapping — generated from the semantic color names so it stays in sync automatically.
// `inline` makes utilities reference the runtime vars (so the .dark class swap works); fonts are static literals
// (Tailwind v4's @theme can't resolve framework-injected font vars, so we name them directly).
const semantic = JSON.parse(await fs.readFile(`${SRC}/semantic.light.json`, 'utf8'));
const colorNames = Object.entries(semantic)
  .filter(([k, v]) => !k.startsWith('$') && v.$type === 'color')
  .map(([k]) => k);
const colorMappings = colorNames.map((n) => `  --color-${n}: var(--${n});`).join('\n');

// Type scale → Tailwind v4 --text-* companion properties (size carries its own line-height + tracking).
const typography = JSON.parse(await fs.readFile(`${SRC}/typography.json`, 'utf8'));
const textScale = Object.entries(typography)
  .filter(([k]) => !k.startsWith('$'))
  .map(([name, t]) =>
    [
      `  --text-${name}: ${t.size};`,
      `  --text-${name}--line-height: ${t.line};`,
      `  --text-${name}--letter-spacing: ${t.tracking};`,
    ].join('\n'),
  )
  .join('\n');

await fs.writeFile(
  `${OUT}/theme.css`,
  `${BANNER}

@theme inline {
${colorMappings}

  --radius-sm: calc(var(--radius) - 2px);
  --radius-md: calc(var(--radius) - 1px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@theme {
  --font-sans: "Hanken Grotesk", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  /* type scale (display) */
${textScale}

  /* brand effects — static, not mode-dependent */
  --ease-brand: cubic-bezier(0.22, 1, 0.36, 1);
  --shadow-card: 0 1px 2px -1px rgb(20 30 16 / 0.1), 0 10px 28px -14px rgb(20 30 16 / 0.18);
}
`,
);

console.log(`✓ @olivekit/tokens built → ${OUT}/{tokens.css, theme.css, tokens.json}`);
console.log(`  ${colorNames.length} semantic colors × (light + dark), ${Object.keys(typography).filter((k) => !k.startsWith('$')).length} display sizes.`);
