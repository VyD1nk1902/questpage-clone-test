import Banner from "@/modules/HomePage/Banner";
import TodayTop from "@/modules/HomePage/TodayTop";
import React from "react";

const HomePage = () => {
  return (
    <div className="grid grid-cols-[60%_40%] gap-6 px-3 py-5">
      <Banner />
      <TodayTop />
    </div>
  );
};

export default HomePage;
