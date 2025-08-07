
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Moon, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Mostafa from '../../app/images/hero-latest.png';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from 'next-themes';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/about', label: 'عني' },
  { href: '/courses', label: 'الدورات' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const { theme, setTheme } = useTheme();

  console.log('Header - Current user:', user);
  console.log('Header - Current pathname:', pathname);

  return (
    <header className="bg-background shadow-sm sticky top-0 z-40">
      <div className="responsive-container flex h-16 sm:h-20 items-center justify-between">
        
        {/* Right side: Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-full shadow-lg shadow-blue-500/20">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12">
                <AvatarImage src={Mostafa.src} alt="مستر مصطفى خليل" data-ai-hint="teacher portrait" />
                <AvatarFallback className="text-xs sm:text-sm">MK</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-right hidden sm:block">
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-foreground leading-tight">
                مستر مصطفى خليل
              </h1>
              <p className="text-xs text-muted-foreground leading-tight hidden md:block">
                استاذ العلوم بوزارة التربية والتعليم
              </p>
            </div>
          </Link>
        </div>
        
        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-body text-sm xl:text-lg hover:text-primary transition-colors',
                pathname === link.href ? 'text-primary font-bold' : 'text-foreground/80'
              )}
            >
              {link.label}
            </Link>
          ))}
          {user && !isLoading && (
            <Link
              href={user.role === 'ADMIN' ? '/admin/dashboard' : '/user/my-courses'}
              className={cn(
                'font-body text-sm xl:text-lg hover:text-primary transition-colors',
                pathname.startsWith('/user') || pathname.startsWith('/admin') ? 'text-primary font-bold' : 'text-foreground/80'
              )}
            >
              لوحة التحكم
            </Link>
          )}
        </nav>

        {/* Left side: Auth and Theme buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {user && !isLoading ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="font-semibold text-foreground hidden sm:inline text-sm md:text-base">{user.name}</span>
              <Button variant="destructive" className="font-headline rounded-full text-xs sm:text-sm" onClick={logout}>
                تسجيل الخروج
              </Button>
            </div>
          ) : !isLoading ? (
            <div className="hidden lg:flex items-center gap-2">
              <Button asChild className="font-headline bg-gradient-to-r from-blue-500 to-green-500 text-white hover:opacity-90 rounded-full text-sm">
                <Link href="/register">أنشئ حسابك</Link>
              </Button>
              <Button variant="ghost" asChild className="font-headline text-sm">
                <Link href="/login">سجل دخولك</Link>
              </Button>
            </div>
          ) : null}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="h-8 w-8 sm:h-10 sm:w-10"
          >
            <Sun className="h-[1rem] w-[1rem] sm:h-[1.2rem] sm:w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1rem] w-[1rem] sm:h-[1.2rem] sm:w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Navigation Burger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                  <Menu className="h-4 w-4 sm:h-6 sm:w-6" />
                  <span className="sr-only">فتح القائمة</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm">
                <div className="flex flex-col h-full p-4">
                  <Link href="/" className="flex items-center gap-3 self-start mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-full shadow-lg shadow-blue-500/20">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                        <AvatarImage src={Mostafa.src} alt="مستر مصطفى خليل" data-ai-hint="teacher portrait" />
                        <AvatarFallback>MK</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="text-right">
                      <h1 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                        مستر مصطفى خليل
                      </h1>
                      <p className="text-xs text-muted-foreground leading-tight">
                        استاذ العلوم بوزارة التربية والتعليم
                      </p>
                    </div>
                  </Link>
                  <nav className="flex flex-col gap-4 sm:gap-6 text-center">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'font-body text-lg sm:text-2xl hover:text-primary transition-colors',
                          pathname === link.href ? 'text-primary font-bold' : 'text-foreground/80'
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                    {user && !isLoading && (
                      <Link
                        href={user.role === 'ADMIN' ? '/admin/dashboard' : '/user/my-courses'}
                        className={cn(
                          'font-body text-lg sm:text-2xl hover:text-primary transition-colors',
                          pathname.startsWith('/user') || pathname.startsWith('/admin') ? 'text-primary font-bold' : 'text-foreground/80'
                        )}
                      >
                        لوحة التحكم
                      </Link>
                    )}
                  </nav>
                  <div className="mt-auto flex flex-col gap-3 sm:gap-4">
                    {user ? (
                      <Button variant="destructive" className="font-headline text-base sm:text-xl" onClick={logout}>
                        تسجيل الخروج
                      </Button>
                    ) : (
                      <>
                        <Button asChild className="font-headline text-base sm:text-xl rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white">
                          <Link href="/register">أنشئ حسابك</Link>
                        </Button>
                        <Button variant="ghost" asChild className="font-headline text-base sm:text-xl">
                          <Link href="/login">سجل دخولك</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  );
}
