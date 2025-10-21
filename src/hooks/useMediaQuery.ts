"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

type MediaQueryType = "desktop" | "mobile";

const useDeviceType = (): MediaQueryType => {
  const [deviceType, setDeviceType] = useState<MediaQueryType>("desktop");

  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 1199px)" });

  useEffect(() => {
    if (isDesktop) {
      setDeviceType("desktop");
    } else if (isMobile) {
      setDeviceType("mobile");
    }
  }, [isDesktop, isMobile]);

  return deviceType;
};

export default useDeviceType;
