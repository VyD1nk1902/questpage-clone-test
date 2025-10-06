import React from "react";
import Header from "./Header";
import useDeviceType from "@/hooks/useMediaQuery";
import Footer from "./Footer";
import { cn } from "classnames-merge-tw";
import { useLocation, useParams } from "react-router-dom";

import { AppSidebar } from "@/components/SideBar/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const Index = ({ children }: { children: React.ReactNode }) => {
  const deviceType = useDeviceType();

  return (
    <SidebarProvider>
      <AppSidebar side="left" variant="sidebar" />
      <SidebarInset>
        <Header />
        <main
          className={cn(
            "flex-1 pb-6 flex flex-col bg-background",
            deviceType == "desktop" ? "pt-[80px] h-screen" : "w-full pt-[72px]"
          )}
        >
          {children}
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Index;
