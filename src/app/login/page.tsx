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
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const formSchema = z.object({
  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "رقم هاتف غير صالح"
    ),
  password: z.string().min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل"),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { login, user, isLoading } = useAuth();

  console.log('LoginPage - Current user:', user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      console.log('User already logged in, redirecting...');
      if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/my-courses");
      }
    }
  }, [user, router]);

  // Don't render the form if user is already logged in - redirect immediately
  if (user) {
    return null; // Return null to prevent rendering while redirecting
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("🔄 Starting login process...");
      const user = await login(values.phone, values.password);

      console.log("✅ Login successful, user:", user);

      // Redirect immediately without showing toast message
      console.log("🔄 Redirecting user to dashboard...");
      
      // Redirect based on user role
      if (user.role === "ADMIN") {
        console.log("👨‍💼 Redirecting admin to:", "/admin/dashboard");
        router.push("/admin/dashboard");
      } else {
        console.log("👨‍🎓 Redirecting student to:", "/user/my-courses");
        router.push("/user/my-courses");
      }
    } catch (error: any) {
      console.error("❌ Login failed:", error);

      toast({
        title: "فشل تسجيل الدخول",
        description: error.message || "حدث خطأ أثناء تسجيل الدخول. يرجى التحقق من البيانات والمحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-grow flex items-center justify-center py-12">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">جاري التحقق من حالة تسجيل الدخول...</p>
            </CardContent>
          </Card>
        </main>
        <SiteFooter />
      </div>
    );
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
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "جاري الدخول..." : "دخول"}
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
      </main>
      <SiteFooter />
    </div>
  );
}
