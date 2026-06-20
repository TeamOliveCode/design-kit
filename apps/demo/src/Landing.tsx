import { useEffect, type ReactNode } from 'react';
import {
  FlaskConical,
  ArrowRight,
  ArrowUpRight,
  Github,
  Layers,
  Boxes,
  Terminal,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container, Section, Eyebrow } from '@/components/marketing/primitives';

const NAV = ['Product', 'Docs', 'Pricing', 'Changelog'];

const SLOP = ['purple gradients on white', 'em-dashes and middle-dots', 'Inter on everything', 'a colored strip on every card'];

const RUNS: { name: string; status: 'running' | 'passed' | 'failed'; dur: string }[] = [
  { name: 'retrieval-rerank ablation', status: 'running', dur: '04:12' },
  { name: 'long-context recall sweep', status: 'passed', dur: '38:20' },
  { name: 'speculative decode latency', status: 'failed', dur: '02:03' },
];

const STATUS = {
  running: { label: 'Running', dot: 'bg-primary', text: 'text-foreground' },
  passed: { label: 'Passed', dot: 'bg-success', text: 'text-muted-foreground' },
  failed: { label: 'Failed', dot: 'bg-destructive', text: 'text-destructive' },
};

const LAYERS = [
  { tag: 'Tokens', icon: Layers, title: 'One token source, every stack', body: 'A single DTCG file compiles to CSS variables, a Tailwind theme, and JSON. React, Vue, server-rendered, or Python read the same contract.', code: 'tokens.json  ->  css / tailwind / json' },
  { tag: 'Adapters', icon: Boxes, title: 'Components you own, not import', body: 'A private registry copies source into each repo. No version lock, no runtime dependency. Edit anything; it is your code.', code: 'npx shadcn add @olivekit/button' },
  { tag: 'Claude Code', icon: Terminal, title: 'The house style, enforced', body: 'Rules, a forked design skill, and an MCP registry give the agent the system as context, so it builds on-brand and self-checks for AI tells.', code: 'CLAUDE.md / skill / mcp' },
];

