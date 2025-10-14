import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LeaderBoard from "../LeaderBoard";
import useApi from "@/hooks/useApi";
import { userApi } from "@/apis/user.api";
import PaginationComponent from "../PaginationComponent";
import { useAppData } from "@/hooks/useAppData";

const LeaderboardSheet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  //   const { data } = useApi(userApi.getLeaderBoard("all", currentPage, 10));
  const { leaderBoard } = useAppData({
    leaderboardType: "all",
    currentPage: currentPage,
    sizePage: 10,
  });
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (leaderBoard?.data?.pagination?.total) {
      setTotal(leaderBoard?.data.pagination.total);
    }
  }, [leaderBoard?.data?.pagination?.total]);

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex -space-x-2">
          <Avatar>
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </div>
      </SheetTrigger>
      <SheetContent className="!max-w-xl bg-background">
        <SheetHeader>
          <SheetTitle>Leaderboard</SheetTitle>
          <SheetDescription>
            Compete with friends to top the charts
          </SheetDescription>
          <LeaderBoard
            data={leaderBoard?.data?.data || []}
            levelColumn={true}
            type="all"
            currentPage={currentPage}
          />
          <PaginationComponent
            total={total}
            currentPage={currentPage}
            setCurrentPage={(page: number) => setCurrentPage(page)}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default LeaderboardSheet;
