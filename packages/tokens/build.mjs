// @olivekit/tokens — single primitive palette → per-EXPRESSION self-contained CSS bundles.
//
// Architecture:  primitive (raw ramps)  →  semantic (23 roles, shared STRUCTURE)  →  EXPRESSION
// An expression is a preset that picks a neutral + accent ramp, fonts, and radius. Components consume
// ONLY the semantic layer, so swapping the expression bundle reskins everything with zero component
// changes. Type roles + motion are shared across expressions. Light/dark are :root / .dark within each.
import { promises as fs } from 'node:fs';
import { readdirSync } from 'node:fs';

const SRC = 'src';
const OUT = 'dist';
const BANNER = '/* @olivekit/tokens — GENERATED, do not edit. Source: packages/tokens/src/*. */';

// --- primitives → flat lookup ('olive.500' → oklch, 'white' → oklch) ---
const primitive = JSON.parse(await fs.readFile(`${SRC}/primitive.json`, 'utf8'));
const C = {};
(function flatten(obj, prefix) {
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    if (v && typeof v === 'object' && '$value' in v) C[prefix + k] = v.$value;
    else if (v && typeof v === 'object') flatten(v, `${prefix}${k}.`);
  }
})(primitive.color, '');

// --- semantic template: pick neutral N + accent A → the 23 role→primitive maps (light + dark) ---
function semanticRoles({ neutral: N, accent: A, accentLight: AL, accentDark: AD }) {
  return {
    light: {
      background: `${N}.50`, foreground: `${N}.950`,
      card: 'white', 'card-foreground': `${N}.950`,
      popover: 'white', 'popover-foreground': `${N}.950`,
      primary: `${A}.${AL}`, 'primary-foreground': `${N}.50`,
      secondary: `${N}.100`, 'secondary-foreground': `${N}.900`,
      muted: `${N}.100`, 'muted-foreground': `${N}.500`,
      accent: `${N}.100`, 'accent-foreground': `${N}.900`,
      destructive: 'red.600', 'destructive-foreground': `${N}.50`,
      success: 'green.500', 'success-foreground': `${N}.950`,
      warning: 'amber.500', 'warning-foreground': `${N}.950`,
      border: `${N}.200`, input: `${N}.200`, ring: `${A}.${AL}`,
    },
    dark: {
      background: `${N}.950`, foreground: `${N}.50`,
      card: `${N}.900`, 'card-foreground': `${N}.50`,
      popover: `${N}.900`, 'popover-foreground': `${N}.50`,
      primary: `${A}.${AD}`, 'primary-foreground': `${N}.950`,
      secondary: `${N}.800`, 'secondary-foreground': `${N}.50`,
      muted: `${N}.800`, 'muted-foreground': `${N}.400`,
      accent: `${N}.800`, 'accent-foreground': `${N}.50`,
      destructive: 'red.600', 'destructive-foreground': `${N}.50`,
      success: 'green.500', 'success-foreground': `${N}.950`,
      warning: 'amber.400', 'warning-foreground': `${N}.950`,
      border: `${N}.800`, input: `${N}.800`, ring: `${A}.${AD}`,
    },
  };
}
const ROLES = Object.keys(semanticRoles({ neutral: 'ink', accent: 'olive', accentLight: '700', accentDark: '500' }).light);

// --- shared @theme content (type roles + motion + color mapping + radius scale) ---
const typo = JSON.parse(await fs.readFile(`${SRC}/typography.json`, 'utf8'));
const motion = JSON.parse(await fs.readFile(`${SRC}/motion.json`, 'utf8'));
const textRoles = Object.entries(typo.roles)
  .map(([n, t]) =>
    [
      `  --text-${n}: ${t.size};`,
      `  --text-${n}--line-height: ${t.line};`,
      ...(t.tracking ? [`  --text-${n}--letter-spacing: ${t.tracking};`] : []),
      ...(t.weight ? [`  --text-${n}--font-weight: ${t.weight};`] : []),
    ].join('\n'),
  )
  .join('\n');
const easings = Object.entries(motion.easing).map(([k, v]) => `  --ease-${k}: ${v};`).join('\n');
const durations = Object.entries(motion.duration).map(([k, v]) => `  --duration-${k}: ${v};`).join('\n');
const colorMap = ROLES.map((n) => `  --color-${n}: var(--${n});`).join('\n');
const radiusScale = [
  '  --radius-sm: calc(var(--radius) - 2px);',
  '  --radius-md: calc(var(--radius) - 1px);',
  '  --radius-lg: var(--radius);',
  '  --radius-xl: calc(var(--radius) + 4px);',
].join('\n');

