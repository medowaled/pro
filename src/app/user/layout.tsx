
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteHeader from "@/components/layout/header";
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
} from "@/components/ui/sidebar";
import {
  BookOpen,
  CreditCard,
  GraduationCap
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "@/components/LogoutButton";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Define paths where sidebar should not be displayed
  const noSidebarPaths = ["/user/payment-info"];
  const showSidebar = !noSidebarPaths.includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <SidebarProvider>
        <div className="flex flex-1">
          {showSidebar && (
            <Sidebar side="right">
              <SidebarHeader>
                <Link
                  href="/"
                  className="flex items-center gap-2 font-headline text-2xl font-bold text-primary"
                >
                  <div className="text-right min-w-0">
                    <h1 className="text-lg font-bold leading-tight truncate">
                      {user?.name || 'مستر مصطفى خليل'}
                    </h1>
                    <p className="text-xs text-foreground/70 leading-tight truncate">
                      لوحة تحكم الطالب
                    </p>
                  </div>
                </Link>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/user/my-courses"}
                      tooltip={{ children: "دوراتي" }}
                    >
                      <Link href="/user/my-courses">
                        <BookOpen />
                        <span className="group-data-[collapsible=icon]:hidden">
                          دوراتي
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/user/payment-info"}
                      tooltip={{ children: "الدفع" }}
                    >
                      <Link href="/user/payment-info">
                        <CreditCard />
                        <span className="group-data-[collapsible=icon]:hidden">
                          معلومات الدفع
                        </span>
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
          )}
          <SidebarInset className="bg-secondary/30">
            <header className="flex items-center justify-between p-4 border-b bg-background">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-2xl font-headline font-bold text-primary">لوحة تحكم الطالب</h1>
              <div></div>
            </header>
            <main className="p-4 md:p-8">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
