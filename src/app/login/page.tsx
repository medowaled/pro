'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import SiteHeader from '@/components/layout/header';
import SiteFooter from '@/components/layout/footer';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState, Suspense } from 'react';

const formSchema = z.object({
  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      'رقم هاتف غير صالح'
    ),
  password: z.string().min(8, 'يجب أن تكون كلمة المرور 8 أحرف على الأقل'),
});

function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSubmitting || isLoading) return; // منع الإرسال المتكرر

    setIsSubmitting(true);
    try {
      const user = await login(values.phone, values.password);

      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: 'جاري توجيهك إلى لوحة التحكم الخاصة بك.',
      });

      // استخدام معلمة redirect أو التوجيه الافتراضي حسب دور المستخدم
      const redirectUrl =
        searchParams.get('redirect') ||
        (user.role === 'ADMIN' ? '/admin/dashboard' : '/user/my-courses');

      // Use window.location for more reliable redirect
      window.location.href = redirectUrl;
    } catch (error: any) {
      console.error('❌ Login failed:', error);

      toast({
        title: 'فشل تسجيل الدخول',
        description:
          error.message ||
          'حدث خطأ أثناء تسجيل الدخول. يرجى التحقق من البيانات والمحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center py-12">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">
              تسجيل الدخول
            </CardTitle>
            <CardDescription className="font-body">
              مرحباً بعودتك! أدخل بياناتك للمتابعة.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body">رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: 9665xxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body">كلمة المرور</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full font-headline text-lg"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? 'جاري الدخول...' : 'دخول'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm text-muted-foreground font-body">
              ليس لديك حساب؟{' '}
              <Link
                href="/register"
                className="font-bold text-primary hover:underline"
              >
                أنشئ حساباً جديداً
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-grow flex items-center justify-center py-12">
            <Card className="w-full max-w-md mx-4">
              <CardContent className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  جاري تحميل صفحة تسجيل الدخول...
                </p>
              </CardContent>
            </Card>
          </main>
          <SiteFooter />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
