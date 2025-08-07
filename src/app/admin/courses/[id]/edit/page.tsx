
'use client';

import Link from 'next/link';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { GripVertical, Trash2, LinkIcon, Loader2 } from 'lucide-react';

interface Instructor {
  id: string;
  name: string;
  specialty: string;
}

const contentSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['video', 'article', 'quiz']),
  title: z.string().min(3, 'يجب أن يكون العنوان 3 أحرف على الأقل'),
  duration: z.string().optional(),
  url: z.string().url({ message: 'الرجاء إدخال رابط صالح' }).optional().or(z.literal('')),
});

const formSchema = z.object({
  title: z.string().min(3, 'يجب أن يكون العنوان 3 أحرف على الأقل'),
  description: z.string().min(10, 'يجب أن يكون الوصف 10 أحرف على الأقل'),
  price: z.string().min(1, 'السعر مطلوب'),
  category: z.string().min(2, 'الفئة مطلوبة'),
  instructorId: z.string({ required_error: 'يجب اختيار مدرب' }),
  videoUrl: z.string().url({ message: 'الرجاء إدخال رابط فيديو صالح' }).optional().or(z.literal('')),
  imageBase64: z.string().optional(),
  content: z.array(contentSchema).optional(),
  featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditCoursePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      instructorId: undefined,
      videoUrl: '',
      imageBase64: '',
      content: [],
      featured: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "content",
  });

  const watchedContentType = form.watch('content');

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await fetch('/api/instructors');
        if (!res.ok) throw new Error('Failed to fetch instructors');
        const data = await res.json();
        setInstructors(data);
      } catch (error) {
        console.error(error);
        toast({
          title: 'خطأ',
          description: 'فشل في جلب قائمة المدربين.',
          variant: 'destructive',
        });
      }
    };

    const fetchCourseData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = window.location.pathname.split('/').pop();
        if (!id) return;

        const res = await fetch(`/api/courses/${id}`);
        if (!res.ok) throw new Error('Failed to fetch course');
        const course = await res.json();

        form.reset({
          title: course.title || '',
          description: course.description || '',
          price: course.price || '',
          category: course.category || '',
          instructorId: course.instructorId || '',
          videoUrl: course.videoUrl || '',
          imageBase64: course.imageBase64 || '',
          content: course.content || [],
          featured: course.featured || false,
        });

        if (course.imageBase64) {
          setPreviewImage(course.imageBase64);
        }
      } catch (error) {
        console.error(error);
        toast({
          title: 'خطأ',
          description: 'فشل في جلب بيانات الدورة.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructors();
    fetchCourseData();
  }, [form, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewImage(result);
        form.setValue('imageBase64', result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: FormValues) {
    try {
      const id = window.location.pathname.split('/').pop();
      const response = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'حدث خطأ أثناء تحديث الدورة');
      }

      toast({
        title: 'نجح',
        description: 'تم تحديث الدورة بنجاح.',
      });

      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'خطأ',
        description: error.message || 'حدث خطأ أثناء تحديث الدورة.',
        variant: 'destructive',
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>تعديل الدورة</CardTitle>
        <CardDescription>
          قم بتعديل بيانات الدورة وإضافة المحتوى المطلوب
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان الدورة</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="عنوان الدورة" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الفئة</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="مثال: البرمجة" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>السعر</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="100" type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instructorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المدرب</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المدرب" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {instructors.map((instructor) => (
                          <SelectItem key={instructor.id} value={instructor.id}>
                            {instructor.name} - {instructor.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف الدورة</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="وصف مفصل للدورة..." rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رابط الفيديو التعريفي (اختياري)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input {...field} placeholder="https://example.com/video" className="pl-10" dir="ltr" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>صورة الدورة</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="max-w-xs"
                />
              </div>
              {previewImage && (
                <div className="relative w-32 h-32">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-x-reverse">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="w-4 h-4"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>دورة مميزة</FormLabel>
                    <FormDescription>
                      عرض الدورة في القسم المميز في الصفحة الرئيسية
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>محتوى الدورة</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ type: 'video', title: '', duration: '', url: '' })}
                >
                  إضافة درس
                </Button>
              </div>

              {fields.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">لم يتم إضافة أي محتوى بعد.</p>
              )}
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-4 p-3 bg-secondary/50 rounded-md">
                  <GripVertical className="h-5 w-5 mt-10 text-muted-foreground cursor-grab" />
                  <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                     <FormField
                        control={form.control}
                        name={`content.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>العنوان</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="عنوان الدرس" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name={`content.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>النوع</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر النوع" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="video">فيديو</SelectItem>
                                <SelectItem value="article">مقالة</SelectItem>
                                <SelectItem value="quiz">اختبار</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {watchedContentType?.[index]?.type === 'video' && (
                        <FormField
                          control={form.control}
                          name={`content.${index}.duration`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>المدة (اختياري)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="10:30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {watchedContentType?.[index]?.type && (
                         <FormField
                            control={form.control}
                            name={`content.${index}.url`}
                            render={({ field }) => (
                              <FormItem className="md:col-span-3">
                                <FormLabel>
                                  {
                                    {
                                      'video': 'رابط الفيديو',
                                      'article': 'رابط المقالة',
                                      'quiz': 'رابط الاختبار'
                                    }[watchedContentType[index].type]
                                  }
                                </FormLabel>
                                <FormControl>
                                   <div className="relative">
                                     <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                     <Input {...field} placeholder="https://example.com/..." className="pl-10" dir="ltr" />
                                   </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                      )}
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="mt-6">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <><Loader2 className="ml-2 h-4 w-4 animate-spin" /> جاري الحفظ...</> : 'حفظ التغييرات'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}