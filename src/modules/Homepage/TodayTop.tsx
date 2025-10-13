import { Button } from "@/components/ui/button";
import { CaretRightIcon } from "@phosphor-icons/react";
import LeaderBoard from "@/components/LeaderBoard";
import {
  ava_1,
  ava_2,
  ava_3,
  ava_4,
  ava_5,
  ava_6,
  ava_7,
  ava_8,
  ava_9,
} from "@/constants/image.constant";
import useDeviceType from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const dataTable = [
  {
    id: "1",
    name: "CryptoHawk",
    code: "0x45f...d7b8",
    avatar: ava_1,
    total: "999",
  },
  {
    id: "2",
    name: "BlockSmith",
    code: "0x76d...ea92",
    avatar: ava_2,
    total: "988",
  },
  {
    id: "3",
    name: "TokenMaster",
    code: "0x89a...f3d7",
    avatar: ava_3,
    total: "977",
  },
  {
    id: "4",
    name: "DigiTrader",
    code: "0xb3e...c8f1",
    avatar: ava_4,
    total: "966",
  },
  {
    id: "5",
    name: "NinjaCoins",
    code: "0x2b5...e4a9",
    avatar: ava_5,
    total: "966",
  },
  {
    id: "6",
    name: "ChainVoyager",
    code: "0x1c9...f8d3",
    avatar: ava_6,
    total: "966",
  },
  {
    id: "7",
    name: "Web3Whale",
    code: "0x3f8...b2c6",
    avatar: ava_7,
    total: "966",
  },
  {
    id: "8",
    name: "MetaMaverick",
    code: "0x4e2...d3f5",
    avatar: ava_8,
    total: "966",
  },
  {
    id: "9",
    name: "LedgerGuru",
    code: "0x7c1...f9a8",
    avatar: ava_9,
    total: "966",
  },
  {
    id: "10",
    name: "SatoshiScribe",
    code: "0xa1b...f6c2",
    avatar: ava_9,
    total: "966",
  },
];

const TodayTop = () => {
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
        >
          View all <CaretRightIcon />
        </Button>
      </div>
      <div className="rounded-xl overflow-hidden border border-border">
        <LeaderBoard data={dataTable} myRank={true} />
      </div>
    </div>
  );
};

export default TodayTop;
