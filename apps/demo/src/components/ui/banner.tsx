import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const bannerVariants = cva(
  'flex items-center gap-3 rounded-lg border px-4 py-2.5 text-sm [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-foreground [&>svg]:text-foreground',
        info: 'border-primary/30 bg-primary/[0.07] text-foreground [&>svg]:text-primary',
        warning: 'border-warning/30 bg-warning/10 text-foreground [&>svg]:text-warning',
        destructive:
          'border-destructive/30 bg-destructive/[0.07] text-foreground [&>svg]:text-destructive',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, icon, action, children, ...props }, ref) => (
    <div ref={ref} className={cn(bannerVariants({ variant }), className)} {...props}>
      {icon}
      <div className="flex-1">{children}</div>
      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </div>
  ),
);
Banner.displayName = 'Banner';

export { bannerVariants };
