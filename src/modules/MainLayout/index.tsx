import React from "react";
import Header from "./Header";
import useDeviceType from "@/hooks/useMediaQuery";
import Footer from "./Footer";
import { cn } from "classnames-merge-tw";
import { AppSidebar } from "@/components/SideBar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Dialog } from "@/components/ui/dialog";
import SettingUserModal from "@/components/modal/SettingUserModal";

const Index = ({ children }: { children: React.ReactNode }) => {
  const deviceType = useDeviceType();
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <SidebarProvider>
      {deviceType == "desktop" && (
        <AppSidebar
          side="left"
          variant="sidebar"
          setOpenDialog={setOpenDialog}
        />
      )}
      <SidebarInset>
        <Header setOpenDialog={setOpenDialog} />
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
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <SettingUserModal />
      </Dialog>
    </SidebarProvider>
  );
};

export default Index;
