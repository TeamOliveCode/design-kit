import { useEffect } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const EXPRESSIONS = [
  { cls: 'expr-instrument-dark', name: 'Instrument', sub: 'utility / SaaS, dark, electric olive', head: 'Ship the system' },
  { cls: 'expr-warm', name: 'Warm', sub: 'consumer / expressive, light, coral', head: 'Build something people love' },
  { cls: 'expr-editorial', name: 'Editorial', sub: 'content / magazine, serif, claret', head: 'The long read' },
];

function Panel({ cls, name, sub, head }: { cls: string; name: string; sub: string; head: string }) {
  return (
    <div className={`${cls} overflow-hidden rounded-2xl border border-border bg-background text-foreground`}>
      <div className="border-b border-border p-5">
        <p className="font-mono text-2xs uppercase tracking-widest text-primary">{name}</p>
        <h3 className="mt-2 font-display text-display-sm font-bold">{head}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
      </div>
      <div className="space-y-5 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">
            Get started
            <ArrowRight className="size-4" />
          </Button>
          <Button size="sm" variant="outline">Docs</Button>
          <Button size="sm" variant="ghost">Skip</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8.5" />
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
          <p className="font-display text-h4 font-semibold">Aa 가나다 0123</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The quick brown fox jumps over the lazy dog. 다람쥐 헌 쳇바퀴에 타고파.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {[['bg-primary', 'Running'], ['bg-success', 'Passed'], ['bg-destructive', 'Failed']].map(([d, l]) => (
            <span key={l} className="inline-flex items-center gap-2">
              <span className={`size-1.5 rounded-full ${d}`} />
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Expressions() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1180px] px-6 py-12">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">olivekit / expressions</p>
        <h1 className="mt-3 text-display-md font-extrabold tracking-tight">Same components, three souls</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          One token architecture, one set of components. An expression swaps the palette, type, radius, and density.
          Pick one per project; the components never change. Korean renders in Pretendard everywhere.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {EXPRESSIONS.map((e) => (
            <Panel key={e.name} {...e} />
          ))}
        </div>
      </div>
    </div>
  );
}
