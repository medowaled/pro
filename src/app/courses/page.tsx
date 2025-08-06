'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Clock, Users, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SiteHeader from '@/components/layout/header';
import SiteFooter from '@/components/layout/footer';
import { staticGradeLevels } from '@/lib/static-courses';
import { useAuth } from '@/context/AuthContext';

interface StaticUnit {
  title: string;
  videoUrl: string;
  duration?: string;
  description?: string;
}

interface StaticCourse {
  id: string;
  courseId: string;
  title: string;
  description: string;
  price: string;
  category: string;
  instructor: string;
  instructorId: string;
  rating: string;
  students: string;
  lessons: string;
  gradient: string;
  shadowColor: string;
  imageBase64?: string | null;
  units: StaticUnit[];
}

export default function CoursesPage() {
  const [staticCourses, setStaticCourses] = useState<StaticCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Memoized static data to avoid recreating on every render
  const staticData = useMemo(() => {
    return staticGradeLevels.map((course) => ({
      id: course.id,
      courseId: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      category: course.category,
      instructor: course.instructor,
      instructorId: course.instructorId,
      rating: course.rating,
      students: course.students,
      lessons: course.lessons,
      gradient: course.gradient,
      shadowColor: course.shadowColor,
      units: course.units,
    }));
  }, []);

  useEffect(() => {
    const fetchStaticCourses = async () => {
      try {
        const response = await fetch("/api/courses?featured=true", {
          headers: {
            'Cache-Control': 'max-age=300', // Cache for 5 minutes
          },
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        
        const data = await response.json();

        // If no courses from API, use static data
        if (data.length === 0) {
          setStaticCourses(staticData);
        } else {
          setStaticCourses(data);
        }
      } catch (error) {
        console.error("Error fetching static courses:", error);
        // Fallback to static data on error
        setStaticCourses(staticData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaticCourses();
  }, [staticData]);

  const getUnits = (level: StaticCourse) => {
    return level.units || [];
  };

  const getGradientAndShadow = (level: StaticCourse) => {
    return {
      gradient: level.gradient || 'from-blue-500 to-indigo-600',
      shadowColor: level.shadowColor || 'hover:shadow-blue-500/25',
    };
  };

  const handleSubscribe = (courseId: string) => {
    if (!user) {
      // Redirect to login with redirect parameter
      window.location.href = `/login?redirect=/user/payment-info`;
      return;
    }
    
    // If user is logged in, redirect to payment info
    window.location.href = '/user/payment-info';
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-grow bg-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">جاري تحميل الدورات...</p>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold mb-4">الدورات المتاحة</h1>
            <p className="text-lg text-muted-foreground font-body">
              اكتشف دوراتنا المميزة وابدأ رحلة التعلم
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {staticCourses.map((level, index) => {
              const { gradient, shadowColor } = getGradientAndShadow(level);
              return (
                <div key={index}>
                  <div
                    className={`bg-card rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${shadowColor}`}
                  >
                    <div className={`p-6 bg-gradient-to-br ${gradient} `}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-headline text-2xl font-bold">
                            {level.title}
                          </h3>
                          <p className="text-sm opacity-90">دورة شاملة</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm opacity-90">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>ترم كامل</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{level.students} طالب</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="font-body text-foreground/80 mb-4 h-12">
                        {level.description}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-headline font-bold text-lg">
                          الوحدات:
                        </h4>
                      </div>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        {getUnits(level).map(
                          (unit: StaticUnit, i: number) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 p-2 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer group"
                            >
                              <span className="flex-1">{unit.title}</span>
                            </li>
                          )
                        )}
                      </ul>
                      <div className="mt-6 pt-4 border-t border-foreground/10">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-foreground/70">اشتراك شهري:</span>
                            <span className="text-lg font-bold text-primary">
                              100 جنيه
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-foreground/70">اشتراك كامل للترم:</span>
                            <div className="text-right">
                              <span className="text-lg font-bold text-green-600">
                                300 جنيه
                              </span>
                              <div className="text-xs text-green-600">الأكثر توفيراً</div>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleSubscribe(level.id)}
                            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                          >
                            {user ? 'اشترك الآن' : 'سجل دخول للاشتراك'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}