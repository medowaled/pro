export type CourseContentItem = {
  id?: string;
  type: 'video' | 'article' | 'quiz';
  title: string;
  duration?: string;
  url?: string;
};

export type Course = {
  id: string;
  title: string;
  instructor: string;
  description?: string;
  imageUrl?: string; 
  imageBase64?: string | null;
  dataAiHint?: string;
  videoUrl?: string | null;
  price: string | {
    monthly: string;
    fullTerm: string;
  };
  category: string;
  instructorId: string;
  content?: CourseContentItem[] | null;
  featured?: boolean;
};

export type Student = {
  id: string;
  name: string;
  phone: string;
  enrolledDate: string;
  courses: number;
}

export type Instructor = {
  id: string;
  name: string;
  specialty: string;
  coursesTaught: number;
}
