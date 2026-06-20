import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ collapsed = false, className, ...props }, ref) => (
    <aside
      ref={ref}
      data-collapsed={collapsed || undefined}
      className={cn(
        'flex flex-col border-e border-border bg-card transition-[width] duration-200',
        collapsed ? 'w-16' : 'w-64',
        className,
      )}
      {...props}
    />
  ),
);
Sidebar.displayName = 'Sidebar';

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 border-b border-border p-3', className)}
      {...props}
    />
  ),
);
SidebarHeader.displayName = 'SidebarHeader';

export const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 overflow-y-auto p-2', className)} {...props} />
  ),
);
SidebarContent.displayName = 'SidebarContent';

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-auto border-t border-border p-3', className)}
      {...props}
    />
  ),
);
SidebarFooter.displayName = 'SidebarFooter';

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
}

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ label, className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1 py-2', className)} {...props}>
      {label ? (
        <div className="px-2.5 pb-1 text-2xs uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
      ) : null}
      {children}
    </div>
  ),
);
SidebarGroup.displayName = 'SidebarGroup';

export interface SidebarItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
}

export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ icon, active = false, className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-active={active || undefined}
      className={cn(
        'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-start text-sm text-foreground hover:bg-accent [&_svg]:size-4 [&_svg]:shrink-0',
        active && 'bg-accent text-accent-foreground font-medium',
        className,
      )}
      {...props}
    >
      {icon ? <span className="flex shrink-0 items-center">{icon}</span> : null}
      {children}
    </button>
  ),
);
SidebarItem.displayName = 'SidebarItem';
