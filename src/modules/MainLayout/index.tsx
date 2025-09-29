import React from "react";
import Header from "./Header";
import useDeviceType from "@/hooks/useMediaQuery";
import Footer from "./Footer";
import { cn } from "classnames-merge-tw";
import { useLocation, useParams } from "react-router-dom";

const Index = ({ children }: { children: React.ReactNode }) => {
  const deviceType = useDeviceType();

  return (
    <>
      <Header />
      <main
        className={cn(
          "flex-1 pb-6 flex flex-col bg-background",
          deviceType == "desktop"
            ? "w-[70%] max-w-5xl mx-auto pt-[80px] min-w-[224px]"
            : "w-full pt-[72px]"
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Index;
