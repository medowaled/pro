"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import SiteHeader from "@/components/layout/header";
import SiteFooter from "@/components/layout/footer";
import { Course } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Check, User, Clock, BookOpen, GraduationCap, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

interface StaticCourseUnit {
  title: string;
  videoUrl: string;
  duration?: string;
  description?: string;
}

function CourseIntroSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="w-full aspect-video rounded-lg" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <Skeleton className="h-8 w-2/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-12 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CourseIntroPage() {
  const params = useParams();
  const id = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [staticCourseData, setStaticCourseData] = useState<any>(null);
  const { user, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    if (!id) return;

    const fetchCourseAndEnrollment = async () => {
      setIsLoading(true);
      try {
        // Fetch static course data from API
        const courseRes = await fetch(`/api/courses?featured=true`);
        if (!courseRes.ok) throw new Error("Failed to fetch courses");
        const coursesData = await courseRes.json();
        const staticCourse = coursesData.find((c: any) => c.id === id);
        
        if (!staticCourse) {
          setCourse(null);
          return;
        }

        setCourse(staticCourse);
        setStaticCourseData(staticCourse);

        // If user is logged in, check enrollment status
        if (user) {
          const enrolledRes = await fetch(`/api/courses?enrolled=true`);
          if (enrolledRes.ok) {
            const enrolledCourses: Course[] = await enrolledRes.json();
            const enrollmentStatus = enrolledCourses.some((c) => c.id === id);
            setIsEnrolled(enrollmentStatus);
          }
        } else {
          setIsEnrolled(false);
        }
      } catch (error) {
        console.error(error);
        setCourse(null);
      } finally {
        setIsLoading(false);
      }
    };

    // We wait for auth to finish loading before fetching course data
    if (!isAuthLoading) {
      fetchCourseAndEnrollment();
    }
  }, [id, user, isAuthLoading]);

  if (isLoading || isAuthLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-grow">
          <CourseIntroSkeleton />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!course) {
    return notFound();
  }

  const imageSrc = course.imageBase64 || course.imageUrl || "https://placehold.co/600x400";
  const totalContent = course.content?.length || 0;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-semibold">{course.category}</span>
                    {staticCourseData && (
                      <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                        <span>{staticCourseData.rating}</span>
                        <Star className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="font-headline text-4xl">{course.title}</CardTitle>
                  <CardDescription className="text-lg">{course.description}</CardDescription>
                </CardHeader>
              </Card>
              
              <div className="bg-background rounded-lg shadow-lg overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={course.title}
                  width={1200}
                  height={675}
                  className="w-full object-cover"
                />
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">محتويات الدورة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staticCourseData?.units?.map((unit: StaticCourseUnit, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{unit.title}</h4>
                          {unit.description && (
                            <p className="text-sm text-foreground/70 mt-1">{unit.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {unit.duration && (
                            <span className="text-sm text-foreground/60 flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {unit.duration}
                            </span>
                          )}
                          <Button size="sm" variant="outline" asChild>
                            <Link href={unit.videoUrl} target="_blank">
                              مشاهدة الفيديو
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-accent text-center mb-2">
                    خطط الاشتراك
                  </CardTitle>
                  <div className="space-y-3">
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <div className="text-sm text-foreground/70 mb-1">اشتراك شهري</div>
                      <div className="text-2xl font-bold text-primary">
                        100 جنيه
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-100 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                      <div className="text-sm text-foreground/70 mb-1">اشتراك كامل للترم</div>
                      <div className="text-2xl font-bold text-green-600">
                        300 جنيه
                      </div>
                      <div className="text-xs text-green-600 mt-1">الأكثر توفيراً</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 font-body text-md">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <span>
                      يقدمها: <span className="font-bold">{course.instructor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>ترم كامل</span>
                  </div>
                  {staticCourseData && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      <span>{staticCourseData.students} طالب مسجل</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex-col gap-3 pt-4">
                  {isEnrolled ? (
                    <Button size="lg" asChild className="w-full font-headline text-lg">
                      <Link href={`/user/courses/${course.id}`}>
                        <GraduationCap className="ml-2 h-5 w-5" />
                        اذهب إلى الدورة
                      </Link>
                    </Button>
                  ) : (
                    <Button size="lg" asChild className="w-full font-headline text-lg">
                      <Link href="/user/payment-info">
                        <Check className="ml-2 h-5 w-5" />
                        اشترك الآن
                      </Link>
                    </Button>
                  )}
                  <p className="text-xs text-muted-foreground">الدفع آمن ومضمون</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
