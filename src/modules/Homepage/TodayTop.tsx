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

const TodayTop = () => {
  return (
    <div className="w-full pr-10 flex flex-col gap-2">
      <div className="flex justify-between items-center w-full">
        <span className="text-sm font-semibold">Today Top 10</span>
        <Button
          variant={"default"}
          className="bg-accent !rounded border border-border"
          size={"sm"}
        >
          View all <CaretRightIcon />
        </Button>
      </div>
      <div className="rounded-xl overflow-hidden border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center py-5 align-middle">
                <span className="p-2 bg-secondary rounded border border-border text-lg">
                  1
                </span>
              </TableHead>
              <TableHead className="py-3 align-middle">
                <div className="flex gap-3 items-center text-foreground text-sm font-medium">
                  Wallet
                </div>
              </TableHead>
              <TableHead className="py-3">
                <div className="flex gap-2 justify-end items-center text-foreground text-base font-bold">
                  <img
                    src="/public/Mission/diamond-logo.png"
                    className="w-4 h-4"
                    alt="diamond-logo"
                  />
                  12
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataTable.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="w-10 text-center py-3 align-middle">
                  <span className="p-2 bg-secondary rounded border border-border text-lg">
                    {item.id}
                  </span>
                </TableCell>
                <TableCell className="py-3 align-middle">
                  <div className="flex gap-3 items-center">
                    <Avatar>
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
                <TableCell className="py-3">
                  <div className="flex gap-2 justify-end items-center text-base font-bold">
                    <img
                      src="/public/Mission/diamond-logo.png"
                      className="w-4 h-4"
                      alt="diamond-logo"
                    />
                    {item.total}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TodayTop;
