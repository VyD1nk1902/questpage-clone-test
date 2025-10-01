import React from "react";
import HomePage from "./HomePage";
import ArcherHunter from "@/modules/Mission/ArcherHunter";
import { Separator } from "@/components/ui/separator";
import ClaimReward from "@/modules/Mission/ClaimReward";

const Mission = () => {
  return (
    <div className="main-content">
      <ArcherHunter />
      <Separator />
      <ClaimReward />
      <Separator />
    </div>
  );
};

export default Mission;
