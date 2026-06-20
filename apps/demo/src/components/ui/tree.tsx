import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Tree = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="tree" className={cn('text-sm', className)} {...props} />
  ),
);
Tree.displayName = 'Tree';

export interface TreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

export function TreeItem({
  label,
  icon,
  defaultOpen = false,
  children,
  className,
  ...props
}: TreeItemProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const hasChildren = React.Children.count(children) > 0;

  if (!hasChildren) {
    return (
      <div
        role="treeitem"
        className={cn(
          'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-accent',
          className,
        )}
        {...props}
      >
        {icon ? <span className="flex shrink-0 items-center [&_svg]:size-4">{icon}</span> : null}
        <span className="truncate">{label}</span>
      </div>
    );
  }

  return (
    <div role="treeitem" aria-expanded={open} className={cn(className)} {...props}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent"
      >
        <ChevronRight
          className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-90')}
        />
        {icon ? <span className="flex shrink-0 items-center [&_svg]:size-4">{icon}</span> : null}
        <span className="truncate">{label}</span>
      </button>
      {open ? (
        <div role="group" className="ml-3 border-l border-border pl-4">
          {children}
        </div>
      ) : null}
    </div>
  );
}