const themeBlock = (ex) => `@theme {
  --font-sans: ${ex.fonts.sans};
  --font-mono: ${ex.fonts.mono};
  --font-display: ${ex.fonts.display};

  /* type roles */
${textRoles}

  /* motion — enter = ease-out, exit = ease-in */
${easings}
${durations}

  --shadow-xs: 0 1px 2px -1px rgb(20 20 20 / 0.08);
  --shadow-sm: 0 1px 3px 0 rgb(20 20 20 / 0.1), 0 1px 2px -1px rgb(20 20 20 / 0.1);
  --shadow-md: 0 4px 12px -2px rgb(20 20 20 / 0.12);
  --shadow-lg: 0 12px 32px -8px rgb(20 20 20 / 0.18);
  --shadow-card: 0 1px 2px -1px rgb(20 20 20 / 0.1), 0 10px 28px -14px rgb(20 20 20 / 0.18);

  /* data-viz categorical palette (shared across expressions, distinct + legible on light & dark) */
  --color-chart-1: oklch(0.700 0.150 128);
  --color-chart-2: oklch(0.680 0.160 40);
  --color-chart-3: oklch(0.620 0.150 250);
  --color-chart-4: oklch(0.800 0.150 75);
  --color-chart-5: oklch(0.700 0.130 175);
  --color-chart-6: oklch(0.600 0.160 300);
}

@theme inline {
${colorMap}

${radiusScale}
}`;

const rootBlock = (selector, roleMap, extra = '') => {
  const lines = Object.entries(roleMap).map(([role, ref]) => `  --${role}: ${C[ref] ?? ref};`);
  return `${selector} {\n${lines.join('\n')}${extra}\n}`;
};

// --- build each expression ---
await fs.mkdir(`${OUT}/expressions`, { recursive: true });
const exprFiles = readdirSync(`${SRC}/expressions`).filter((f) => f.endsWith('.json')).sort();
const built = [];
const scoped = [];
const audit = {};
for (const file of exprFiles) {
  const ex = JSON.parse(await fs.readFile(`${SRC}/expressions/${file}`, 'utf8'));
  const { light, dark } = semanticRoles(ex);
  const css = `${BANNER}
/* expression: ${ex.name} — ${ex.label} */

${themeBlock(ex)}

${rootBlock(':root', light, `\n  --radius: ${ex.radius};`)}

${rootBlock('.dark', dark)}
`;
  await fs.writeFile(`${OUT}/expressions/${ex.name}.css`, css);
  const flat = {};
  for (const [role, ref] of Object.entries(light)) flat[role] = C[ref] ?? ref;
  flat.radius = ex.radius;
  await fs.writeFile(`${OUT}/expressions/${ex.name}.json`, `${JSON.stringify(flat, null, 2)}\n`);
  built.push(ex);

  // scoped variants for runtime switching / showcasing several expressions on one page
  const fontExtra = `\n  --font-sans: ${ex.fonts.sans};\n  --font-mono: ${ex.fonts.mono};\n  --font-display: ${ex.fonts.display};\n  --radius: ${ex.radius};`;
  scoped.push(rootBlock(`.expr-${ex.name}`, light, fontExtra));
  scoped.push(rootBlock(`.expr-${ex.name}-dark`, dark, fontExtra));
  audit[ex.name] = {
    light: Object.fromEntries(Object.entries(light).map(([r, ref]) => [r, C[ref] ?? ref])),
    dark: Object.fromEntries(Object.entries(dark).map(([r, ref]) => [r, C[ref] ?? ref])),
  };

  // Default expression also emits the legacy tokens.css + theme.css (demo + registry consume these).
  if (ex.name === 'instrument') {
    await fs.writeFile(
      `${OUT}/tokens.css`,
      `${BANNER}\n\n${rootBlock(':root', light, `\n  --radius: ${ex.radius};`)}\n\n${rootBlock('.dark', dark)}\n`,
    );
    await fs.writeFile(`${OUT}/theme.css`, `${BANNER}\n\n${themeBlock(ex)}\n`);
    await fs.writeFile(`${OUT}/tokens.json`, `${JSON.stringify(flat, null, 2)}\n`);
  }
}

await fs.writeFile(
  `${OUT}/expressions-scoped.css`,
  `${BANNER}\n/* Runtime expression switching: wrap any subtree in .expr-<name> (light) or .expr-<name>-dark. */\n\n${scoped.join('\n\n')}\n`,
);
await fs.writeFile(`${OUT}/audit.json`, `${JSON.stringify(audit, null, 2)}\n`);

console.log(`✓ @olivekit/tokens built → expressions/{${built.map((e) => e.name).join(', ')}}.css + tokens.css/theme.css (default: instrument)`);
console.log(`  ${ROLES.length} semantic roles × (light+dark) × ${built.length} expressions · ${Object.keys(typo.roles).length} type roles · ${Object.keys(motion.easing).length} easings.`);
