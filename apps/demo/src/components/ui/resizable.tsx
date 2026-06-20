import * as React from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

type Orientation = 'horizontal' | 'vertical';

const ResizableOrientationContext = React.createContext<Orientation>('horizontal');

export function ResizablePanelGroup({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof Group>) {
  return (
    <ResizableOrientationContext.Provider value={orientation}>
      <Group
        orientation={orientation}
        className={cn(
          'flex h-full w-full data-[orientation=vertical]:flex-col',
          orientation === 'vertical' && 'flex-col',
          className,
        )}
        {...props}
      />
    </ResizableOrientationContext.Provider>
  );
}
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

export const ResizablePanel = Panel;

export function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & { withHandle?: boolean }) {
  const orientation = React.useContext(ResizableOrientationContext);
  const isVertical = orientation === 'vertical';
  return (
    <Separator
      className={cn(
        'relative flex items-center justify-center bg-border',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
        isVertical
          ? 'h-px w-full after:absolute after:inset-x-0 after:top-1/2 after:h-1 after:-translate-y-1/2'
          : 'w-px after:absolute after:inset-y-0 after:start-1/2 after:w-1 after:-translate-x-1/2',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            'z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-border bg-border',
            isVertical && 'rotate-90',
          )}
        >
          <GripVertical className="size-2.5" />
        </div>
      )}
    </Separator>
  );
}
ResizableHandle.displayName = 'ResizableHandle';