export default function Landing() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="grain-layer" aria-hidden />
      <div className="relative z-10">
        {/* Marketing nav */}
        <header className="sticky top-0 z-20 border-b border-border bg-background/70 backdrop-blur">
          <Container className="flex h-16 items-center gap-8">
            <a href="#/landing" className="flex items-center gap-2.5">
              <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
                <FlaskConical className="size-4" />
              </span>
              <span className="text-base font-bold tracking-tight">OliveKit</span>
            </a>
            <nav className="hidden items-center gap-7 md:flex">
              {NAV.map((item) => (
                <a key={item} href="#/landing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item}
                </a>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hidden text-muted-foreground sm:inline-flex">
                <Github className="size-4" />
                <span className="font-mono text-xs">3.2k</span>
              </Button>
              <a href="#/app">
                <Button size="sm">
                  Get started
                  <ArrowRight className="size-4" />
                </Button>
              </a>
            </div>
          </Container>
        </header>

        {/* Hero */}
        <Section className="pt-16 sm:pt-20">
          <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Eyebrow>Design system for agents</Eyebrow>
              <h1 className="mt-5 text-display-lg font-extrabold sm:text-display-xl lg:text-display-2xl">
                One house look across every service your agents build.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                OliveKit gives Claude Code a single source of truth for color, type, and components, so
                every app it ships looks deliberate and consistent, never like template output.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#/app">
                  <Button size="lg">
                    Get started
                    <ArrowRight className="size-4" />
                  </Button>
                </a>
                <a href="#/gallery">
                  <Button size="lg" variant="outline">
                    See the components
                    <ArrowUpRight className="size-4" />
                  </Button>
                </a>
              </div>
              <div className="mt-7 inline-flex items-center gap-3 rounded-md border border-border bg-card px-3.5 py-2 font-mono text-sm text-muted-foreground">
                <span className="text-primary">$</span>
                npx olivekit init
              </div>
            </div>

            {/* Signature: product-as-hero, lit by an olive glow */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-12 -top-20 bottom-0"
                style={{ background: 'radial-gradient(46% 42% at 62% 30%, oklch(0.785 0.188 128 / 0.28), transparent 72%)' }}
              />
              <div className="relative rounded-xl border border-border bg-card/80 shadow-card backdrop-blur">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <span className="grid size-4 place-items-center rounded bg-primary text-primary-foreground">
                      <FlaskConical className="size-2.5" />
                    </span>
                    olivecode/labs
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                    </span>
                    live
                  </span>
                </div>
                <div className="divide-y divide-border">
                  {RUNS.map((r) => (
                    <div key={r.name} className="flex items-center gap-3 px-4 py-3">
                      <span className={`size-1.5 shrink-0 rounded-full ${STATUS[r.status].dot}`} />
                      <span className="flex-1 truncate text-sm">{r.name}</span>
                      <span className={`text-sm ${STATUS[r.status].text}`}>{STATUS[r.status].label}</span>
                      <span className="w-12 text-right font-mono text-xs tabular-nums text-muted-foreground">{r.dur}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                    <span>retrieval-rerank</span>
                    <span>68%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[68%] rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Proof */}
        <Container>
          <div className="flex flex-col items-center gap-5 border-y border-border py-8 sm:flex-row sm:justify-between">
            <p className="text-sm text-muted-foreground">Standardizing UI across the lab</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm font-medium text-muted-foreground/80">
              <span>console</span>
              <span>atlas</span>
              <span>harbor</span>
              <span>pinboard</span>
              <span>relay</span>
            </div>
          </div>
        </Container>

        {/* Features, intentional bento, not a symmetric three-card grid */}
        <Section>
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Why it holds together</Eyebrow>
              <h2 className="mt-4 text-display-md font-bold">A contract, not a coat of paint</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The look is decided once and compiled everywhere. Services inherit it; they do not redesign it.
              </p>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-6">
              <FeatureCard className="lg:col-span-4" icon={Layers} title="One source, every framework" body="Author tokens once. Compile to CSS variables for anything, a Tailwind v4 theme for React and Vue, and JSON for native, the same decisions, everywhere they render.">
                <div className="mt-5 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                  {['React', 'Vue', 'Svelte', 'Rails', 'Django', 'Streamlit'].map((s) => (
                    <span key={s} className="rounded-md border border-border px-2 py-1">{s}</span>
                  ))}
                </div>
              </FeatureCard>
              <FeatureCard className="lg:col-span-2" icon={Boxes} title="You own the code" body="Components are copied in through a private registry, no runtime dependency, no version lock." />
              <FeatureCard className="lg:col-span-2" icon={ArrowUpRight} title="Light and dark, one class" body="Semantic tokens swap on a single .dark toggle. No duplicated styles." />
              <FeatureCard className="lg:col-span-4" icon={Check} title="It never ships AI slop" body="Claude Code gets the house rules as context and self-checks against the tells that make UI look machine-made.">
                <ul className="mt-5 space-y-2 text-sm">
                  {SLOP.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 text-muted-foreground">
                      <span className="grid size-4 place-items-center rounded-full border border-border text-2xs text-muted-foreground">✕</span>
                      <span className="line-through decoration-border">{s}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2.5 font-medium text-foreground">
                    <span className="grid size-4 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-2.5" />
                    </span>
                    your house look, every time
                  </li>
                </ul>
              </FeatureCard>
            </div>
          </Container>
        </Section>

        {/* Architecture */}
        <Section muted>
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>How it is built</Eyebrow>
              <h2 className="mt-4 text-display-md font-bold">Three layers, one system</h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {LAYERS.map((l, i) => (
                <div key={l.tag} className={`flex flex-col rounded-xl border border-border bg-card p-6 ${i === 0 ? 'md:row-span-1' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-md bg-secondary text-foreground">
                      <l.icon className="size-4.5" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-primary">{l.tag}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{l.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
                  <div className="mt-5 rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">{l.code}</div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section>
          <Container>
            <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 shadow-card sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(40% 80% at 88% 50%, oklch(0.785 0.188 128 / 0.16), transparent 70%)' }}
              />
              <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-display-sm font-bold tracking-tight">Give every project the same backbone.</h2>
                  <p className="mt-2 text-muted-foreground">Wire it into Claude Code once. Stay consistent forever.</p>
                </div>
                <a href="#/app" className="shrink-0">
                  <Button size="lg">
                    Get started
                    <ArrowRight className="size-4" />
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </Section>

        {/* Footer */}
        <footer className="border-t border-border">
          <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <a href="#/landing" className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
                  <FlaskConical className="size-4" />
                </span>
                <span className="font-bold tracking-tight">OliveKit</span>
              </a>
              <p className="max-w-[16rem] text-sm text-muted-foreground">The design system your agents build with.</p>
            </div>
            {[
              ['Product', ['Components', 'Tokens', 'Templates', 'Changelog']],
              ['Resources', ['Docs', 'Registry', 'MCP server', 'GitHub']],
              ['Lab', ['About', 'Standards', 'Contact']],
            ].map(([title, links]) => (
              <div key={title as string}>
                <p className="text-sm font-semibold">{title}</p>
                <ul className="mt-3 space-y-2.5">
                  {(links as string[]).map((l) => (
                    <li key={l}>
                      <a href="#/landing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Container>
          <Container className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row">
            <span>olivecode labs</span>
            <span className="font-mono text-xs">built with OliveKit</span>
          </Container>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ className, icon: Icon, title, body, children }: { className?: string; icon: typeof Layers; title: string; body: string; children?: ReactNode }) {
  return (
    <div className={`flex flex-col rounded-xl border border-border bg-card p-6 ${className ?? ''}`}>
      <span className="grid size-9 place-items-center rounded-md bg-secondary text-foreground">
        <Icon className="size-4.5" />
      </span>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
      {children}
    </div>
  );
}
