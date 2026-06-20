import { useEffect, useState, type ReactNode } from 'react';
import {
  FlaskConical,
  Sun,
  Moon,
  Plus,
  Download,
  Trash2,
  Settings,
  Bell,
  Info,
  CheckCircle2,
  TriangleAlert,
  CircleX,
  Copy,
  SlidersHorizontal,
  Layers,
  Boxes,
  Terminal,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const OLIVE: [string, string][] = [
  ['50', 'oklch(0.975 0.025 128)'], ['100', 'oklch(0.950 0.052 128)'], ['200', 'oklch(0.912 0.092 128)'],
  ['300', 'oklch(0.875 0.135 128)'], ['400', 'oklch(0.832 0.170 128)'], ['500', 'oklch(0.785 0.188 128)'],
  ['600', 'oklch(0.700 0.172 128)'], ['700', 'oklch(0.585 0.142 128)'], ['800', 'oklch(0.480 0.114 128)'],
  ['900', 'oklch(0.390 0.090 128)'], ['950', 'oklch(0.270 0.060 128)'],
];
const INK: [string, string][] = [
  ['50', 'oklch(0.985 0.003 150)'], ['100', 'oklch(0.970 0.004 150)'], ['200', 'oklch(0.922 0.006 150)'],
  ['300', 'oklch(0.870 0.008 150)'], ['400', 'oklch(0.708 0.010 150)'], ['500', 'oklch(0.556 0.012 150)'],
  ['600', 'oklch(0.440 0.012 150)'], ['700', 'oklch(0.370 0.012 150)'], ['800', 'oklch(0.269 0.010 150)'],
  ['900', 'oklch(0.205 0.008 150)'], ['950', 'oklch(0.145 0.006 150)'],
];
const SEMANTIC = ['background', 'card', 'primary', 'secondary', 'muted', 'accent', 'border', 'success', 'warning', 'destructive'];
const TYPE_SCALE: [string, string][] = [
  ['display-2xl', 'text-display-2xl'], ['display-xl', 'text-display-xl'], ['display-lg', 'text-display-lg'],
  ['display-md', 'text-display-md'], ['display-sm', 'text-display-sm'],
];
const SLOP = ['purple gradients on white', 'em-dashes & middle-dots', 'Inter / Space Grotesk', 'colored stripe on cards', 'soft-tint pill spam', 'symmetric 3-card grids'];

function Block({ id, title, kicker, children }: { id: string; title: string; kicker: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 space-y-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{kicker}</p>
        <h2 className="mt-2 text-display-sm font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Panel({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 ${className}`}>
      <p className="mb-4 font-mono text-xs text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

export default function Overview() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
        <div className="grain-layer" aria-hidden />
        <div className="relative z-10">
          {/* Bar */}
          <header className="sticky top-0 z-20 border-b border-border bg-background/70 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-[1080px] items-center gap-3 px-6">
              <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
                <FlaskConical className="size-4" />
              </span>
              <span className="font-bold tracking-tight">
                OliveKit <span className="font-mono text-sm font-normal text-muted-foreground">/ system</span>
              </span>
              <nav className="ml-6 hidden items-center gap-5 text-sm text-muted-foreground md:flex">
                <a href="#foundations" className="transition-colors hover:text-foreground">Foundations</a>
                <a href="#components" className="transition-colors hover:text-foreground">Components</a>
                <a href="#surfaces" className="transition-colors hover:text-foreground">Surfaces</a>
                <a href="#architecture" className="transition-colors hover:text-foreground">Architecture</a>
              </nav>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setDark((v) => !v)} aria-label="Toggle theme">
                {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
            </div>
          </header>

          {/* Hero */}
          <section className="relative border-b border-border">
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(38% 60% at 78% 30%, oklch(0.785 0.188 128 / 0.18), transparent 70%)' }} />
            <div className="relative mx-auto max-w-[1080px] px-6 py-16">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">olivekit / lab instrument</p>
              <h1 className="mt-4 max-w-3xl text-display-lg font-extrabold tracking-tight sm:text-display-xl">
                One design system. Every surface. Never AI slop.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                A token-driven, Claude Code-native kit. One source of truth compiles to every stack, and the agent applies
                the house look the same way every time.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {['DTCG tokens', 'Radix + Tailwind v4', 'dark-first', 'electric olive', '24 components', '4 standards'].map((t) => (
                  <span key={t} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          </section>

          <main className="mx-auto max-w-[1080px] space-y-16 px-6 py-16">
            {/* FOUNDATIONS */}
            <Block id="foundations" kicker="01 / Foundations" title="Tokens are the contract">
              <div className="grid gap-4 lg:grid-cols-2">
                <Panel label="brand / electric lime-olive (oklch, hue 128)">
                  <div className="flex gap-1">
                    {OLIVE.map(([k, v]) => (
                      <div key={k} className="flex-1">
                        <div className="h-12 rounded" style={{ background: v }} />
                        <p className="mt-1 text-center font-mono text-[0.6rem] text-muted-foreground">{k}</p>
                      </div>
                    ))}
                  </div>
                </Panel>
                <Panel label="neutral / ink (green-tinted, hue 150)">
                  <div className="flex gap-1">
                    {INK.map(([k, v]) => (
                      <div key={k} className="flex-1">
                        <div className="h-12 rounded border border-border/50" style={{ background: v }} />
                        <p className="mt-1 text-center font-mono text-[0.6rem] text-muted-foreground">{k}</p>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
              <Panel label="semantic roles / swap on .dark, components reference only these">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {SEMANTIC.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <span className="size-6 shrink-0 rounded border border-border" style={{ background: `var(--${s})` }} />
                      <span className="font-mono text-xs text-muted-foreground">{s}</span>
                    </div>
                  ))}
                </div>
              </Panel>
              <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                <Panel label="type scale / Hanken Grotesk (display) + IBM Plex Mono (data)">
                  <div className="space-y-3">
                    {TYPE_SCALE.map(([name, cls]) => (
                      <div key={name} className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2 last:border-0">
                        <span className={`${cls} font-bold leading-none`}>Ag</span>
                        <span className="font-mono text-xs text-muted-foreground">{name}</span>
                      </div>
                    ))}
                    <p className="pt-1 text-sm text-muted-foreground">Body, the quick brown fox. <span className="font-mono">mono 0123 / IDs / metrics</span></p>
                  </div>
                </Panel>
                <div className="grid gap-4">
                  <Panel label="radius">
                    <div className="flex items-end gap-3">
                      {[['sm', 'rounded-sm'], ['md', 'rounded-md'], ['lg', 'rounded-lg'], ['xl', 'rounded-xl']].map(([k, c]) => (
                        <div key={k} className="text-center">
                          <div className={`size-12 border border-primary/50 bg-primary/10 ${c}`} />
                          <p className="mt-1 font-mono text-[0.6rem] text-muted-foreground">{k}</p>
                        </div>
                      ))}
                    </div>
                  </Panel>
                  <Panel label="elevation / motion">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg border border-border bg-card px-4 py-3 text-xs shadow-card">shadow-card</div>
                      <span className="font-mono text-xs text-muted-foreground">ease-brand<br />120–250ms</span>
                    </div>
                  </Panel>
                </div>
              </div>
            </Block>

            {/* COMPONENTS */}
            <Block id="components" kicker="02 / Components" title="24 components, built on Radix">
              <Panel label="button / variant / size / state">
                <div className="flex flex-wrap items-center gap-3">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Separator orientation="vertical" className="h-7" />
                  <Button size="sm">sm</Button>
                  <Button size="icon" aria-label="Add"><Plus /></Button>
                  <Button loading>Saving</Button>
                  <Button disabled>Disabled</Button>
                  <Button><Download />With icon</Button>
                </div>
              </Panel>

              <div className="grid gap-4 lg:grid-cols-2">
                <Panel label="badge / status">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    {[['bg-primary', 'Running'], ['bg-success', 'Passed'], ['bg-muted-foreground/40', 'Queued'], ['bg-destructive', 'Failed']].map(([d, l]) => (
                      <span key={l} className="inline-flex items-center gap-2 text-sm"><span className={`size-1.5 rounded-full ${d}`} />{l}</span>
                    ))}
                  </div>
                </Panel>
                <Panel label="overlays / dialog / menu / popover / tooltip">
                  <div className="flex flex-wrap items-center gap-3">
                    <Dialog>
                      <DialogTrigger asChild><Button variant="outline">Dialog</Button></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>New experiment</DialogTitle>
                          <DialogDescription>Configure a run. Change everything later.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2"><Label htmlFor="o-n">Name</Label><Input id="o-n" placeholder="retrieval-rerank" /></div>
                        <DialogFooter>
                          <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                          <Button>Create</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="outline"><Settings />Menu</Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Run</DropdownMenuLabel>
                        <DropdownMenuItem><Copy />Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive"><Trash2 />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Popover>
                      <PopoverTrigger asChild><Button variant="outline"><SlidersHorizontal />Popover</Button></PopoverTrigger>
                      <PopoverContent align="start"><p className="text-sm">Floating content, anchored and dismissible.</p></PopoverContent>
                    </Popover>
                    <Tooltip>
                      <TooltipTrigger asChild><Button variant="outline" size="icon" aria-label="Alerts"><Bell /></Button></TooltipTrigger>
                      <TooltipContent>3 new alerts</TooltipContent>
                    </Tooltip>
                  </div>
                </Panel>
              </div>

              <Panel label="form controls">
                <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2"><Label htmlFor="o-e">Email</Label><Input id="o-e" placeholder="you@olivecode.dev" /></div>
                  <div className="space-y-2"><Label htmlFor="o-m">Model</Label>
                    <Select defaultValue="opus">
                      <SelectTrigger id="o-m"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="opus">Opus 4.8</SelectItem>
                        <SelectItem value="sonnet">Sonnet 4.6</SelectItem>
                        <SelectItem value="haiku">Haiku 4.5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label htmlFor="o-t">Note</Label><Textarea id="o-t" className="min-h-9" placeholder="Describe the run" /></div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2"><Checkbox id="o-c" defaultChecked /><Label htmlFor="o-c" className="font-normal">Enable caching</Label></div>
                    <div className="flex items-center gap-3"><Switch id="o-s" defaultChecked /><Label htmlFor="o-s" className="font-normal">Auto-retry</Label></div>
                  </div>
                  <RadioGroup defaultValue="bf16" className="gap-2">
                    {[['fp32', 'Full'], ['bf16', 'Mixed'], ['int8', 'Quantized']].map(([v, l]) => (
                      <div key={v} className="flex items-center gap-2"><RadioGroupItem id={`o-${v}`} value={v} /><Label htmlFor={`o-${v}`} className="font-normal">{l}</Label></div>
                    ))}
                  </RadioGroup>
                  <div className="space-y-3"><Label>Temperature</Label><Slider defaultValue={[60]} max={100} /></div>
                </div>
              </Panel>

              <div className="grid gap-4 lg:grid-cols-2">
                <Panel label="tabs / accordion">
                  <Tabs defaultValue="ov">
                    <TabsList>
                      <TabsTrigger value="ov">Overview</TabsTrigger>
                      <TabsTrigger value="me">Metrics</TabsTrigger>
                      <TabsTrigger value="lo">Logs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ov" className="text-sm text-muted-foreground">Summary of the run and its status.</TabsContent>
                    <TabsContent value="me" className="text-sm text-muted-foreground">Loss curves and eval scores.</TabsContent>
                    <TabsContent value="lo" className="text-sm text-muted-foreground">Streamed stdout and stderr.</TabsContent>
                  </Tabs>
                  <Accordion type="single" collapsible defaultValue="x" className="mt-4">
                    <AccordionItem value="x"><AccordionTrigger>Which stacks are supported?</AccordionTrigger><AccordionContent>Anything that reads CSS variables.</AccordionContent></AccordionItem>
                    <AccordionItem value="y" className="border-0"><AccordionTrigger>Is it a dependency?</AccordionTrigger><AccordionContent>No, the source is copied into your repo.</AccordionContent></AccordionItem>
                  </Accordion>
                </Panel>
                <Panel label="feedback / data">
                  <div className="space-y-2.5">
                    <Alert variant="info"><Info /><AlertTitle>Heads up</AlertTitle><AlertDescription>A new model version is available.</AlertDescription></Alert>
                    <Alert variant="success"><CheckCircle2 /><AlertTitle>Run passed</AlertTitle><AlertDescription>136 cases, no regressions.</AlertDescription></Alert>
                  </div>
                  <div className="mt-4 space-y-3">
                    <Progress value={68} />
                    <div className="flex items-center gap-3">
                      <Avatar><AvatarFallback>JW</AvatarFallback></Avatar>
                      <Spinner />
                      <Skeleton className="h-3.5 flex-1" />
                      <TriangleAlert className="size-4 text-warning" />
                      <CircleX className="size-4 text-destructive" />
                    </div>
                  </div>
                </Panel>
              </div>
            </Block>

            {/* SURFACES */}
            <Block id="surfaces" kicker="03 / Surfaces" title="Same tokens, different standards">
              <div className="grid gap-4 lg:grid-cols-2">
                {/* App console mock */}
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                    <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground"><span className="size-2 rounded-full bg-primary" />App / Product UI</span>
                    <span className="font-mono text-[0.65rem] text-muted-foreground">dense / dark</span>
                  </div>
                  <div className="divide-y divide-border">
                    {[['retrieval-rerank ablation', 'bg-primary', 'Running'], ['long-context recall sweep', 'bg-success', 'Passed'], ['speculative decode latency', 'bg-destructive', 'Failed']].map(([n, d, s]) => (
                      <div key={n} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                        <span className={`size-1.5 rounded-full ${d}`} /><span className="flex-1 truncate">{n}</span>
                        <span className="font-mono text-xs text-muted-foreground">{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3"><a href="#/app" className="font-mono text-xs text-primary">open #/app →</a></div>
                </div>
                {/* Landing mock */}
                <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
                  <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(50% 60% at 80% 20%, oklch(0.785 0.188 128 / 0.16), transparent 70%)' }} />
                  <div className="relative">
                    <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground"><span className="size-2 rounded-full bg-primary" />Landing / Marketing<span className="ml-auto font-mono text-[0.65rem]">airy / expressive</span></span>
                    <p className="mt-5 text-display-sm font-extrabold leading-tight">Ship one house look.</p>
                    <p className="mt-2 text-sm text-muted-foreground">Big type, generous space, one signature.</p>
                    <div className="mt-4"><a href="#/landing"><Button size="sm">open #/landing<ArrowRight className="size-4" /></Button></a></div>
                  </div>
                </div>
              </div>
            </Block>

            {/* NEVER SLOP */}
            <Block id="slop" kicker="04 / Standard" title="It never ships AI slop">
              <div className="grid gap-4 lg:grid-cols-2">
                <Panel label="banned tells / enforced by the Claude Code layer">
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {SLOP.map((s) => (
                      <li key={s} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <span className="grid size-4 place-items-center rounded-full border border-border text-[0.6rem]">✕</span>
                        <span className="line-through decoration-border">{s}</span>
                      </li>
                    ))}
                  </ul>
                </Panel>
                <Panel label="our move instead" className="bg-primary/[0.06]">
                  <ul className="space-y-2 text-sm">
                    {['one signature device (grain + glow)', 'electric olive, used with restraint', 'product shown as itself', 'mono spec labels, not sans caps', 'dot + text status, not pills'].map((s) => (
                      <li key={s} className="flex items-center gap-2.5">
                        <span className="grid size-4 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-2.5" /></span>{s}
                      </li>
                    ))}
                  </ul>
                </Panel>
              </div>
            </Block>

            {/* ARCHITECTURE */}
            <Block id="architecture" kicker="05 / Architecture" title="Three layers, one system">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { tag: 'Tokens', icon: Layers, body: 'DTCG source → CSS vars / Tailwind / JSON. Every stack reads the same contract.', code: 'tokens.json' },
                  { tag: 'Adapters', icon: Boxes, body: 'A private shadcn registry copies owned components into each repo.', code: 'shadcn add @olivekit/*' },
                  { tag: 'Claude Code', icon: Terminal, body: 'CLAUDE.md + forked skill + MCP make the agent enforce the house style.', code: 'CLAUDE.md / skill / mcp' },
                ].map((l) => (
                  <div key={l.tag} className="flex flex-col rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-md bg-secondary"><l.icon className="size-4.5" /></span>
                      <span className="font-mono text-xs uppercase tracking-wider text-primary">{l.tag}</span>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
                    <div className="mt-4 rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">{l.code}</div>
                  </div>
                ))}
              </div>
            </Block>
          </main>

          <footer className="border-t border-border">
            <div className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-6 text-sm text-muted-foreground">
              <span>olivecode labs / OliveKit</span>
              <span className="font-mono text-xs">one source, every surface</span>
            </div>
          </footer>
        </div>
      </div>
    </TooltipProvider>
  );
}
