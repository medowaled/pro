import { Suspense } from 'react';
import LoginForm from '@/components/login-form';
import SiteHeader from "@/components/layout/header";
import SiteFooter from "@/components/layout/footer";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center py-12">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
