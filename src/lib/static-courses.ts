import { Course, CourseContentItem } from './types';

export interface StaticUnit {
  title: string;
  description?: string;
  videoUrl?: string;
}

export interface StaticGradeLevel {
  id: string;
  title: string;
  rating: string;
  students: string;
  lessons: string;
  description: string;
  units: StaticUnit[];
  gradient: string;
  shadowColor: string;
  href: string;
  price: {
    monthly: string;
    fullTerm: string;
  };
  category: string;
  instructor: string;
  instructorId: string;
  imageBase64?: string;
}

export const staticGradeLevels: StaticGradeLevel[] = [
  {
    id: 'grade-1',
    title: 'الصف الأول الإعدادي',
    rating: '4.9',
    students: '+3500',
    lessons: '12',
    description: 'دورة شاملة تغطي جميع مفاهيم العلوم للصف الأول الإعدادي مع التركيز على الأساس القوي.',
    units: [
      {
        title: 'الوحدة الأولى: تركيب الذرة، الجدول الدوري لتصنيف العناصر، المادة وخصائصها، الروابط الكيميائية',
        description: 'شرح مفصل لتركيب الذرة والجدول الدوري',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        title: 'الوحدة الثانية: القوى الكهربية، القوى المغناطيسية، القوى الجاذبية',
        description: 'فهم القوى المختلفة في الطبيعة',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        title: 'الوحدة الثالثة: الخلايا والحياة، الصفات العامة للكائنات الحية، الميكروبات',
        description: 'دراسة الخلايا والكائنات الحية',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        title: 'الوحدة الرابعة: الأرض والنظام الشمسي، خسوف القمر',
        description: 'استكشاف الكون والنظام الشمسي',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
    ],
    gradient: 'from-blue-500 to-indigo-600',
    shadowColor: 'shadow-blue-500/30',
    href: '/courses/grade-1',
    price: {
      monthly: '100 جنيه',
      fullTerm: '300 جنيه'
    },
    category: 'العلوم',
    instructor: 'أستاذ مصطفى خليل',
    instructorId: 'instructor-1'
  },
  {
    id: 'grade-2',
    title: 'الصف الثاني الإعدادي',
    rating: '4.8',
    students: '+3000',
    lessons: '11',
    description: 'تطوير المهارات العلمية وتعميق الفهم للمفاهيم المتقدمة.',
    units: [
      {
        title: 'الوحدة الأولى: المادة والطاقة',
        description: 'دراسة المادة والطاقة وعلاقتهما',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        title: 'الوحدة الثانية: المادة والتفاعلات الكيميائية',
        description: 'التفاعلات الكيميائية والمواد',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        title: 'الوحدة الثالثة: تدفق الطاقة في عمليتي البناء الضوئي والتنفس الخلوي',
        description: 'العمليات الحيوية في الخلايا',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        title: 'الوحدة الرابعة: العمليات الجيولوجية',
        description: 'العمليات الجيولوجية للأرض',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
    ],
    gradient: 'from-blue-500 to-indigo-600',
    shadowColor: 'shadow-blue-500/30',
    href: '/courses/grade-2',
    price: {
      monthly: '100 جنيه',
      fullTerm: '300 جنيه'
    },
    category: 'العلوم',
    instructor: 'أستاذ مصطفى خليل',
    instructorId: 'instructor-1'
  },
  {
    id: 'grade-3',
    title: 'الصف الثالث الإعدادي',
    rating: '4.9',
    students: '+5000',
    lessons: '8',
    description: 'تحضير شامل لامتحان الشهادة الإعدادية مع التركيز على التفوق والتميز.',
    units: [
      {
        title: 'الوحدة الأولى: القوى والحركة',
        description: 'مفاهيم القوى والحركة',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        title: 'الوحدة الثانية: الطاقة الضوئية',
        description: 'الطاقة الضوئية وخصائصها',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        title: 'الوحدة الثالثة: التكاثر في الكائنات الحية',
        description: 'طرق التكاثر المختلفة',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        title: 'الوحدة الرابعة: الوراثة والجينات',
        description: 'مبادئ الوراثة والجينات',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
    ],
    gradient: 'from-blue-500 to-indigo-600',
    shadowColor: 'shadow-blue-500/30',
    href: '/courses/grade-3',
    price: {
      monthly: '100 جنيه',
      fullTerm: '300 جنيه'
    },
    category: 'العلوم',
    instructor: 'أستاذ مصطفى خليل',
    instructorId: 'instructor-1'
  },
];

export function getStaticCourseById(id: string): StaticGradeLevel | undefined {
  return staticGradeLevels.find(course => course.id === id);
}

export function convertStaticCourseToCourse(staticCourse: StaticGradeLevel): Course {
  const content: CourseContentItem[] = staticCourse.units.map((unit, index) => ({
    id: `${staticCourse.id}-unit-${index + 1}`,
    type: 'video',
    title: unit.title,
  }));

  return {
    id: staticCourse.id,
    title: staticCourse.title,
    instructor: staticCourse.instructor,
    description: staticCourse.description,
    imageBase64: staticCourse.imageBase64 || null,
    price: typeof staticCourse.price === 'string' ? staticCourse.price : staticCourse.price.monthly,
    category: staticCourse.category,
    instructorId: staticCourse.instructorId,
    content: content,
    featured: true,
  };
} 