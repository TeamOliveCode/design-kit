// Convert physical-direction Tailwind utilities to logical ones, so components mirror under dir="rtl".
// Logical properties equal physical ones in LTR, so LTR rendering is byte-for-byte unchanged; only RTL flips.
// Strict boundaries (class-token start + a size/quote lookahead) keep prose like "left-hand" untouched.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'apps/demo/src/components/ui';
const B = "(?<=[\\s\"'`:{(])"; // a class token starts after space, quote, backtick, colon (variant), { or (
const E = "(?=[\\s\"'`])"; // and ends before space/quote/backtick
const SIZE = "(?=[\\d\\[]|auto|px|full|screen)";

const RULES = [
  [B + 'pl-' + SIZE, 'ps-'],
  [B + 'pr-' + SIZE, 'pe-'],
  [B + 'ml-' + SIZE, 'ms-'],
  [B + 'mr-' + SIZE, 'me-'],
  [B + 'left-' + SIZE, 'start-'],
  [B + 'right-' + SIZE, 'end-'],
  [B + '-left-(?=[\\d\\[])', '-start-'],
  [B + '-right-(?=[\\d\\[])', '-end-'],
  [B + 'text-left' + E, 'text-start'],
  [B + 'text-right' + E, 'text-end'],
  [B + 'border-l' + E, 'border-s'],
  [B + 'border-r' + E, 'border-e'],
  [B + 'rounded-tl(?=-|[\\s"\'`])', 'rounded-ss'],
  [B + 'rounded-tr(?=-|[\\s"\'`])', 'rounded-se'],
  [B + 'rounded-bl(?=-|[\\s"\'`])', 'rounded-es'],
  [B + 'rounded-br(?=-|[\\s"\'`])', 'rounded-ee'],
  [B + 'rounded-l(?=-|[\\s"\'`])', 'rounded-s'],
  [B + 'rounded-r(?=-|[\\s"\'`])', 'rounded-e'],
];

let edits = 0;
const touched = [];
for (const f of readdirSync(DIR).filter((n) => n.endsWith('.tsx'))) {
  const p = join(DIR, f);
  let src = readFileSync(p, 'utf8');
  const before = src;
  for (const [pat, to] of RULES) src = src.replace(new RegExp(pat, 'g'), () => (edits++, to));
  if (src !== before) {
    writeFileSync(p, src);
    touched.push(f);
  }
}
console.log(`RTL codemod: ${edits} replacements across ${touched.length} files.`);
console.log(touched.join(', '));
