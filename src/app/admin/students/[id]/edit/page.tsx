
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useParams } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  firstName: z.string().min(2, 'الاسم الأول قصير جداً'),
  lastName: z.string().min(2, 'اسم العائلة قصير جداً'),
  phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'رقم هاتف غير صالح'),
  password: z.string().min(8, 'يجب أن تكون كلمة المرور 8 أحرف على الأقل').optional().or(z.literal('')),
});

export default function EditStudentPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
    },
  });

  useEffect(() => {
    const fetchStudentData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/students/${id}`);
            if (!res.ok) throw new Error('Failed to fetch student data');
            const student = await res.json();
            form.reset({
                firstName: student.firstName,
                lastName: student.lastName,
                phone: student.phone,
                password: '',
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'خطأ',
                description: 'فشل في جلب بيانات الطالب.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }
    if (id) {
        fetchStudentData();
    }
  }, [id, form, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'حدث خطأ ما');
      }

      toast({
        title: 'تم تحديث بيانات الطالب بنجاح',
        description: 'تم حفظ التغييرات.',
      });
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: 'فشل تحديث البيانات',
        description: error.message,
        variant: 'destructive',
      });
    }
  }
  
  if (isLoading) {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader><Skeleton className="h-8 w-1/4" /></CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="text-2xl font-headline">تعديل بيانات الطالب</CardTitle>
                <CardDescription className="font-body">
                    حدث بيانات الطالب. اترك كلمة المرور فارغة لعدم تغييرها.
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
                      <Input placeholder="مثال: أحمد" {...field} />
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
                      <Input placeholder="مثال: المصري" {...field} />
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
                  <FormLabel>كلمة المرور الجديدة</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>اترك الحقل فارغاً لعدم تغيير كلمة المرور الحالية.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <><Loader2 className="ml-2 h-4 w-4 animate-spin" /> جاري الحفظ...</> : 'حفظ التغييرات'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}