
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRight, Loader2, Trash2, UserPlus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface EnrolledStudent {
    enrollmentId: string;
    studentId: string;
    name: string;
    phone: string;
}

export default function CourseEnrollmentsPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.id as string;
    const { toast } = useToast();

    const [courseTitle, setCourseTitle] = useState('');
    const [students, setStudents] = useState<EnrolledStudent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [enrollmentToDelete, setEnrollmentToDelete] = useState<string | null>(null);

    const fetchEnrollments = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/enrollments/${courseId}`);
            if (!res.ok) {
                throw new Error('فشل في جلب بيانات المسجلين');
            }
            const data = await res.json();
            setCourseTitle(data.courseTitle);
            setStudents(data.students);
        } catch (error: any) {
            toast({
                title: 'خطأ',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }, [courseId, toast]);

    useEffect(() => {
        if (courseId) {
            fetchEnrollments();
        }
    }, [courseId, fetchEnrollments]);
    
    const handleRemoveClick = (enrollmentId: string) => {
        setEnrollmentToDelete(enrollmentId);
        setIsAlertOpen(true);
    };

    const handleConfirmRemove = async () => {
        if (!enrollmentToDelete) return;

        try {
            const response = await fetch(`/api/enrollments/${enrollmentToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'فشل إزالة الطالب');
            }
            
            toast({
                title: 'نجاح',
                description: 'تمت إزالة الطالب من الدورة بنجاح.',
            });
            
            fetchEnrollments(); // Refresh the list
        } catch (error: any) {
            toast({
                title: 'خطأ',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setIsAlertOpen(false);
            setEnrollmentToDelete(null);
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-headline">الطلاب المسجلون في</CardTitle>
                            <CardDescription className="text-lg font-bold text-primary mt-1">
                                {isLoading ? 'جاري التحميل...' : courseTitle}
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                           <Button onClick={() => router.push('/admin/enrollments/new')}>
                                <UserPlus className="ml-2 h-4 w-4" /> تسجيل طالب جديد
                           </Button>
                           <Button variant="ghost" size="icon" onClick={() => router.push('/admin/dashboard')}>
                               <ArrowRight className="h-5 w-5" />
                           </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                         <div className="flex justify-center items-center py-10">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                         </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>اسم الطالب</TableHead>
                                    <TableHead>رقم الهاتف</TableHead>
                                    <TableHead className="text-left">إجراء</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.length > 0 ? students.map((student) => (
                                    <TableRow key={student.enrollmentId}>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell>{student.phone}</TableCell>
                                        <TableCell className="text-left">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleRemoveClick(student.enrollmentId)}
                                            >
                                                <Trash2 className="ml-2 h-4 w-4" />
                                                إزالة من الدورة
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-8">
                                            لا يوجد طلاب مسجلون في هذه الدورة بعد.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                    <AlertDialogDescription>
                        سيؤدي هذا الإجراء إلى إزالة الطالب من الدورة. لا يمكن التراجع عن هذا الإجراء.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmRemove} className="bg-destructive hover:bg-destructive/90">
                        تأكيد الإزالة
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}