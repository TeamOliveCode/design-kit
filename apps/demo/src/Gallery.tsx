import { useEffect, useState, type ReactNode } from 'react';
import {
  Plus,
  Download,
  Trash2,
  Settings,
  Sun,
  Moon,
  Info,
  CheckCircle2,
  TriangleAlert,
  CircleX,
  Bell,
  SlidersHorizontal,
  Copy,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      <div className="rounded-xl border border-border bg-card p-6">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center">
      <span className="w-32 shrink-0 font-mono text-xs text-muted-foreground">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function Gallery() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-[1100px] items-center px-6">
            <span className="font-bold tracking-tight">
              OliveKit <span className="font-mono text-sm font-normal text-muted-foreground">/ components</span>
            </span>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setDark((v) => !v)} aria-label="Toggle theme">
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-[1100px] space-y-10 px-6 py-10">
          {/* Buttons */}
          <Section title="Button">
            <Row label="variant">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </Row>
            <Separator />
            <Row label="size">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Add">
                <Plus />
              </Button>
            </Row>
            <Separator />
            <Row label="state">
              <Button>
                <Download />
                With icon
              </Button>
              <Button loading>Saving</Button>
              <Button disabled>Disabled</Button>
            </Row>
          </Section>

          {/* Badge + status */}
          <Section title="Badge & status">
            <Row label="badge">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </Row>
            <Separator />
            <Row label="status">
              {[
                ['bg-primary', 'Running'],
                ['bg-success', 'Passed'],
                ['bg-muted-foreground/40', 'Queued'],
                ['bg-destructive', 'Failed'],
              ].map(([dot, label]) => (
                <span key={label} className="inline-flex items-center gap-2 text-sm">
                  <span className={`size-1.5 rounded-full ${dot}`} />
                  {label}
                </span>
              ))}
            </Row>
          </Section>

          {/* Form controls */}
          <Section title="Form controls">
            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="g-email">Email</Label>
                <Input id="g-email" type="email" placeholder="you@olivecode.dev" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="g-invalid">Invalid</Label>
                <Input id="g-invalid" aria-invalid defaultValue="not-an-email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="g-select">Model</Label>
                <Select defaultValue="opus">
                  <SelectTrigger id="g-select">
                    <SelectValue placeholder="Pick a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Anthropic</SelectLabel>
                      <SelectItem value="opus">Opus 4.8</SelectItem>
                      <SelectItem value="sonnet">Sonnet 4.6</SelectItem>
                      <SelectItem value="haiku">Haiku 4.5</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="g-note">Note</Label>
                <Textarea id="g-note" placeholder="Describe the experiment" />
              </div>
              <div className="space-y-3">
                <Label>Options</Label>
                <div className="flex items-center gap-2">
                  <Checkbox id="g-c1" defaultChecked />
                  <Label htmlFor="g-c1" className="font-normal">Enable caching</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="g-c2" />
                  <Label htmlFor="g-c2" className="font-normal">Notify on failure</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="g-sw" defaultChecked />
                  <Label htmlFor="g-sw" className="font-normal">Auto-retry</Label>
                </div>
              </div>
              <div className="space-y-3">
                <Label>Precision</Label>
                <RadioGroup defaultValue="bf16">
                  {[
                    ['fp32', 'Full (fp32)'],
                    ['bf16', 'Mixed (bf16)'],
                    ['int8', 'Quantized (int8)'],
                  ].map(([v, l]) => (
                    <div key={v} className="flex items-center gap-2">
                      <RadioGroupItem id={`g-${v}`} value={v} />
                      <Label htmlFor={`g-${v}`} className="font-normal">{l}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-3 sm:col-span-2">
                <Label>Temperature</Label>
                <Slider defaultValue={[60]} max={100} step={1} className="max-w-md" />
              </div>
            </div>
          </Section>

          {/* Overlays */}
          <Section title="Overlays">
            <Row label="dialog">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New experiment</DialogTitle>
                    <DialogDescription>Configure a run. You can change everything later.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <Label htmlFor="d-name">Name</Label>
                    <Input id="d-name" placeholder="retrieval-rerank ablation" />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button>Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <Trash2 />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this run?</AlertDialogTitle>
                    <AlertDialogDescription>This permanently removes the run and its artifacts.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Row>
            <Separator />
            <Row label="menu / popover">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Settings />
                    Options
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52">
                  <DropdownMenuLabel>Run</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Copy />
                    Duplicate
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuCheckboxItem checked>Pin to top</DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <Trash2 />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <SlidersHorizontal />
                    Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Filter runs</p>
                    <div className="flex items-center gap-2">
                      <Checkbox id="p-1" defaultChecked />
                      <Label htmlFor="p-1" className="font-normal">Running</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="p-2" />
                      <Label htmlFor="p-2" className="font-normal">Failed</Label>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Notifications">
                    <Bell />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>3 new alerts</TooltipContent>
              </Tooltip>
            </Row>
          </Section>

          {/* Tabs + Accordion */}
          <Section title="Tabs & Accordion">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="text-sm text-muted-foreground">
                A summary of the run, its owner, and current status.
              </TabsContent>
              <TabsContent value="metrics" className="text-sm text-muted-foreground">
                Loss curves and eval scores update live.
              </TabsContent>
              <TabsContent value="logs" className="text-sm text-muted-foreground">
                Streamed stdout and stderr.
              </TabsContent>
            </Tabs>
            <Separator className="my-5" />
            <Accordion type="single" collapsible defaultValue="a1">
              {[
                ['a1', 'What stacks does it support?', 'Anything that can read CSS variables: React, Vue, Svelte, and server-rendered apps.'],
                ['a2', 'Is it a dependency?', 'No. Components are copied into your repo, so you own and can edit the source.'],
                ['a3', 'How does theming work?', 'Semantic tokens swap on a single .dark class. No duplicated styles.'],
              ].map(([v, q, a]) => (
                <AccordionItem key={v} value={v}>
                  <AccordionTrigger>{q}</AccordionTrigger>
                  <AccordionContent>{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Section>

          {/* Feedback + data */}
          <Section title="Feedback & data">
            <div className="space-y-3">
              <Alert variant="info">
                <Info />
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>A new model version is available for this experiment.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <CheckCircle2 />
                <AlertTitle>Run passed</AlertTitle>
                <AlertDescription>All 136 eval cases completed without regressions.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <TriangleAlert />
                <AlertTitle>Queue is busy</AlertTitle>
                <AlertDescription>Expect about 3 minutes before this run starts.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <CircleX />
                <AlertTitle>Run failed</AlertTitle>
                <AlertDescription>The process exited with code 1 during evaluation.</AlertDescription>
              </Alert>
            </div>

            <Separator className="my-6" />

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <span className="font-mono text-xs text-muted-foreground">progress</span>
                <Progress value={32} />
                <Progress value={68} />
                <Progress value={94} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">avatar</span>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="" />
                    <AvatarFallback>JW</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>SH</AvatarFallback>
                  </Avatar>
                  <span className="font-mono text-xs text-muted-foreground">spinner</span>
                  <Spinner />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs text-muted-foreground">skeleton</span>
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3.5 w-2/3" />
                      <Skeleton className="h-3.5 w-1/3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </main>
      </div>
    </TooltipProvider>
  );
}
