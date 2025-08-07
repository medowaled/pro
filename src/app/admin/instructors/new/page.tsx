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
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(2, 'الاسم الأول قصير جداً'),
  lastName: z.string().min(2, 'اسم العائلة قصير جداً'),
  phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'رقم هاتف غير صالح'),
  password: z.string().min(8, 'يجب أن تكون كلمة المرور 8 أحرف على الأقل'),
  specialty: z.string().min(3, 'التخصص مطلوب'),
});

export default function NewInstructorPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      specialty: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/instructors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'حدث خطأ ما');
      }

      toast({
        title: 'تمت إضافة المدرب بنجاح',
        description: 'تم إنشاء حساب المدرب الجديد بنجاح. يمكن للمدرب الآن تسجيل الدخول والبدء في إدارة الدورات التعليمية.',
      });
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: 'فشل إضافة المدرب',
        description: error.message || "حدث خطأ أثناء إضافة المدرب. يرجى التحقق من البيانات والمحاولة مرة أخرى.",
        variant: 'destructive',
      });
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="text-2xl font-headline">إضافة مدرب جديد</CardTitle>
                <CardDescription className="font-body">
                أدخل بيانات المدرب لإنشاء حساب جديد له.
                </CardDescription>
            </div>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/admin/dashboard">
                    <ArrowRight className="h-5 w-5" />
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الأول</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: سارة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم العائلة</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: عبدالله" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input dir="ltr" placeholder="مثال: 9665xxxxxxxx" {...field} />
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
                  <FormLabel>كلمة المرور</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التخصص</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: تطوير الويب" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'جاري الإنشاء...' : 'إضافة المدرب'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
