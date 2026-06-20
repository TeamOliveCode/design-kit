import * as React from 'react';
import { cn } from '@/lib/utils';

export const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn('relative ml-2 flex flex-col gap-6 border-l border-border', className)}
      {...props}
    />
  ),
);
Timeline.displayName = 'Timeline';

export interface TimelineItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
  title: React.ReactNode;
  time?: React.ReactNode;
  icon?: React.ReactNode;
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ title, time, icon, children, className, ...props }, ref) => (
    <li ref={ref} className={cn('relative pl-6', className)} {...props}>
      <span
        className={cn(
          'absolute -left-[7px] top-1 flex size-3.5 items-center justify-center rounded-full border-2 border-card [&_svg]:size-2.5',
          icon ? 'bg-muted text-muted-foreground' : 'bg-primary',
        )}
      >
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-medium text-foreground">{title}</span>
          {time ? <span className="text-caption text-muted-foreground">{time}</span> : null}
        </div>
        {children ? <div className="text-sm text-muted-foreground">{children}</div> : null}
      </div>
    </li>
  ),
);
TimelineItem.displayName = 'TimelineItem';
