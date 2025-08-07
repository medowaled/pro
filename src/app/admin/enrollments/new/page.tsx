Eslam Saad, [07/08/2025 05:29 ص]
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Course, Student } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  studentId: z.string({ required_error: "يجب اختيار طالب" }),
  courseId: z.string({ required_error: "يجب اختيار دورة" }),
});

export default function NewEnrollmentPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, coursesRes] = await Promise.all([
          fetch("/api/students"),
          fetch("/api/courses"),
        ]);

        if (!studentsRes.ok || !coursesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const studentsData = await studentsRes.json();
        const coursesData = await coursesRes.json();

        setStudents(studentsData);
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
        toast({
          title: "خطأ",
          description: "فشل في جلب قائمة الطلاب والدورات.",
          variant: "destructive",
        });
      }
    };
    fetchData();
  }, [toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: undefined,
      courseId: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "حدث خطأ ما");
      }

      toast({
        title: "تم تسجيل الطالب بنجاح",
        description: "تم تسجيل الطالب في الدورة المحددة.",
      });
      router.push("/admin/dashboard");
    } catch (error: any) {
      toast({
        title: "فشل تسجيل الطالب",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-headline">
              تسجيل طالب في دورة
            </CardTitle>
            <CardDescription className="font-body">
              اختر الطالب والدورة لإتمام عملية التسجيل.
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
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الطالب</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الطالب" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.phone})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الدورة</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الدورة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}{" "}
                          {course.category && `(${course.category})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "جاري التسجيل..." : "تسجيل الطالب"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}