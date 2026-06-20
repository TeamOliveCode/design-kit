import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './label';

export const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
  ),
);
FormItem.displayName = 'FormItem';

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => <Label ref={ref} className={className} {...props} />);
FormLabel.displayName = 'FormLabel';

export const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />,
);
FormControl.displayName = 'FormControl';

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
FormDescription.displayName = 'FormDescription';

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  if (!children) return null;
  return (
    <p ref={ref} className={cn('text-sm font-medium text-destructive', className)} {...props}>
      {children}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  message?: React.ReactNode;
  htmlFor?: string;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ label, description, message, htmlFor, className, children, ...props }, ref) => (
    <FormItem ref={ref} className={className} {...props}>
      {label ? <FormLabel htmlFor={htmlFor}>{label}</FormLabel> : null}
      <FormControl>{children}</FormControl>
      {description ? <FormDescription>{description}</FormDescription> : null}
      <FormMessage>{message}</FormMessage>
    </FormItem>
  ),
);
Field.displayName = 'Field';
