import React from "react";
import Banner from "@/modules/Homepage/Banner";
import TodayTop from "@/modules/Homepage/TodayTop";

const HomePage = () => {
  return (
    <div className="grid grid-cols-[60%_40%] gap-6 px-3 py-5">
      <Banner />
      <TodayTop />
    </div>
  );
};

export default HomePage;
