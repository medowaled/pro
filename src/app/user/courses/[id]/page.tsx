'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import SecureVideoPlayer from '@/components/secure-video-player';
import { Course, CourseContentItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlayCircle, FileText, CheckSquare, Clock, ExternalLink, ShieldAlert, Star, Users } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { getStaticCourseById, convertStaticCourseToCourse } from '@/lib/static-courses';
import Link from 'next/link';

function CourseDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Skeleton className="w-full aspect-video rounded-lg" />
                <Card>
                    <CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader><Skeleton className="h-8 w-2/3" /></CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default function EnrolledCoursePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const { user, isLoading: isAuthLoading } = useAuth();
  
  console.log('🔍 Debug - Component rendered with id:', id);
  console.log('🔍 Debug - Current isEnrolled state:', isEnrolled);

  useEffect(() => {
    if (isAuthLoading) return; // Wait until auth state is determined
    if (!user) {
        router.push(`/login?redirect=/courses/${id}`);
        return;
    }

    if (!id) return;

    const fetchCourseAndCheckEnrollment = async () => {
      setIsLoading(true);
      try {
        // Check enrollment status first
        console.log('🔍 Debug - Starting enrollment check for course ID:', id);
        const enrolledRes = await fetch(`/api/courses?enrolled=true`);
        console.log('🔍 Debug - API response status:', enrolledRes.status);
        
        if (enrolledRes.ok) {
          const enrolledCourses: Course[] = await enrolledRes.json();
          console.log('🔍 Debug - Course ID from URL:', id);
          console.log('🔍 Debug - Enrolled courses:', enrolledCourses.map(c => ({ id: c.id, title: c.title })));
          
          // Check if the course ID matches any enrolled course
          const enrollmentStatus = enrolledCourses.some((c: Course) => {
            const matches = c.id === id;
            console.log(`🔍 Debug - Comparing: ${c.id} === ${id} = ${matches}`);
            return matches;
          });
          
          console.log('🔍 Debug - Final enrollment status:', enrollmentStatus);
          console.log('🔍 Debug - About to set isEnrolled to:', enrollmentStatus);
          setIsEnrolled(enrollmentStatus);
          console.log('🔍 Debug - isEnrolled state updated to:', enrollmentStatus);
          
          if (enrollmentStatus) {
            // Get course data from enrolled courses
            const enrolledCourse = enrolledCourses.find(c => c.id === id);
            if (enrolledCourse) {
              setCourse(enrolledCourse);
              // Set first video as active for enrolled users
              const firstVideoUrl = enrolledCourse.videoUrl || null;
              console.log('🔍 Debug - Setting first video URL:', firstVideoUrl);
              setActiveVideoUrl(firstVideoUrl);
            } else {
              // Try to get static course data
              const staticCourse = getStaticCourseById(id);
              if (staticCourse) {
                const courseData = convertStaticCourseToCourse(staticCourse);
                setCourse(courseData);
                const firstVideoUrl = staticCourse.units[0]?.videoUrl || null;
                console.log('🔍 Debug - Setting first video URL:', firstVideoUrl);
                setActiveVideoUrl(firstVideoUrl);
              }
            }
          }
        } else {
          console.log('🔍 Debug - API request failed with status:', enrolledRes.status);
          const errorText = await enrolledRes.text();
          console.log('🔍 Debug - Error response:', errorText);
          setIsEnrolled(false);
        }

      } catch (error) {
        console.error(error);
        setCourse(null);
        setIsEnrolled(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourseAndCheckEnrollment();

  }, [id, user, isAuthLoading, router]);

  // Monitor isEnrolled state changes
  useEffect(() => {
    console.log('🔍 Debug - isEnrolled state changed to:', isEnrolled);
  }, [isEnrolled]);

  if (isLoading || isAuthLoading) {
    return <CourseDetailSkeleton />;
  }

  console.log('🔍 Debug - Current isEnrolled state:', isEnrolled);
  
  if (!isEnrolled) {
    console.log('🔍 Debug - Showing access denied message');
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Alert variant="destructive" className="max-w-lg">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>وصول غير مصرح به</AlertTitle>
                <AlertDescription>
                   أنت غير مسجل في هذه الدورة. يرجى الاشتراك أولاً للوصول إلى المحتوى.
                   <div className="mt-4">
                     <Button asChild>
                        <Link href={`/courses/${id}`}>العودة إلى صفحة الدورة</Link>
                     </Button>
                   </div>
                </AlertDescription>
            </Alert>
        </div>
    )
  }
  
  console.log('🔍 Debug - Showing course content');

  if (!course) {
    return notFound();
  }
  
  const staticCourse = getStaticCourseById(id);
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-5 h-5 text-primary" />;
      case 'article': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'quiz': return <CheckSquare className="w-5 h-5 text-green-500" />;
      default: return <FileText className="w-5 h-5" />;
    }
  }

  const handleContentClick = (item: CourseContentItem) => {
    if (item.type === 'video' && item.url) {
        setActiveVideoUrl(item.url);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.url) {
        window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const courseContent = (course.content as CourseContentItem[]) || [];

  return (
    <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl font-headline font-bold text-primary">{course.title}</h1>
          {staticCourse && (
            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
              <span>{staticCourse.rating}</span>
              <Star className="w-3 h-3" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 mb-8">
          <p className="text-lg text-muted-foreground">يقدمه: {course.instructor}</p>
          {staticCourse && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{staticCourse.students} طالب مسجل</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-background rounded-lg shadow-lg overflow-hidden mb-8">
                {activeVideoUrl ? (
                    <SecureVideoPlayer videoSrc={activeVideoUrl} />
                ) : (
                    <div className="aspect-video bg-muted flex items-center justify-center">
                        <Alert className="max-w-md mx-auto">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>لا يوجد فيديو للعرض</AlertTitle>
                            <AlertDescription>
                                اختر فيديو من قائمة المحتويات لبدء المشاهدة.
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
            </div>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">عن الدورة</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none text-foreground/80 font-body">
                    <p>{course.description}</p>
                </CardContent>
             </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-24">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">محتويات الدورة</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                       {courseContent.length > 0 ? courseContent.map((item, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 px-4 rounded-md">
                                    <div className="flex items-center gap-3 flex-1 text-right min-w-0">
                                        {getIcon(item.type)}
                                        <span className="font-body flex-1 truncate">{item.title}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                   <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-b-md">
                                     <Button 
                                       size="sm" 
                                       onClick={() => handleContentClick(item)} 
                                       disabled={!item.url}
                                     >
                                         {item.type === 'video' ? 'شغل الفيديو' : 'افتح الرابط'} 
                                         {item.type !== 'video' && <ExternalLink className="mr-2 h-4 w-4" />}
                                     </Button>
                                     {item.type === 'video' && item.duration && (
                                         <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                             <Clock className="w-4 h-4" />
                                             <span>{item.duration}</span>
                                         </div>
                                     )}
                                   </div>
                                </AccordionContent>
                            </AccordionItem>
                        )) : (
                            <p className="text-sm text-muted-foreground text-center py-4">لا يوجد محتوى لهذه الدورة بعد.</p>
                        )}
                    </Accordion>
                </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}
