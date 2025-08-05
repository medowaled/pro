import { cn } from './utils';

// دوال مساعدة للاستجابة
export const responsiveUtils = {
  // دالة لإنشاء classes متجاوبة
  responsive: (base: string, variants: Record<string, string>) => {
    return cn(base, variants);
  },

  // دالة لإنشاء padding متجاوب
  padding: {
    xs: 'p-2',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-12',
  },

  // دالة لإنشاء margin متجاوب
  margin: {
    xs: 'm-2',
    sm: 'm-3 sm:m-4',
    md: 'm-4 sm:m-6',
    lg: 'm-6 sm:m-8',
    xl: 'm-8 sm:m-12',
  },

  // دالة لإنشاء text متجاوب
  text: {
    xs: 'text-xs',
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
    '3xl': 'text-3xl sm:text-4xl',
  },

  // دالة لإنشاء grid متجاوب
  grid: {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    '5': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    '6': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  },

  // دالة لإنشاء gap متجاوب
  gap: {
    xs: 'gap-2',
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12',
  },

  // دالة لإنشاء spacing متجاوب
  spacing: {
    xs: 'space-y-2',
    sm: 'space-y-3 sm:space-y-4',
    md: 'space-y-4 sm:space-y-6',
    lg: 'space-y-6 sm:space-y-8',
    xl: 'space-y-8 sm:space-y-12',
  },

  // دالة لإنشاء flex متجاوب
  flex: {
    row: 'flex flex-col sm:flex-row',
    col: 'flex flex-row sm:flex-col',
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    end: 'flex items-center justify-end',
  },

  // دالة لإنشاء position متجاوب
  position: {
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
    sticky: 'sticky',
  },

  // دالة لإنشاء display متجاوب
  display: {
    block: 'block',
    inline: 'inline',
    'inline-block': 'inline-block',
    flex: 'flex',
    'inline-flex': 'inline-flex',
    grid: 'grid',
    'inline-grid': 'inline-grid',
    hidden: 'hidden',
  },

  // دالة لإنشاء visibility متجاوب
  visibility: {
    visible: 'visible',
    invisible: 'invisible',
    'mobile-only': 'block md:hidden',
    'desktop-only': 'hidden md:block',
    'tablet-only': 'hidden sm:block lg:hidden',
  },

  // دالة لإنشاء overflow متجاوب
  overflow: {
    auto: 'overflow-auto',
    hidden: 'overflow-hidden',
    visible: 'overflow-visible',
    scroll: 'overflow-scroll',
    'x-auto': 'overflow-x-auto',
    'y-auto': 'overflow-y-auto',
  },

  // دالة لإنشاء border متجاوب
  border: {
    none: 'border-0',
    sm: 'border sm:border-2',
    md: 'border-2 sm:border-4',
    lg: 'border-4 sm:border-8',
  },

  // دالة لإنشاء rounded متجاوب
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm sm:rounded',
    md: 'rounded sm:rounded-md',
    lg: 'rounded-md sm:rounded-lg',
    xl: 'rounded-lg sm:rounded-xl',
    '2xl': 'rounded-xl sm:rounded-2xl',
    full: 'rounded-full',
  },

  // دالة لإنشاء shadow متجاوب
  shadow: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow sm:shadow-md',
    lg: 'shadow-md sm:shadow-lg',
    xl: 'shadow-lg sm:shadow-xl',
    '2xl': 'shadow-xl sm:shadow-2xl',
  },

  // دالة لإنشاء width متجاوب
  width: {
    auto: 'w-auto',
    full: 'w-full',
    screen: 'w-screen',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '2/3': 'w-2/3',
    '1/4': 'w-1/4',
    '3/4': 'w-3/4',
  },

  // دالة لإنشاء height متجاوب
  height: {
    auto: 'h-auto',
    full: 'h-full',
    screen: 'h-screen',
    '1/2': 'h-1/2',
    '1/3': 'h-1/3',
    '2/3': 'h-2/3',
    '1/4': 'h-1/4',
    '3/4': 'h-3/4',
  },

  // دالة لإنشاء z-index متجاوب
  z: {
    '0': 'z-0',
    '10': 'z-10',
    '20': 'z-20',
    '30': 'z-30',
    '40': 'z-40',
    '50': 'z-50',
    auto: 'z-auto',
  },

  // دالة لإنشاء transition متجاوب
  transition: {
    none: 'transition-none',
    all: 'transition-all',
    colors: 'transition-colors',
    opacity: 'transition-opacity',
    shadow: 'transition-shadow',
    transform: 'transition-transform',
  },

  // دالة لإنشاء duration متجاوب
  duration: {
    '75': 'duration-75',
    '100': 'duration-100',
    '150': 'duration-150',
    '200': 'duration-200',
    '300': 'duration-300',
    '500': 'duration-500',
    '700': 'duration-700',
    '1000': 'duration-1000',
  },

  // دالة لإنشاء ease متجاوب
  ease: {
    linear: 'ease-linear',
    in: 'ease-in',
    out: 'ease-out',
    'in-out': 'ease-in-out',
  },
};

// دالة لإنشاء classes متجاوبة بسهولة
export const createResponsiveClasses = (
  base: string,
  variants: Record<string, string | Record<string, string>>
) => {
  const classes = [base];
  
  Object.entries(variants).forEach(([key, value]) => {
    if (typeof value === 'string') {
      classes.push(value);
    } else {
      Object.entries(value).forEach(([breakpoint, classValue]) => {
        classes.push(`${breakpoint}:${classValue}`);
      });
    }
  });
  
  return cn(...classes);
};

// دالة لإنشاء responsive breakpoints
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
};

// دالة لفحص حجم الشاشة
export const getScreenSize = () => {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  
  if (width < 475) return 'xs';
  if (width < 640) return 'sm';
  if (width < 768) return 'md';
  if (width < 1024) return 'lg';
  if (width < 1280) return 'xl';
  if (width < 1536) return '2xl';
  return '3xl';
};

// دالة لفحص إذا كانت الشاشة محمولة
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// دالة لفحص إذا كانت الشاشة لوحية
export const isTablet = () => {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= 768 && width < 1024;
};

// دالة لفحص إذا كانت الشاشة سطح مكتب
export const isDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
};

// دالة لإنشاء responsive styles
export const createResponsiveStyles = (styles: Record<string, any>) => {
  return Object.entries(styles).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, any>);
}; 