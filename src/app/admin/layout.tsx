'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { GraduationCap, LayoutDashboard, BookCopy, Users, UserCheck } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar side="right">
          <SidebarHeader>
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
              <GraduationCap className="h-7 w-7" />
              <span className="group-data-[collapsible=icon]:hidden">لوحة تحكم الأدمن</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === '/admin/dashboard'}
                  tooltip={{children: 'لوحة التحكم'}}
                >
                  <Link href="/admin/dashboard">
                    <LayoutDashboard />
                    <span className="group-data-[collapsible=icon]:hidden">لوحة التحكم</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname.startsWith('/admin/courses')}
                  tooltip={{children: 'إدارة الدورات'}}
                >
                  <Link href="/admin/courses">
                    <BookCopy />
                    <span className="group-data-[collapsible=icon]:hidden">إدارة الدورات</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname.startsWith('/admin/students')}
                  tooltip={{children: 'إدارة الطلاب'}}
                >
                  <Link href="/admin/students">
                    <Users />
                    <span className="group-data-[collapsible=icon]:hidden">إدارة الطلاب</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname.startsWith('/admin/instructors')}
                  tooltip={{children: 'إدارة المدربين'}}
                >
                  <Link href="/admin/instructors">
                    <UserCheck />
                    <span className="group-data-[collapsible=icon]:hidden">إدارة المدربين</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="w-full">
                  <LogoutButton />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="bg-secondary/30">
          <header className="flex items-center justify-between p-4 border-b bg-background">
             <SidebarTrigger className="md:hidden" />
             <h1 className="text-2xl font-headline font-bold text-primary">إدارة الأكاديمية</h1>
             <div></div>
          </header>
          <main className="p-4 md:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
