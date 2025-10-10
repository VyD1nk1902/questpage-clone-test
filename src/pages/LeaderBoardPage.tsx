import React, { useEffect, useState } from "react";
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

const LeaderBoardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("daily");
  const { data } = useApi(userApi.getLeaderBoard(type, currentPage, 10));
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (data?.pagination?.total) {
      setTotal(data.pagination.total);
    }
  }, [data?.pagination?.total]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col">
      <Tabs value={type} onValueChange={setType}>
        <div className="w-full flex items-center justify-between">
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
              data={data?.data || []}
              levelColumn={true}
              type="daily"
              currentPage={currentPage}
            />
          </TabsContent>
          <TabsContent value="week">
            <LeaderBoard
              data={data?.data || []}
              levelColumn={true}
              type="week"
              currentPage={currentPage}
            />
          </TabsContent>
          <TabsContent value="all">
            <LeaderBoard
              data={data?.data || []}
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
