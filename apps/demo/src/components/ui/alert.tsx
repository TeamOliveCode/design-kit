import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 rounded-lg border px-4 py-3 text-sm [&>svg]:mt-0.5 [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-foreground [&>svg]:text-foreground',
        info: 'border-primary/30 bg-primary/[0.07] text-foreground [&>svg]:text-primary',
        success: 'border-success/30 bg-success/[0.07] text-foreground [&>svg]:text-success',
        warning: 'border-warning/30 bg-warning/10 text-foreground [&>svg]:text-warning',
        destructive: 'border-destructive/30 bg-destructive/[0.07] text-foreground [&>svg]:text-destructive',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export function Alert({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('col-start-2 font-medium leading-none tracking-tight', className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('col-start-2 text-sm text-muted-foreground', className)} {...props} />;
}
