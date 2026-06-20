// Generate a shadcn registry.json from the component sources, then `npx shadcn build` turns it into
// static JSON under r/ that GitHub raw (or Pages) serves directly — no registry server needed.
//   consume: npx shadcn@latest add https://raw.githubusercontent.com/<org>/olivekit/main/r/button.json
//   or namespaced via components.json: npx shadcn@latest add @olivekit/button
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const UI = 'apps/demo/src/components/ui';
const items = [];

// cn() utility — every component depends on it.
items.push({
  name: 'utils',
  type: 'registry:lib',
  dependencies: ['clsx', 'tailwind-merge'],
  files: [{ path: 'apps/demo/src/lib/utils.ts', type: 'registry:lib', target: 'lib/utils.ts' }],
});

// The token contract (the same two files every stack consumes).
items.push({
  name: 'tokens',
  type: 'registry:file',
  files: [
    { path: 'packages/tokens/dist/tokens.css', type: 'registry:file', target: 'olivekit/tokens.css' },
    { path: 'packages/tokens/dist/theme.css', type: 'registry:file', target: 'olivekit/theme.css' },
  ],
});

// Components — dependencies inferred from the source so this stays correct as components change.
for (const file of readdirSync(UI).filter((f) => f.endsWith('.tsx')).sort()) {
  const name = file.replace('.tsx', '');
  const src = readFileSync(`${UI}/${file}`, 'utf8');
  const dependencies = [];
  if (src.includes("from 'radix-ui'")) dependencies.push('radix-ui');
  if (src.includes("from 'lucide-react'")) dependencies.push('lucide-react');
  if (src.includes('class-variance-authority')) dependencies.push('class-variance-authority');
  const registryDependencies = ['utils'];
  for (const m of src.matchAll(/from '\.\/([a-z-]+)'/g)) {
    if (m[1] !== name && !registryDependencies.includes(m[1])) registryDependencies.push(m[1]);
  }
  items.push({
    name,
    type: 'registry:ui',
    ...(dependencies.length ? { dependencies } : {}),
    registryDependencies,
    files: [{ path: `${UI}/${file}`, type: 'registry:ui', target: `components/ui/${file}` }],
  });
}

writeFileSync(
  'registry.json',
  `${JSON.stringify({ $schema: 'https://ui.shadcn.com/schema/registry.json', name: 'olivekit', homepage: 'https://github.com/TeamOliveCode/design-kit', items }, null, 2)}\n`,
);
console.log(`✓ registry.json — ${items.length} items (${items.filter((i) => i.type === 'registry:ui').length} components + utils + tokens)`);
console.log('  next: npx shadcn@latest build registry.json -o r   (then commit r/ to GitHub)');
