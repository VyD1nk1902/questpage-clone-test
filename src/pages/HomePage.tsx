import Banner from "@/modules/Homepage/Banner";
import TodayTop from "@/modules/Homepage/TodayTop";
import React from "react";
import useDeviceType from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const deviceType = useDeviceType();
  return (
    <div
      className={cn(
        "main-content px-3 py-5 gap-6",
        deviceType == "desktop" ? "!grid grid-cols-[60%_40%]" : "flex flex-col"
      )}
    >
      <Banner />
      <TodayTop />
    </div>
  );
};

export default HomePage;
