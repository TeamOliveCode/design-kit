import * as React from 'react';
import { cn } from '@/lib/utils';

// Layout primitives make composition deterministic: reach for these instead of ad-hoc flex/grid,
// and pass a gap from the spacing scale rather than arbitrary margins. See docs/standards/composition.md.

const GAP: Record<number, string> = {
  0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4',
  5: 'gap-5', 6: 'gap-6', 8: 'gap-8', 10: 'gap-10', 12: 'gap-12', 16: 'gap-16',
};
const COLS: Record<number, string> = {
  1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6', 12: 'grid-cols-12',
};
const MAXW = {
  app: 'max-w-[1180px]',
  landing: 'max-w-[1140px]',
  reading: 'max-w-[720px]',
  prose: 'max-w-prose',
} as const;

export function Container({
  size = 'app',
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: keyof typeof MAXW }) {
  return <div className={cn('mx-auto w-full px-6', MAXW[size], className)} {...props} />;
}

/** Vertical rhythm. */
export function Stack({ gap = 4, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { gap?: keyof typeof GAP }) {
  return <div className={cn('flex flex-col', GAP[gap], className)} {...props} />;
}

/** Horizontal group that wraps. */
export function Cluster({ gap = 3, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { gap?: keyof typeof GAP }) {
  return <div className={cn('flex flex-wrap items-center', GAP[gap], className)} {...props} />;
}

export function Grid({
  cols = 3,
  gap = 4,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { cols?: keyof typeof COLS; gap?: keyof typeof GAP }) {
  return <div className={cn('grid', COLS[cols], GAP[gap], className)} {...props} />;
}

/** Pushes siblings apart in a flex row/column. */
export function Spacer() {
  return <div className="flex-1" aria-hidden />;
}
