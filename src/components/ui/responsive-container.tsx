import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function ResponsiveContainer({ 
  children, 
  className, 
  as: Component = 'div' 
}: ResponsiveContainerProps) {
  return (
    <Component className={cn(
      'container mx-auto px-4 sm:px-6 lg:px-8',
      className
    )}>
      {children}
    </Component>
  );
}

export function ResponsiveSection({ 
  children, 
  className, 
  as: Component = 'section' 
}: ResponsiveContainerProps) {
  return (
    <Component className={cn(
      'py-12 sm:py-16 md:py-20 lg:py-24',
      className
    )}>
      {children}
    </Component>
  );
}

export function ResponsiveGrid({ 
  children, 
  className, 
  as: Component = 'div' 
}: ResponsiveContainerProps) {
  return (
    <Component className={cn(
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8',
      className
    )}>
      {children}
    </Component>
  );
}

export function ResponsiveText({ 
  children, 
  className, 
  as: Component = 'p' 
}: ResponsiveContainerProps) {
  return (
    <Component className={cn(
      'text-sm sm:text-base lg:text-lg',
      className
    )}>
      {children}
    </Component>
  );
}

export function ResponsiveHeading({ 
  children, 
  className, 
  as: Component = 'h2' 
}: ResponsiveContainerProps) {
  return (
    <Component className={cn(
      'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold',
      className
    )}>
      {children}
    </Component>
  );
} 