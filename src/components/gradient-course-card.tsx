import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { staticGradeLevels } from "@/lib/static-courses";
import { BookOpen, Clock, GraduationCap, Users, Star, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface GradientCourseCardProps {
  course: any; // Using any for now to handle both static and regular courses
}

export function GradientCourseCard({ course }: GradientCourseCardProps) {
  const getGradientAndShadow = (course: any) => {
    // If the course has gradient and shadowColor from database, use them
    if (course.gradient && course.shadowColor) {
      return { gradient: course.gradient, shadowColor: course.shadowColor };
    }

    // Otherwise, fall back to static data using courseId
    const staticCourse = staticGradeLevels.find(
      (item) => item.id === course.courseId || item.id === course.id
    );
    return {
      gradient: staticCourse?.gradient || "from-blue-500 to-purple-600",
      shadowColor: staticCourse?.shadowColor || "shadow-blue-500/30",
    };
  };

  const getUnits = (course: any) => {
    if (course.units) return course.units;
    const unit = staticGradeLevels.find(
      (item) => item.id === course.courseId || item.id === course.id
    );
    return unit?.units ?? [];
  };

  const { gradient, shadowColor } = getGradientAndShadow(course);
  const units = getUnits(course);
  const courseLink = `/user/courses/${course.courseId || course.id}`;
  
  // تحديد مصدر الصورة
  const imageSrc = course.imageBase64 || course.imageUrl || 'https://placehold.co/600x400';

  // تحديد إذا كانت الدورة مميزة (عدد طلاب أكثر من 3000)
  const isFeatured = parseInt(course.students?.replace('+', '') || '0') >= 3000;

  return (
    <Card
      className={`group relative overflow-hidden border-0 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${shadowColor} ${isFeatured ? 'ring-2 ring-yellow-400/50 dark:ring-yellow-400/50' : ''}
        /* Dark Mode */
        dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
        dark:hover:from-slate-800 dark:hover:via-slate-700 dark:hover:to-slate-800
        /* Light Mode */
        bg-gradient-to-br from-slate-100 via-slate-50 to-white
        hover:from-slate-200 hover:via-slate-100 hover:to-slate-50
        border border-slate-200 dark:border-slate-700`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-2 left-2 z-20">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 font-bold text-xs px-2 py-1">
            مميز
          </Badge>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500 dark:opacity-20 dark:group-hover:opacity-30`} />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)] dark:bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)]" />
      </div>

      <CardHeader className="relative p-0">
        <Link href={courseLink}>
          <div className="relative h-48 overflow-hidden">
            {/* عرض صورة الدورة */}
            <Image
              src={imageSrc}
              alt={course.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient Overlay on Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badge */}
            <div className="absolute top-4 right-4">
              <Badge
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm text-white border-white/30 font-semibold dark:bg-white/20 dark:text-white dark:border-white/30"
              >
                {course.category}
              </Badge>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Play className="h-8 w-8 text-white fill-white" />
              </div>
            </div>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="relative p-6 space-y-4">
        {/* Course Title */}
        <div className="space-y-2">
          <h3 className="font-headline text-xl font-bold transition-colors duration-300 line-clamp-2
            text-slate-800 dark:text-white 
            group-hover:text-blue-600 dark:group-hover:text-yellow-300">
            <Link href={courseLink} className="hover:no-underline">
              {course.title}
            </Link>
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">
            {course.description}
          </p>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-3 py-3">
          <div className="text-center p-2 rounded-lg backdrop-blur-sm
            bg-slate-100/80 dark:bg-white/10
            border border-slate-200 dark:border-slate-700">
            <Clock className="h-4 w-4 text-yellow-500 dark:text-yellow-400 mx-auto mb-1" />
            <span className="text-xs text-slate-600 dark:text-slate-300">ترم كامل</span>
          </div>
          <div className="text-center p-2 rounded-lg backdrop-blur-sm
            bg-slate-100/80 dark:bg-white/10
            border border-slate-200 dark:border-slate-700">
            <Users className="h-4 w-4 text-blue-500 dark:text-blue-400 mx-auto mb-1" />
            <span className="text-xs text-slate-600 dark:text-slate-300">{course.students || "+2500"} طالب</span>
          </div>
        </div>

        {/* Units Section */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm flex items-center gap-2
            text-yellow-600 dark:text-yellow-300">
            <Star className="h-4 w-4" />
            الوحدات:
          </h4>
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {units.slice(0, 3).map((unit: any, index: number) => (
              <div
                key={index}
                className="text-xs rounded px-2 py-1 transition-colors duration-200
                  text-slate-600 dark:text-slate-300 
                  bg-slate-100/60 dark:bg-white/5 
                  hover:bg-slate-200/80 dark:hover:bg-white/10
                  border border-slate-200 dark:border-slate-700"
              >
                {unit.title}
              </div>
            ))}
            {units.length > 3 && (
              <div className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                +{units.length - 3} وحدة أخرى
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative p-6 pt-0">
        <div className="w-full space-y-3">
          {/* Pricing */}
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400">اشتراك شهري</div>
              <div className="font-bold text-lg text-slate-800 dark:text-white">
                {course.price === "مدفوع" ? "مدفوع" : "100 جنيه"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400">اشتراك كامل للترم</div>
              <div className="font-bold text-lg text-green-600 dark:text-green-400">
                {course.price !== "مدفوع" ? "300 جنيه" : "مدفوع"}
              </div>
              {course.price !== "مدفوع" && (
                <div className="text-xs text-green-600 dark:text-green-400">الأكثر توفيراً</div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <Button
            asChild
            className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              isFeatured 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white'
            }`}
          >
            <Link href={courseLink} className="flex items-center justify-center gap-2">
              {course.price === "مدفوع" ? "اذهب للدورة" : "اشترك الآن"}
              <GraduationCap className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
