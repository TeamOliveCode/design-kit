import { useEffect, useState } from 'react';
import {
  FlaskConical,
  Search,
  Plus,
  Command,
  Sun,
  Moon,
  ArrowUpRight,
  GitBranch,
  Cpu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

type Status = 'running' | 'queued' | 'passed' | 'failed';

const STATUS: Record<Status, { label: string; dot: string; text: string }> = {
  running: { label: 'Running', dot: 'bg-primary', text: 'text-foreground' },
  queued: { label: 'Queued', dot: 'bg-muted-foreground/40', text: 'text-muted-foreground' },
  passed: { label: 'Passed', dot: 'bg-success', text: 'text-foreground' },
  failed: { label: 'Failed', dot: 'bg-destructive', text: 'text-destructive' },
};

const RUNS: {
  id: string;
  name: string;
  status: Status;
  owner: string;
  model: string;
  duration: string;
  started: string;
}[] = [
  { id: 'exp_8f2a1c', name: 'retrieval-rerank ablation', status: 'running', owner: 'jiwon', model: 'opus-4.8', duration: '04:12', started: '2m ago' },
  { id: 'exp_8f2998', name: 'tokenizer-merge (kr corpus)', status: 'running', owner: 'sangho', model: 'haiku-4.5', duration: '11:48', started: '14m ago' },
  { id: 'exp_8f2a02', name: 'eval harness v3 regression', status: 'queued', owner: 'mina', model: 'sonnet-4.6', duration: '', started: 'queued' },
  { id: 'exp_8f28d4', name: 'long-context recall sweep', status: 'passed', owner: 'jiwon', model: 'opus-4.8', duration: '38:20', started: '1h ago' },
  { id: 'exp_8f2871', name: 'prompt cache hit-rate study', status: 'passed', owner: 'doyun', model: 'sonnet-4.6', duration: '06:55', started: '3h ago' },
  { id: 'exp_8f27ff', name: 'speculative decode latency', status: 'failed', owner: 'sangho', model: 'haiku-4.5', duration: '02:03', started: '5h ago' },
];

const STATS: { label: string; value: string; sub: string; highlight?: boolean }[] = [
  { label: 'Active runs', value: '2', sub: 'of 12 today', highlight: true },
  { label: 'Queue depth', value: '1', sub: 'about 3 min wait' },
  { label: 'GPU-hours today', value: '47.2', sub: '12% over average' },
  { label: 'Pass rate (7d)', value: '94.1%', sub: '128 of 136' },
];

const NAV = ['Experiments', 'Datasets', 'Models', 'Runs'];

export default function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState('Experiments');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1180px] items-center gap-6 px-6">
          <a href="#" className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
              <FlaskConical className="size-4" />
            </span>
            <span className="text-[0.95rem] font-bold tracking-tight">
              olivecode
              <span className="font-mono text-sm font-medium text-muted-foreground">/labs</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={cn(
                  'relative rounded-md px-2.5 py-1.5 text-sm transition-colors',
                  active === item ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item}
                {active === item && (
                  <span className="absolute inset-x-2.5 -bottom-[11px] h-0.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </nav>

          <div className="relative ml-auto hidden w-64 items-center lg:flex">
            <Search className="pointer-events-none absolute left-2.5 size-4 text-muted-foreground" />
            <Input placeholder="Search experiments" className="pl-8.5 pr-12" />
            <kbd className="pointer-events-none absolute right-2 flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
              <Command className="size-3" />K
            </kbd>
          </div>

          <Button variant="ghost" size="icon" onClick={() => setDark((v) => !v)} aria-label="Toggle theme">
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <span className="grid size-7 place-items-center rounded-full bg-secondary font-mono text-xs font-semibold text-secondary-foreground">
            JW
          </span>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto max-w-[1180px] px-6 py-8">
        {/* Page header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight">Experiments</h1>
            <p className="text-sm text-muted-foreground">
              Training and eval runs across the lab. Live status, owners, and outcomes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <GitBranch className="size-4" />
              main
            </Button>
            <Button size="sm">
              <Plus className="size-4" />
              New experiment
            </Button>
          </div>
        </div>

        {/* Stat strip, one panel divided by hairlines, not four templated cards */}
        <Card className="mt-6 overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  'p-4',
                  i % 2 === 1 && 'border-l border-border',
                  i >= 2 && 'border-t border-border sm:border-t-0',
                  i !== 0 && i !== 2 && 'sm:border-l',
                  i === 2 && 'sm:border-l',
                )}
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </p>
                <p
                  className={cn(
                    'mt-2 font-mono text-2xl font-semibold tabular-nums tracking-tight',
                    s.highlight && 'text-primary',
                  )}
                >
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Two-column */}
        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_320px]">
          {/* Runs table */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Recent runs</CardTitle>
                <CardDescription>Updated continuously</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View all
                <ArrowUpRight className="size-4" />
              </Button>
            </CardHeader>
            <Separator />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-2.5 font-medium">Run</th>
                    <th className="px-3 py-2.5 font-medium">Status</th>
                    <th className="hidden px-3 py-2.5 font-medium sm:table-cell">Owner</th>
                    <th className="hidden px-3 py-2.5 font-medium md:table-cell">Model</th>
                    <th className="px-3 py-2.5 text-right font-medium">Duration</th>
                    <th className="hidden px-5 py-2.5 text-right font-medium lg:table-cell">Started</th>
                  </tr>
                </thead>
                <tbody>
                  {RUNS.map((r) => (
                    <tr key={r.id} className="border-t border-border transition-colors hover:bg-muted/40">
                      <td className="px-5 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium leading-tight">{r.name}</span>
                          <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center gap-2">
                          <span className={cn('size-1.5 rounded-full', STATUS[r.status].dot)} />
                          <span className={cn('text-sm', STATUS[r.status].text)}>
                            {STATUS[r.status].label}
                          </span>
                        </span>
                      </td>
                      <td className="hidden px-3 py-3 text-muted-foreground sm:table-cell">{r.owner}</td>
                      <td className="hidden px-3 py-3 md:table-cell">
                        <span className="font-mono text-xs text-muted-foreground">{r.model}</span>
                      </td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-muted-foreground">
                        {r.duration}
                      </td>
                      <td className="hidden px-5 py-3 text-right font-mono text-xs text-muted-foreground lg:table-cell">
                        {r.started}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Side rail */}
          <div className="space-y-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Live</CardTitle>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                    </span>
                    2 active
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  ['retrieval-rerank', 68],
                  ['tokenizer-merge', 41],
                ].map(([name, pct]) => (
                  <div key={name as string}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Cpu className="size-4 text-muted-foreground" />
                        {name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>This week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  ['Runs completed', '136'],
                  ['Avg duration', '12:40'],
                  ['Compute spend', '$2,418'],
                  ['Datasets touched', '9'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-mono tabular-nums">{v}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
