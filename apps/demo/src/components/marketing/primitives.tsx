import * as React from 'react';
import { cn } from '@/lib/utils';

// Marketing layout primitives. Landing surfaces use generous rhythm and a slightly wider measure than app UI.

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto w-full max-w-[1140px] px-6', className)} {...props} />;
}

export function Section({
  className,
  muted,
  ...props
}: React.HTMLAttributes<HTMLElement> & { muted?: boolean }) {
  return (
    <section
      className={cn('py-20 sm:py-28', muted && 'bg-muted/40', className)}
      {...props}
    />
  );
}

// A mono spec-label kicker. NO decorative rule before it (a short colored line before a label is
// a tell-tale AI pattern). Mono + uppercase reads as an intentional technical spec label
// (Vercel/Linear), not a decorative sans kicker, only use when it adds real category context.
export function Eyebrow({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('font-mono text-xs uppercase tracking-widest text-primary', className)}
      {...props}
    >
      {children}
    </span>
  );
}
