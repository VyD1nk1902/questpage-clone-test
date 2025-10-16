import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LeaderBoard from "@/components/LeaderBoard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { userApi } from "@/apis/user.api";
import useApi from "@/hooks/useApi";
import PaginationComponent from "@/components/PaginationComponent";
import { useAppData } from "@/hooks/useAppData";
import { useUserStore } from "@/stores/user.store";
import { cn } from "@/lib/utils";
import useDeviceType from "@/hooks/useMediaQuery";

const LeaderBoardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("daily");
  const { checkLeaderboardPage, setCheckLeaderboard } = useUserStore();
  const deviceType = useDeviceType();

  const { leaderBoard } = useAppData({
    leaderboardType: type,
    currentPage: currentPage,
    sizePage: 10,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (leaderBoard?.data?.pagination?.total) {
      setTotal(leaderBoard?.data.pagination.total);
    }
  }, [leaderBoard?.data?.pagination?.total]);

  useEffect(() => {
    if (checkLeaderboardPage) {
      leaderBoard.mutate();
      setCheckLeaderboard("leaderboard");
    }
  }, [checkLeaderboardPage]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col !py-3">
      <Tabs value={type} onValueChange={setType} className="max-[450px]:pl-5">
        <div
          className={cn(
            "w-full flex",
            deviceType == "desktop"
              ? "items-center justify-between"
              : "flex-col items-start gap-6"
          )}
        >
          <span className="text-3xl sm:text-5xl font-bold">Leaderboard</span>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="week">Weekly</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
        </div>

        <>
          <TabsContent value="daily">
            <LeaderBoard
              data={leaderBoard?.data?.data || []}
              levelColumn={true}
              type="daily"
              currentPage={currentPage}
            />
          </TabsContent>
          <TabsContent value="week">
            <LeaderBoard
              data={leaderBoard?.data?.data || []}
              levelColumn={true}
              type="week"
              currentPage={currentPage}
            />
          </TabsContent>
          <TabsContent value="all">
            <LeaderBoard
              data={leaderBoard?.data?.data || []}
              levelColumn={true}
              type="all"
              currentPage={currentPage}
            />
          </TabsContent>
        </>
      </Tabs>

      <PaginationComponent
        total={total}
        currentPage={currentPage}
        setCurrentPage={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
};

export default LeaderBoardPage;
