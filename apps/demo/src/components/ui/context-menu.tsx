import * as React from 'react';
import { ContextMenu as ContextMenuPrimitive } from 'radix-ui';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const menuContentClasses =
  'z-50 min-w-[10rem] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-card ' +
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ' +
  'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2';

export const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content ref={ref} className={cn(menuContentClasses, className)} {...props} />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = 'ContextMenuContent';

const itemClasses =
  'relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors ' +
  'focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground';

export const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean; variant?: 'default' | 'destructive' }
>(({ className, inset, variant = 'default', ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      itemClasses,
      inset && 'ps-8',
      variant === 'destructive' && 'text-destructive focus:bg-destructive/10 focus:text-destructive [&_svg]:text-destructive',
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = 'ContextMenuItem';

export const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem ref={ref} checked={checked} className={cn(itemClasses, 'py-1.5 ps-8 pe-2', className)} {...props}>
    <span className="absolute start-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="size-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

export const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem ref={ref} className={cn(itemClasses, 'py-1.5 ps-8 pe-2', className)} {...props}>
    <span className="absolute start-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="size-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

export const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground', inset && 'ps-8', className)}
    {...props}
  />
));
ContextMenuLabel.displayName = 'ContextMenuLabel';

export const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

export function ContextMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ms-auto font-mono text-xs tracking-widest text-muted-foreground', className)} {...props} />;
}

export const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(itemClasses, 'data-[state=open]:bg-accent', inset && 'ps-8', className)}
    {...props}
  >
    {children}
    <ChevronRight className="ms-auto size-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

export const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent ref={ref} className={cn(menuContentClasses, className)} {...props} />
));
ContextMenuSubContent.displayName = 'ContextMenuSubContent';
