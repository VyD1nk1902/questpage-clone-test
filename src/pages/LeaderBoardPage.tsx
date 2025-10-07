import React from "react";
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

const LeaderBoardPage = () => {
  const dataTable = [
    {
      id: "1",
      name: "CryptoHawk",
      code: "0x45f...d7b8",
      avatar: "/public/Homepage/ava-1.png",
      total: "999",
    },
    {
      id: "2",
      name: "BlockSmith",
      code: "0x76d...ea92",
      avatar: "/public/Homepage/ava-2.png",
      total: "988",
    },
    {
      id: "3",
      name: "TokenMaster",
      code: "0x89a...f3d7",
      avatar: "/public/Homepage/ava-3.png",
      total: "977",
    },
    {
      id: "4",
      name: "DigiTrader",
      code: "0xb3e...c8f1",
      avatar: "/public/Homepage/ava-4.png",
      total: "966",
    },
    {
      id: "5",
      name: "NinjaCoins",
      code: "0x2b5...e4a9",
      avatar: "/public/Homepage/ava-5.png",
      total: "966",
    },
    {
      id: "6",
      name: "ChainVoyager",
      code: "0x1c9...f8d3",
      avatar: "/public/Homepage/ava-6.png",
      total: "966",
    },
    {
      id: "7",
      name: "Web3Whale",
      code: "0x3f8...b2c6",
      avatar: "/public/Homepage/ava-7.png",
      total: "966",
    },
    {
      id: "8",
      name: "MetaMaverick",
      code: "0x4e2...d3f5",
      avatar: "/public/Homepage/ava-8.png",
      total: "966",
    },
    {
      id: "9",
      name: "LedgerGuru",
      code: "0x7c1...f9a8",
      avatar: "/public/Homepage/ava-9.png",
      total: "966",
    },
    {
      id: "10",
      name: "SatoshiScribe",
      code: "0xa1b...f6c2",
      avatar: "/public/Homepage/ava-9.png",
      total: "966",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col">
      <Tabs defaultValue="daily">
        <div className="w-full flex items-center justify-between">
          <span className="text-3xl sm:text-5xl font-bold">Leaderboard</span>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
        </div>

        <>
          <TabsContent value="daily">
            <LeaderBoard data={dataTable} levelColumn={true} />
          </TabsContent>
          <TabsContent value="weekly">
            <LeaderBoard data={[]} levelColumn={true} />
          </TabsContent>
          <TabsContent value="all">
            <LeaderBoard data={[]} levelColumn={true} />
          </TabsContent>
        </>
      </Tabs>

      <Pagination
        className="ant-pagination !mt-4"
        pageSize={2}
        // onChange={updatePage}
        align="center"
        // current={1}
        defaultCurrent={1}
        total={dataTable.length}
        prevIcon={
          <div className="h-7 w-fit px-3 flex gap-1 items-center select-none">
            <CaretLeft className="w-4 h-4 object-cover text-foreground" />
            <span>Previous</span>
          </div>
        }
        nextIcon={
          <div className="h-7 w-fit px-3 flex gap-1 items-center select-none">
            <span>Next</span>
            <CaretRight className="w-4 h-4 object-cover text-foreground" />
          </div>
        }
      />
    </div>
  );
};

export default LeaderBoardPage;
