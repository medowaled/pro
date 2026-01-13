
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Course } from '@/lib/types';
import { User, Tag, ArrowLeft, GraduationCap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const imageSrc = course.imageBase64 || course.imageUrl || 'https://placehold.co/600x400';
  const { user } = useAuth(); // Assuming useAuth gives info on logged in user
  
  // A simple check if the course is paid for (price is "مدفوع")
  const isEnrolled = course.price === 'مدفوع' && user;

  const courseLink = isEnrolled ? `/user/courses/${course.id}` : `/courses/${course.id}`;

  return (
    <Card className="flex flex-col overflow-hidden responsive-shadow hover:shadow-xl transition-all duration-300 responsive-card">
      <CardHeader className="p-0 relative">
        <Link href={courseLink}>
          <Image
            src={imageSrc}
            alt={course.title}
            width={600}
            height={400}
            className="responsive-image h-32 sm:h-40 md:h-48 object-cover"
            data-ai-hint={course.dataAiHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-3 sm:p-4">
        <div className="flex justify-between items-center mb-2">
            <Badge variant="secondary" className="font-body text-xs sm:text-sm">{course.category}</Badge>
        </div>
        <h3 className="font-headline text-base sm:text-lg md:text-xl font-bold h-12 sm:h-16 line-clamp-2">
            <Link href={courseLink} className="hover:text-primary transition-colors">{course.title}</Link>
        </h3>
        <div className="flex items-center text-muted-foreground mt-2">
          <User className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
          <span className="font-body text-xs sm:text-sm">{course.instructor}</span>
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center bg-secondary/30 gap-2 sm:gap-0">
        <div className="text-center sm:text-left">
          <div className="font-bold text-accent font-headline text-sm sm:text-base">
            100 جنيه
          </div>
          <div className="text-xs text-muted-foreground">شهرياً</div>
          <div className="text-xs text-green-600 mt-1">
            300 جنيه للترم
          </div>
        </div>
        <Button asChild variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10 text-xs sm:text-sm w-full sm:w-auto">
          <Link href={courseLink} className="flex items-center justify-center">
            {isEnrolled ? 'اذهب للدورة' : 'عرض التفاصيل'}
            {isEnrolled ? <GraduationCap className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4"/> : <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
