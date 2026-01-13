"use client";

import { GradientCourseCard } from "@/components/gradient-course-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import type { Course } from "@/lib/types";
import { BookCheck, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function MyCoursesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="flex flex-col overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardHeader>
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
          <CardFooter className="bg-secondary/30">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function MyCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`/api/courses?enrolled=true`);

        if (!response.ok) {
          throw new Error("Failed to fetch enrolled courses");
        }
        const data = await response.json();
        setEnrolledCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchCourses();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-headline font-bold mb-2">
            الدورات المسجلة
          </h2>
          <p className="text-muted-foreground">استكشف الدورات التي سجلت فيها</p>
        </div>
        <MyCoursesSkeleton />
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-headline font-bold mb-2">
          الدورات المسجلة
        </h2>
        <p className="text-muted-foreground">استكشف الدورات التي سجلت فيها</p>
      </div>

      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map((course) => (
            <GradientCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12 shadow-lg border-2 border-dashed max-w-2xl mx-auto">
          <CardHeader>
            <div className="mx-auto bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <BookCheck className="w-8 h-8" />
            </div>
            <CardTitle className="font-headline text-2xl">
              لم تسجل في أي دورة بعد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="font-body text-muted-foreground text-lg mb-6">
              يبدو أنك لم تنضم إلى أي من دوراتنا الرائعة حتى الآن.
              <br />
              يمكنك تصفح جميع الدورات المتاحة والانضمام إلى ما يناسبك.
            </CardDescription>
            <Button asChild size="lg" className="font-headline">
              <Link href="/courses">
                <GraduationCap className="ml-2 h-5 w-5" />
                تصفح جميع الدورات
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
