import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DiamondLogo } from "@/constants/image.constant";
import { getShortAddress } from "@/utils/common-utils";
import { cn } from "@/lib/utils";

interface LeaderBoardProps {
  data: any;
  levelColumn?: boolean;
  myRank?: any;
  type?: string;
  currentPage?: number;
}

const LeaderBoard = (props: LeaderBoardProps) => {
  const { data, levelColumn, myRank, type = "all", currentPage = 1 } = props;
  return (
    <div className={cn(!myRank && "!min-h-[716px] !h-[716px]")}>
      <Table className="border-separate border-spacing-y-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-14 text-center py-5 align-middle">
              {myRank ? (
                <span className="px-2 py-1 bg-secondary rounded border border-border text-lg">
                  {myRank?.myRank || 1}
                </span>
              ) : (
                <span className="p-2 text-sm">#</span>
              )}
            </TableHead>
            <TableHead className="py-3 align-middle">
              {myRank ? (
                <div className="flex gap-3 items-center">
                  <Avatar className="w-6 h-6 object-contain">
                    <AvatarImage
                      src={myRank?.avatar || ""}
                      alt={myRank?.username || "username"}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      {myRank?.username || "username"}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {getShortAddress(myRank?.walletAddress || "")}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-sm">Wallet</span>
              )}
            </TableHead>
            {levelColumn && (
              <TableHead className="p-2 w-16">
                <span className="text-sm">LV</span>
              </TableHead>
            )}
            <TableHead className="p-2 w-24">
              {myRank ? (
                <div className="flex gap-2 justify-start items-center text-base font-bold">
                  <img
                    src={DiamondLogo}
                    className="w-4 h-4"
                    alt="diamond-logo"
                  />
                  {myRank?.totalXp}
                </div>
              ) : (
                <span className="text-sm">Total pts</span>
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="w-10 text-center">
                  <span className="px-2 py-1 bg-secondary rounded border border-border text-lg">
                    {index + 1 + (currentPage - 1) * 10}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3 items-center">
                    <Avatar className="w-6 h-6 object-contain">
                      <AvatarImage src={item.avatar} alt={item.username} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">
                        {item.username}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {getShortAddress(item?.walletAddress || "")}
                      </span>
                    </div>
                  </div>
                </TableCell>
                {levelColumn && (
                  <TableCell>
                    <span>{item.level}</span>
                  </TableCell>
                )}

                <TableCell>
                  <div className="flex gap-2 justify-start items-center text-base font-bold">
                    <img
                      src={DiamondLogo}
                      className="w-4 h-4"
                      alt="diamond-logo"
                    />
                    {type == "daily"
                      ? item.pointDuringTheDay
                      : type == "week"
                      ? item.pointDuringTheWeek
                      : item.totalXp}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderBoard;
