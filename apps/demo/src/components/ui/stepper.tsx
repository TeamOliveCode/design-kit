import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[];
  current: number;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, current, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex w-full items-start', className)} {...props}>
      {steps.map((step, index) => {
        const isCompleted = index < current;
        const isCurrent = index === current;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center gap-2 text-center">
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors',
                  isCompleted && 'border-primary bg-primary text-primary-foreground',
                  isCurrent && 'border-primary text-primary',
                  !isCompleted && !isCurrent && 'border-border text-muted-foreground',
                )}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted ? <Check className="size-4" /> : index + 1}
              </span>
              <div className="flex flex-col gap-0.5">
                <span
                  className={cn(
                    'text-sm font-medium transition-colors',
                    isCurrent || isCompleted ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {step.label}
                </span>
                {step.description ? <span className="text-caption text-muted-foreground">{step.description}</span> : null}
              </div>
            </div>
            {!isLast ? (
              <span
                className={cn('mt-4 h-px flex-1 transition-colors', isCompleted ? 'bg-primary' : 'bg-border')}
                aria-hidden="true"
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  ),
);
Stepper.displayName = 'Stepper';
