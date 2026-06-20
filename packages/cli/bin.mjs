#!/usr/bin/env node
// olivekit init [target] — apply the whole kit to ANY project in one command.
// This is the propagation mechanism: a CLAUDE.md written in the kit repo does NOT reach other
// projects; running this drops the rules + tokens + guardrail + registry config into the target,
// so Claude Code reads the house rules and stays on-system there too.
import { cpSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const KIT = resolve(import.meta.dirname, '../..');
const [cmd, targetArg] = process.argv.slice(2);
const TARGET = resolve(targetArg || '.');

if (cmd !== 'init') {
  console.log('Usage: olivekit init [target-dir]');
  process.exit(cmd ? 1 : 0);
}

console.log(`Applying OliveKit -> ${TARGET}\n`);
mkdirSync(TARGET, { recursive: true });
const created = [];

// 1. House rules the agent auto-loads every session.
const claudeDst = join(TARGET, 'CLAUDE.md');
if (existsSync(claudeDst)) {
  const cur = readFileSync(claudeDst, 'utf8');
  if (!cur.includes('OliveKit')) {
    writeFileSync(claudeDst, `${cur}\n\n${readFileSync(join(KIT, 'CLAUDE.md'), 'utf8')}`);
    created.push('CLAUDE.md (appended OliveKit rules)');
  } else {
    created.push('CLAUDE.md (already has OliveKit rules — skipped)');
  }
} else {
  cpSync(join(KIT, 'CLAUDE.md'), claudeDst);
  created.push('CLAUDE.md');
}

// 2. The token contract. Read from the committed registry (r/tokens.json embeds the CSS), so a
// `npx github:TeamOliveCode/design-kit init` run is self-contained; fall back to the local build.
mkdirSync(join(TARGET, 'olivekit'), { recursive: true });
const tokenFiles = existsSync(join(KIT, 'r/tokens.json'))
  ? JSON.parse(readFileSync(join(KIT, 'r/tokens.json'), 'utf8')).files
  : [
      { target: 'olivekit/tokens.css', content: readFileSync(join(KIT, 'packages/tokens/dist/tokens.css'), 'utf8') },
      { target: 'olivekit/theme.css', content: readFileSync(join(KIT, 'packages/tokens/dist/theme.css'), 'utf8') },
    ];
for (const f of tokenFiles) {
  writeFileSync(join(TARGET, f.target), f.content);
  created.push(f.target);
}

// 3. The deterministic guardrail + npm script.
mkdirSync(join(TARGET, 'scripts'), { recursive: true });
cpSync(join(KIT, 'scripts/lint-design.mjs'), join(TARGET, 'scripts/lint-design.mjs'));
created.push('scripts/lint-design.mjs');

const pkgPath = join(TARGET, 'package.json');
if (existsSync(pkgPath)) {
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  pkg.scripts ||= {};
  if (!pkg.scripts['lint:design']) {
    pkg.scripts['lint:design'] = 'node scripts/lint-design.mjs src';
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
    created.push('package.json (added "lint:design")');
  }
}

// 4. shadcn registry config so components pull by name.
const componentsJson = join(TARGET, 'components.json');
if (!existsSync(componentsJson)) {
  writeFileSync(
    componentsJson,
    `${JSON.stringify(
      {
        $schema: 'https://ui.shadcn.com/schema.json',
        style: 'new-york',
        tsx: true,
        tailwind: { css: 'src/styles.css', baseColor: 'neutral', cssVariables: true },
        aliases: { components: '@/components', ui: '@/components/ui', utils: '@/lib/utils' },
        registries: { '@olivekit': 'https://raw.githubusercontent.com/TeamOliveCode/design-kit/main/r/{name}.json' },
      },
      null,
      2,
    )}\n`,
  );
  created.push('components.json (with @olivekit registry)');
}

console.log('Created:');
for (const c of created) console.log(`  + ${c}`);
console.log('\nNext steps:');
console.log('  1. In your main CSS, after `@import "tailwindcss";` add:');
console.log('       @import "./olivekit/tokens.css";');
console.log('       @import "./olivekit/theme.css";');
console.log('  2. npx shadcn@latest add @olivekit/button @olivekit/card   (pull owned components)');
console.log('  3. npm run lint:design   (the guardrail — must pass, wire into CI + pre-commit)');
console.log('\nClaude Code now reads CLAUDE.md every session and stays inside the OliveKit rules.');
