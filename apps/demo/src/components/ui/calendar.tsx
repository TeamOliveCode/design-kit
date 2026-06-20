import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-4',
        month: 'flex flex-col gap-4',
        month_caption: 'flex justify-center pt-1 relative items-center h-9',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center gap-1 absolute inset-x-0 top-1 justify-between px-1',
        button_previous: cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'size-7 bg-transparent p-0 opacity-60 hover:opacity-100',
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'size-7 bg-transparent p-0 opacity-60 hover:opacity-100',
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-muted-foreground rounded-md w-9 font-normal text-xs',
        week: 'flex w-full mt-2',
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
          '[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-e-md',
          '[&:has([aria-selected].day-outside)]:bg-accent/50',
          'first:[&:has([aria-selected])]:rounded-s-md last:[&:has([aria-selected])]:rounded-e-md',
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'size-9 p-0 font-normal aria-selected:opacity-100',
        ),
        range_start: 'day-range-start rounded-s-md',
        range_end: 'day-range-end rounded-e-md',
        range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        selected: cn(
          'bg-primary text-primary-foreground',
          '[&>button]:bg-primary [&>button]:text-primary-foreground',
          '[&>button:hover]:bg-primary [&>button:hover]:text-primary-foreground',
        ),
        today: 'bg-accent text-accent-foreground rounded-md',
        outside: 'day-outside text-muted-foreground aria-selected:text-muted-foreground',
        disabled: 'text-muted-foreground opacity-50',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName, ...chevronProps }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight;
          return <Icon className={cn('size-4', chevronClassName)} {...chevronProps} />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';
