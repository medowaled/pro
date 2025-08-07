Eslam Saad, [07/08/2025 05:23 ص]
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Course, Student, Instructor } from "@/lib/types";
import {
  PlusCircle,
  MoreHorizontal,
  Users,
  BookCopy,
  UserCheck,
  Trash2,
  Edit,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

type ItemType = "course" | "student" | "instructor";

export default function AdminDashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    type: ItemType;
  } | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const [coursesRes, studentsRes, instructorsRes] = await Promise.all([
        fetch("/api/courses"),
        fetch("/api/students"),
        fetch("/api/instructors"),
      ]);

      if (!coursesRes.ok || !studentsRes.ok || !instructorsRes.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const coursesData = await coursesRes.json();
      const studentsData = await studentsRes.json();
      const instructorsData = await instructorsRes.json();

      setCourses(coursesData);
      setStudents(studentsData);
      setInstructors(instructorsData);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات لوحة التحكم.",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteClick = (id: string, type: ItemType) => {
    setItemToDelete({ id, type });
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      const response = await fetch(
        `/api/${itemToDelete.type}s/${itemToDelete.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "فشل الحذف");
      }

      toast({
        title: "نجاح",
        description: "تم حذف العنصر بنجاح.",
      });

      fetchData();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsAlertOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-body">
                إجمالي الطلاب
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">+120 هذا الشهر</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-body">
                إجمالي الدورات
              </CardTitle>
              <BookCopy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-xs text-muted-foreground">
                +5 جديدة هذا الشهر
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-body">
                إجمالي المدربين
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{instructors.length}</div>
              <p className="text-xs text-muted-foreground">+2 جدد هذا الشهر</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">الدورات</TabsTrigger>
            <TabsTrigger value="students">الطلاب</TabsTrigger>
            <TabsTrigger value="instructors">المدربين</TabsTrigger>
          </TabsList>
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>إدارة الدورات</CardTitle>
                    <CardDescription>
                      إضافة، تعديل، وحذف الدورات.
                    </CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/admin/courses/new">
                      <PlusCircle className="ml-2 h-4 w-4" /> إضافة دورة
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>عنوان الدورة</TableHead>
                      <TableHead>المدرب</TableHead>
                      <TableHead>السعر</TableHead>
                      <TableHead>الفئة</TableHead>
                      <TableHead>
                        <span className="sr-only">إجراءات</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">
                          {course.title}
                        </TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>{course.price}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{course.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onSelect={() =>
                                  router.push(
                                    `/admin/courses/${course.id}/edit`,
                                  )
                                }
                              >
                                <Edit className="ml-2 h-4 w-4" /> تعديل
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() =>
                                  router.push(
                                    `/admin/courses/${course.id}/enrollments`,
                                  )
                                }
                              >
                                <Eye className="ml-2 h-4 w-4" /> عرض المسجلين
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteClick(course.id, "course")
                                }
                                className="text-destructive"
                              >
                                <Trash2 className="ml-2 h-4 w-4" /> حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>إدارة الطلاب</CardTitle>
                    <CardDescription>
                      عرض معلومات الطلاب المسجلين وإدارة حساباتهم.
                    </CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/admin/enrollments/new">
                      <PlusCircle className="ml-2 h-4 w-4" /> تسجيل طالب
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم الطالب</TableHead>
                      <TableHead>رقم الهاتف</TableHead>
                      <TableHead>تاريخ التسجيل</TableHead>
                      <TableHead>دورات مسجلة</TableHead>
                      <TableHead>
                        <span className="sr-only">إجراءات</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          {student.name}
                        </TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>{student.enrolledDate}</TableCell>
                        <TableCell>{student.courses}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onSelect={() =>
                                  router.push(
                                    `/admin/students/${student.id}/edit`,
                                  )
                                }
                              >
                                <Edit className="ml-2 h-4 w-4" /> تعديل
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteClick(student.id, "student")
                                }
                                className="text-destructive"
                              >
                                <Trash2 className="ml-2 h-4 w-4" /> حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="instructors">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>إدارة المدربين</CardTitle>
                    <CardDescription>
                      إضافة وتعديل بيانات المدربين.
                    </CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/admin/instructors/new">
                      <PlusCircle className="ml-2 h-4 w-4" /> إضافة مدرب
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم المدرب</TableHead>
                      <TableHead>التخصص</TableHead>
                      <TableHead>عدد الدورات</TableHead>
                      <TableHead>
                        <span className="sr-only">إجراءات</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instructors.map((instructor) => (
                      <TableRow key={instructor.id}>
                        <TableCell className="font-medium">
                          {instructor.name}
                        </TableCell>
                        <TableCell>{instructor.specialty}</TableCell>
                        <TableCell>{instructor.coursesTaught}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onSelect={() =>
                                  router.push(
                                    `/admin/instructors/${instructor.id}/edit`,
                                  )
                                }
                              >
                                <Edit className="ml-2 h-4 w-4" /> تعديل
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteClick(instructor.id, "instructor")
                                }
                                className="text-destructive"
                              >
                                <Trash2 className="ml-2 h-4 w-4" /> حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد تماماً؟</AlertDialogTitle>
            <AlertDialogDescription>
              هذا الإجراء لا يمكن التراجع عنه. سيؤدي هذا إلى حذف العنصر بشكل
              دائم من قاعدة البيانات.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}