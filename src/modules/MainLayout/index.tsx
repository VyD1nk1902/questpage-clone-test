import React from "react";
import Header from "./Header";
import useDeviceType from "@/hooks/useMediaQuery";
import Footer from "./Footer";
import { cn } from "classnames-merge-tw";
import { AppSidebar } from "@/components/SideBar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Index = ({ children }: { children: React.ReactNode }) => {
  const deviceType = useDeviceType();

  return (
    <SidebarProvider>
      {deviceType == "desktop" && <AppSidebar side="left" variant="sidebar" />}
      <SidebarInset>
        <Header />
        <main
          className={cn(
            "flex-1 pb-24 flex flex-col bg-background",
            deviceType == "desktop" ? "pt-24 h-screen" : "w-full pt-[72px]"
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
