import Banner from "@/modules/HomePage/Banner";
import TodayTop from "@/modules/HomePage/TodayTop";
import React from "react";
import useDeviceType from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const deviceType = useDeviceType();
  return (
    <div
      className={cn(
        "px-3 py-5 gap-6",
        deviceType == "desktop" ? "grid grid-cols-[60%_40%]" : "flex flex-col"
      )}
    >
      <Banner />
      <TodayTop />
    </div>
  );
};

export default HomePage;
