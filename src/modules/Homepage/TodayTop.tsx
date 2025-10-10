import { Button } from "@/components/ui/button";
import { CaretRightIcon } from "@phosphor-icons/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LeaderBoard from "@/components/LeaderBoard";
import { useNavigate } from "react-router-dom";
import { userApi } from "@/apis/user.api";
import useApi from "@/hooks/useApi";
import { useUserStore } from "@/stores/user.store";

const TodayTop = () => {
  const navigate = useNavigate();
  const { token } = useUserStore();
  const { data: dataUser } = useApi(token ? userApi.getUserInfo : null);
  const { data } = useApi(
    !dataUser
      ? userApi.getLeaderBoard("all", 1, 10)
      : userApi.getLeaderBoard("all", 1, 10, dataUser?.data.walletAddress)
  );

  return (
    <div className="w-full pr-10 flex flex-col gap-2">
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
        <LeaderBoard data={data?.data || []} myRank={data?.myRank} />
      </div>
    </div>
  );
};

export default TodayTop;
