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

const formSchema = z
  .object({
    firstName: z.string().min(2, "الاسم الأول قصير جداً"),
    lastName: z.string().min(2, "اسم العائلة قصير جداً"),
    phone: z
      .string()
      .regex(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "رقم هاتف غير صالح",
      ),
    password: z.string().min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل"),
    year: z.string().min(1, "يرجى اختيار السنة"),
    confirmPassword: z
      .string()
      .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      year: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          year: values.year,
          phone: values.phone,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "حدث خطأ ما");
      }

      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "مرحباً بك في منصتنا التعليمية! تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول والبدء في رحلتك التعليمية.",
      });
      router.push("/login");
    } catch (error: any) {
      toast({
        title: "فشل إنشاء الحساب",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center py-12">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">
              إنشاء حساب جديد
            </CardTitle>
            <CardDescription className="font-body">
              انضم إلى آلاف الطلاب وابدأ رحلتك التعليمية.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body">الاسم الأول</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: مصطفى" {...field} />
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
                        <FormLabel className="font-body">اسم العائلة</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: خليل" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body">
                        السنة الدراسية
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">اختر السنة</option>
                          <option value="1">الأولى</option>
                          <option value="2">الثانية</option>
                          <option value="3">الثالثة</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body">رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: 01xxxxxxxx" {...field} />
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body">
                        تأكيد كلمة المرور
                      </FormLabel>
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
                  {form.formState.isSubmitting
                    ? "جاري الإنشاء..."
                    : "إنشاء الحساب"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm text-muted-foreground font-body">
              لديك حساب بالفعل؟{" "}
              <Link
                href="/login"
                className="font-bold text-primary hover:underline"
              >
                سجل الدخول
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
