"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import SiteHeader from "@/components/layout/header";
import SiteFooter from "@/components/layout/footer";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, Suspense, useState } from "react";

const formSchema = z.object({
  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "رقم هاتف غير صالح"
    ),
  password: z.string().min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل"),
});

function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user, isLoading } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // Redirect if user is already logged in
  useEffect(() => {
    if (!isLoading && user && !isLoggingIn) {
      console.log('🔄 Redirecting logged in user:', user);
      const redirectTo = searchParams.get('redirect');
      
      if (redirectTo && (redirectTo.startsWith('/admin') || redirectTo.startsWith('/user'))) {
        if (redirectTo.startsWith('/admin') && user.role === 'ADMIN') {
          window.location.href = redirectTo;
        } else if (redirectTo.startsWith('/user') && user.role === 'STUDENT') {
          window.location.href = redirectTo;
        } else {
          if (user.role === "ADMIN") {
            window.location.href = "/admin/dashboard";
          } else {
            window.location.href = "/user/my-courses";
          }
        }
      } else {
        if (user.role === "ADMIN") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/user/my-courses";
        }
      }
    }
  }, [user, isLoading, searchParams, isLoggingIn]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoggingIn(true);
      
      const user = await login(values.phone, values.password);

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "جاري توجيهك إلى لوحة التحكم الخاصة بك.",
      });

      console.log(">>> User logged in:", user);
      
      // Get redirect URL from search params or use default
      const redirectTo = searchParams.get('redirect');
      
      // Wait for the cookie to be set and then redirect
      setTimeout(() => {
        console.log('🔄 Redirecting after login:', user.role);
        if (redirectTo && (redirectTo.startsWith('/admin') || redirectTo.startsWith('/user'))) {
          if (redirectTo.startsWith('/admin') && user.role === 'ADMIN') {
            window.location.href = redirectTo;
          } else if (redirectTo.startsWith('/user') && user.role === 'STUDENT') {
            window.location.href = redirectTo;
          } else {
            if (user.role === "ADMIN") {
              window.location.href = "/admin/dashboard";
            } else {
              window.location.href = "/user/my-courses";
            }
          }
        } else {
          if (user.role === "ADMIN") {
            window.location.href = "/admin/dashboard";
          } else {
            window.location.href = "/user/my-courses";
          }
        }
      }, 1500);
    } catch (error: any) {
      setIsLoggingIn(false);
      toast({
        title: "فشل تسجيل الدخول",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">جاري التحقق من حالة تسجيل الدخول...</p>
      </div>
    );
  }

  // Don't render the form if user is already logged in (will be redirected)
  if (user) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">جاري توجيهك إلى لوحة التحكم...</p>
      </div>
    );
  }

  return (
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
              disabled={form.formState.isSubmitting || isLoggingIn}
            >
              {form.formState.isSubmitting || isLoggingIn ? "جاري الدخول..." : "دخول"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm text-muted-foreground font-body">
          ليس لديك حساب؟{" "}
          <Link
            href="/register"
            className="font-bold text-primary hover:underline"
          >
            أنشئ حساباً جديداً
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center py-12">
        <Suspense fallback={
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">جاري التحميل...</p>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
