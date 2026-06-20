// Verify WCAG contrast for every expression × mode, using real color math (culori), not estimates.
// AA: normal text 4.5:1, large text / UI components 3:1.
import { wcagContrast } from 'culori';
import { readFileSync } from 'node:fs';

const audit = JSON.parse(readFileSync('packages/tokens/dist/audit.json', 'utf8'));

const PAIRS = [
  ['primary-foreground', 'primary', 4.5, 'button label on primary'],
  ['foreground', 'background', 4.5, 'body on background'],
  ['muted-foreground', 'background', 4.5, 'muted text on background'],
  ['card-foreground', 'card', 4.5, 'text on card'],
  ['secondary-foreground', 'secondary', 4.5, 'secondary button'],
  ['accent-foreground', 'accent', 4.5, 'accent text'],
  ['destructive-foreground', 'destructive', 4.5, 'destructive button'],
  ['success-foreground', 'success', 4.5, 'success text'],
  ['foreground', 'card', 4.5, 'body on card'],
  ['primary', 'background', 3.0, 'accent on background (UI/large)'],
];

let fails = 0;
let checks = 0;
for (const [name, modes] of Object.entries(audit)) {
  for (const mode of ['light', 'dark']) {
    const t = modes[mode];
    if (!t) continue;
    for (const [fg, bg, min, label] of PAIRS) {
      if (!t[fg] || !t[bg]) continue;
      checks++;
      const ratio = wcagContrast(t[fg], t[bg]);
      if (ratio < min) {
        fails++;
        console.log(`  ✗ ${name}/${mode}  ${label}: ${ratio.toFixed(2)} < ${min}  (--${fg} on --${bg})`);
      }
    }
  }
}

if (fails === 0) {
  console.log(`✓ contrast — ${checks} pairs across all expressions meet WCAG AA.`);
} else {
  console.log(`\n${fails} contrast issue(s) of ${checks} checks. Darken the accent step or adjust the foreground.`);
  process.exit(1);
}
