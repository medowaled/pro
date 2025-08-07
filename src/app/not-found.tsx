import type { Viewport } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#29ABE2',
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">الصفحة غير موجودة</h2>
        <p className="text-muted-foreground">
          عذراً، الصفحة التي تبحث عنها غير موجودة.
        </p>
        <Button asChild>
          <Link href="/">العودة للصفحة الرئيسية</Link>
        </Button>
      </div>
    </div>
  );
}
