#!/usr/bin/env node
// OliveKit design guardrail. Deterministic DOM/source checks (no LLM) so UI cannot drift
// outside the house rules. Exits non-zero on any violation — wire into pre-commit + CI.
// Usage: node scripts/lint-design.mjs [dir ...]   (default: apps/demo/src)
import { readdirSync, readFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const TARGETS = process.argv.slice(2).length ? process.argv.slice(2) : ['apps/demo/src'];
const EXT = new Set(['.tsx', '.ts', '.jsx', '.js', '.css']);
const IGNORE = new Set(['node_modules', 'dist', 'build', '.vite']);

const RULES = [
  { id: 'no-hex-color', re: /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/, msg: 'hardcoded hex color — use a semantic token (bg-*/text-*/border-*)' },
  { id: 'no-arbitrary-color', re: /(?:bg|text|border|ring|fill|stroke|from|to|via)-\[#/, msg: 'arbitrary color utility — use a semantic token' },
  { id: 'no-banned-font', re: /font-(?:family|\[)\s*[:'"\s]*(?:Inter|Roboto|Open Sans|Montserrat|Space Grotesk|Geist)\b/i, msg: 'banned/over-used font — use the house faces (Hanken Grotesk / IBM Plex Mono)' },
  { id: 'no-em-dash', re: /—/, msg: 'em-dash in copy (AI tell) — use a comma, colon, or parentheses' },
  { id: 'no-middle-dot', re: /·/, msg: 'middle-dot separator (AI tell) — use a slash, comma, or restructure' },
  { id: 'no-transition-all', re: /\btransition-all\b/, msg: 'transition-all — animate transform/opacity or named properties only' },
  { id: 'no-arbitrary-text-size', re: /\btext-\[[0-9.]+(?:rem|px|em)\]/, msg: 'arbitrary font size — use a type role (text-h1 … text-body … text-caption … text-2xs)' },
];

const files = [];
function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (!IGNORE.has(e.name)) walk(p);
    } else if (EXT.has(extname(e.name))) {
      files.push(p);
    }
  }
}
for (const t of TARGETS) walk(t);

const violations = [];
for (const file of files) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const rule of RULES) {
      if (rule.re.test(line)) {
        violations.push({ file, line: i + 1, id: rule.id, msg: rule.msg, text: line.trim().slice(0, 96) });
      }
    }
  });
}

if (violations.length === 0) {
  console.log(`✓ lint:design — ${files.length} files clean. On-system.`);
  process.exit(0);
}
console.error(`✗ lint:design — ${violations.length} violation(s). UI is off-system:\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  [${v.id}]`);
  console.error(`    ${v.msg}`);
  console.error(`    > ${v.text}\n`);
}
console.error('Fix these to stay inside the OliveKit rules (see CLAUDE.md / docs/standards/anti-ai-patterns.md).');
process.exit(1);
