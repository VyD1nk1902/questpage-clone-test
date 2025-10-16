import { Button } from "@/components/ui/button";
import { CaretRightIcon } from "@phosphor-icons/react";
import LeaderBoard from "@/components/LeaderBoard";
import { useNavigate } from "react-router-dom";
import { userApi } from "@/apis/user.api";
import useApi from "@/hooks/useApi";
import { useUserStore } from "@/stores/user.store";
import { useAppData } from "@/hooks/useAppData";
import { useEffect, useRef } from "react";

const TodayTop = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppData();
  const { checkLeaderboardHome, setCheckLeaderboard } = useUserStore();

  const { leaderBoard } = useAppData({
    leaderboardType: "all",
    currentPage: 1,
    sizePage: 10,
    walletAddress: userInfo?.data?.data?.walletAddress,
  });

  useEffect(() => {
    if (checkLeaderboardHome) {
      leaderBoard.mutate();
      setCheckLeaderboard("home");
    }
  }, [checkLeaderboardHome]);

  const deviceType = useDeviceType();
  return (
    <div
      className={cn(
        "w-full  flex flex-col gap-2",
        deviceType == "desktop" && "pr-10"
      )}
    >
      <div className="flex justify-between items-center w-full">
        <span className="text-sm font-semibold">Today Top 10</span>
        <Button
          variant={"default"}
          className="bg-accent !rounded border border-border hover:bg-border"
          size={"sm"}
          onClick={() => navigate("/leaderboard")}
        >
          View all <CaretRightIcon />
        </Button>
      </div>
      <div className="rounded-xl overflow-hidden border border-border">
        <LeaderBoard
          data={leaderBoard?.data?.data || []}
          myRank={leaderBoard?.data?.myRank}
        />
      </div>
    </div>
  );
};

export default TodayTop;
