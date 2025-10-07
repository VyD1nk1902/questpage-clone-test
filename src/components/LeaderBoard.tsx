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
import DiamondLogo from "@/assets/Mission/diamond-logo.png";

interface LeaderBoardProps {
  data: any;
  levelColumn?: boolean;
  myRank?: boolean;
}

const LeaderBoard = (props: LeaderBoardProps) => {
  const { data, levelColumn, myRank } = props;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-14 text-center py-5 align-middle">
            {myRank ? (
              <span className="px-2 py-1 bg-secondary rounded border border-border text-lg">
                1
              </span>
            ) : (
              <span className="p-2 text-sm">#</span>
            )}
          </TableHead>
          <TableHead className="py-3 align-middle">
            <div className="flex gap-3 items-center text-foreground text-sm font-medium">
              Wallet
            </div>
          </TableHead>
          {levelColumn && (
            <TableHead className="p-2 w-16">
              <span className="text-sm">LV</span>
            </TableHead>
          )}
          <TableHead className="p-2 w-24">
            {myRank ? (
              <div className="flex gap-2 justify-start items-center text-base font-bold">
                <img src={DiamondLogo} className="w-4 h-4" alt="diamond-logo" />
                12
              </div>
            ) : (
              <span className="text-sm">Total pts</span>
            )}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="min-h-[650px] h-[650px]">
        {data.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell className="w-10 text-center py-3 align-middle">
              <span className="px-2 py-1 bg-secondary rounded border border-border text-lg">
                {item.id}
              </span>
            </TableCell>
            <TableCell className="py-3 align-middle">
              <div className="flex gap-3 items-center">
                <Avatar className="w-6 h-6 object-contain">
                  <AvatarImage src={item.avatar} alt={item.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.code}
                  </span>
                </div>
              </div>
            </TableCell>
            {levelColumn && (
              <TableCell className="py-3">
                <span>24</span>
              </TableCell>
            )}

            <TableCell className="py-3">
              <div className="flex gap-2 justify-start items-center text-base font-bold">
                <img src={DiamondLogo} className="w-4 h-4" alt="diamond-logo" />
                {item.total}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaderBoard;
