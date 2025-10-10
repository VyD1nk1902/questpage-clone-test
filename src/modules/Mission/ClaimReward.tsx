import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "@phosphor-icons/react";
import { DiamondLogo } from "@/constants/image.constant";
import { useParams } from "react-router-dom";
import useApi from "@/hooks/useApi";
import { missionApi } from "@/apis/mission.api";
import CountdownComponent from "@/components/CountdownComponent";
import Countdown, { CountdownRendererFn } from "react-countdown";

const ClaimReward = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useApi(slug ? missionApi.getCampaignsBySlug(slug) : null);
  const Completionist = () => (
    <span className="text-xs font-medium">End at: 0h : 0m : 0s</span>
  );

  const renderer: CountdownRendererFn = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    const totalHours = days * 24 + hours;
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span className="text-xs font-medium">
          End at: {totalHours}h : {minutes}m : {seconds}s
        </span>
      );
    }
  };

  const endDate = data?.data.endDate ? new Date(data.data.endDate) : null;

  return (
    <div className="flex h-[65px] px-6 py-3 justify-center items-center gap-4 rounded-[6px] border border-border shadow-sm bg-gradient-to-b from-indigo-900 to-sky-950">
      <div className="transform -translate-y-2.5">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={DiamondLogo}
            className="w-full h-full object-cover"
            alt="Avatar"
          />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-1 flex-1 flex-shrink-0 basis-0">
        <span className="text-lg font-bold">
          {data?.data.reward || 0} Point
        </span>

        {endDate && <Countdown date={endDate} renderer={renderer} />}
      </div>
      <Button
        variant={"icon"}
        className="!rounded-[6px] bg-[#18181b]/40 w-[124px] hover:bg-[#18181b]/80 text-sm font-medium"
        size={"default"}
      >
        Claim Reward
      </Button>
      <Button
        variant={"icon"}
        size={"default"}
        className="!rounded-[6px] w-9 bg-[#18181b]/40 hover:bg-[#18181b]/80"
      >
        <InfoIcon size={36} />
      </Button>
    </div>
  );
};
export default ClaimReward;
