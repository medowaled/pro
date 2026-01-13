import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ResponsiveProps {
  children: ReactNode;
  className?: string;
}

// مكونات للعرض حسب حجم الشاشة
export function MobileOnly({ children, className }: ResponsiveProps) {
  return (
    <div className={cn('block md:hidden', className)}>
      {children}
    </div>
  );
}

export function DesktopOnly({ children, className }: ResponsiveProps) {
  return (
    <div className={cn('hidden md:block', className)}>
      {children}
    </div>
  );
}

export function TabletOnly({ children, className }: ResponsiveProps) {
  return (
    <div className={cn('hidden sm:block lg:hidden', className)}>
      {children}
    </div>
  );
}

// مكونات للصور المتجاوبة
export function ResponsiveImage({ 
  src, 
  alt, 
  className,
  ...props 
}: {
  src: string;
  alt: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'w-full h-auto object-cover',
        className
      )}
      {...props}
    />
  );
}

// مكونات للأزرار المتجاوبة
export function ResponsiveButton({ 
  children, 
  className,
  ...props 
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <button
      className={cn(
        'px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm sm:text-base',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// مكونات للبطاقات المتجاوبة
export function ResponsiveCard({ 
  children, 
  className 
}: ResponsiveProps) {
  return (
    <div className={cn(
      'bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md p-4 sm:p-6',
      className
    )}>
      {children}
    </div>
  );
}

// مكونات للنصوص المتجاوبة
export function ResponsiveParagraph({ 
  children, 
  className 
}: ResponsiveProps) {
  return (
    <p className={cn(
      'text-sm sm:text-base lg:text-lg leading-relaxed',
      className
    )}>
      {children}
    </p>
  );
}

// مكونات للعناوين المتجاوبة
export function ResponsiveTitle({ 
  children, 
  className,
  as: Component = 'h2' 
}: ResponsiveProps & { as?: keyof JSX.IntrinsicElements }) {
  return (
    <Component className={cn(
      'text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold',
      className
    )}>
      {children}
    </Component>
  );
}

// مكونات للشبكات المتجاوبة
export function ResponsiveGridContainer({ 
  children, 
  className 
}: ResponsiveProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8',
      className
    )}>
      {children}
    </div>
  );
}

// مكونات للحاويات المتجاوبة
export function ResponsiveWrapper({ 
  children, 
  className 
}: ResponsiveProps) {
  return (
    <div className={cn(
      'container mx-auto px-4 sm:px-6 lg:px-8',
      className
    )}>
      {children}
    </div>
  );
}

// مكونات للمسافات المتجاوبة
export function ResponsiveSpacer({ 
  className 
}: { className?: string }) {
  return (
    <div className={cn(
      'h-8 sm:h-12 md:h-16 lg:h-20',
      className
    )} />
  );
}

// مكونات للقوائم المتجاوبة
export function ResponsiveList({ 
  children, 
  className 
}: ResponsiveProps) {
  return (
    <ul className={cn(
      'space-y-2 sm:space-y-3 lg:space-y-4',
      className
    )}>
      {children}
    </ul>
  );
}

// مكونات للروابط المتجاوبة
export function ResponsiveLink({ 
  children, 
  className,
  href,
  ...props 
}: ResponsiveProps & { href: string; [key: string]: any }) {
  return (
    <a
      href={href}
      className={cn(
        'text-sm sm:text-base hover:text-primary transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
} 