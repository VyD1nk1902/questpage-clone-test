import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "@phosphor-icons/react";

const ClaimReward = () => {
  return (
    <div className="flex h-[65px] px-6 py-3 justify-center items-center gap-4 rounded-[6px] border border-border shadow-sm bg-gradient-to-b from-indigo-900 to-sky-950">
      <div className="transform -translate-y-2.5">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src="/public/Mission/diamond-logo.png"
            className="w-full h-full object-cover"
            alt="Avatar"
          />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-1 flex-1 flex-shrink-0 basis-0">
        <span className="text-lg font-bold">1000 Point</span>
        <span className="text-xs font-medium">End at: 10 h:43 m: 34 s</span>
      </div>
      <Button
        variant={"icon"}
        className="!rounded-[6px] bg-[#18181b]/55 w-[124px] text-sm font-medium"
        size={"default"}
      >
        Claim Reward
      </Button>
      <Button
        variant={"icon"}
        size={"default"}
        className="!rounded-[6px] w-9 bg-[#18181b]/55"
      >
        <InfoIcon size={36} />
      </Button>
    </div>
  );
};
export default ClaimReward;
