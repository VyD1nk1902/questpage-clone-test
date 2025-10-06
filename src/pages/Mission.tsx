import React from "react";
import HomePage from "./HomePage";
import ArcherHunter from "@/modules/Mission/ArcherHunter";
import { Separator } from "@/components/ui/separator";
import ClaimReward from "@/modules/Mission/ClaimReward";
import QuestTab from "@/modules/Mission/QuestTab";
import QuestDetail from "@/modules/Mission/QuestDetail";

const Mission = () => {
  return (
    <div className="main-content max-w-5xl mx-auto min-w-[224px]">
      <ArcherHunter />
      <Separator />
      <ClaimReward />
      <Separator />
      <QuestTab />
      <Separator />
      <QuestDetail />
    </div>
  );
};

export default Mission;
