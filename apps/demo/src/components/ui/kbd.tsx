import * as React from 'react';
import { cn } from '@/lib/utils';

export function Kbd({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-2xs text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}
