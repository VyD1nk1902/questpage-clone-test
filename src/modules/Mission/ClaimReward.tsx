import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "@phosphor-icons/react";
import { DiamondLogo } from "@/constants/image.constant";
import { useParams } from "react-router-dom";
import useApi from "@/hooks/useApi";
import { missionApi } from "@/apis/mission.api";
import CountdownComponent from "@/components/CountdownComponent";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/user.store";
import { userApi } from "@/apis/user.api";
import { showSuccessToast } from "@/utils/toast.utils";
import { cn } from "@/lib/utils";
import useDeviceType from "@/hooks/useMediaQuery";
import { useAppData } from "@/hooks/useAppData";
import { useUpdateData } from "@/hooks/useUpdateData";
import { Divide } from "lucide-react";

const ClaimReward = () => {
  const { slug } = useParams<{ slug: string }>();
  const { updateUserInfo } = useUpdateData();
  const { setClaimPoint } = useUserStore();
  const { userInfo, campaignBySlug } = useAppData();
  const deviceType = useDeviceType();

  const [checkClaimCampaign, setCheckClaimCampaign] = useState<
    "unComplete" | "complete" | "claim"
  >("unComplete");
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
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span className="text-xs font-medium">
          End at: {days}d : {hours}h : {minutes}m : {seconds}s
        </span>
      );
    }
  };

  useEffect(() => {
    const campaignsOfUser = userInfo?.data?.data.campaigns;
    if (campaignsOfUser) {
      const joinedCampaign = campaignsOfUser.find(
        (c: any) =>
          c._id.toString() === campaignBySlug?.data?.data._id.toString()
      );
      if (!joinedCampaign || !joinedCampaign.isCompleted) {
        setCheckClaimCampaign("unComplete");
      } else if (!joinedCampaign.isClaimed && joinedCampaign.isCompleted) {
        setCheckClaimCampaign("complete");
      } else {
        setCheckClaimCampaign("claim");
      }
    }
  }, [slug, userInfo.data, campaignBySlug.data]);

  const endDate = campaignBySlug?.data?.data.endDate
    ? new Date(campaignBySlug?.data.data.endDate)
    : null;

  const handleClaimCampaign = async (campaignId: string) => {
    try {
      const data = await missionApi.claimCampaign(campaignId);
      if (data) {
        const newCampaigns = data.data.campaigns;
        const newLevel = data.data.level;
        const newXP = data.data.xp;

        updateUserInfo({ level: newLevel, xp: newXP, campaigns: newCampaigns });

        setClaimPoint();

        showSuccessToast(
          "Campaign Claimed Successfully",
          "You have successfully claimed the campaign reward."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {deviceType == "desktop" ? (
        <div className="flex h-[65px] justify-center items-center  px-6 py-3 gap-4 rounded-[6px] border border-border shadow-sm bg-gradient-to-b from-indigo-900 to-sky-950">
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
              {campaignBySlug?.data?.data.reward || 0} Point
            </span>

            {endDate && <Countdown date={endDate} renderer={renderer} />}
          </div>
          <Button
            variant={"icon"}
            disabled={
              checkClaimCampaign === "unComplete" ||
              checkClaimCampaign === "claim"
            }
            className={cn(
              "!rounded-[6px] w-[124px] text-sm font-medium",
              checkClaimCampaign === "unComplete"
                ? "bg-gray-500/40 cursor-not-allowed"
                : "",
              checkClaimCampaign === "complete"
                ? "bg-[#18181b]/40 hover:bg-[#18181b]/80"
                : "",
              checkClaimCampaign === "claim"
                ? "bg-green-600/60 cursor-not-allowed"
                : ""
            )}
            size="default"
            onClick={() => {
              if (checkClaimCampaign === "complete") {
                handleClaimCampaign(campaignBySlug?.data?.data._id);
              }
            }}
          >
            {checkClaimCampaign === "unComplete" && "Incomplete"}
            {checkClaimCampaign === "complete" && "Claim Reward"}
            {checkClaimCampaign === "claim" && "Claimed"}
          </Button>
          <Button
            variant={"icon"}
            size={"default"}
            className="!rounded-[6px] w-9 bg-[#18181b]/40 hover:bg-[#18181b]/80"
          >
            <InfoIcon size={36} />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-full items-start justify-center px-6 py-3 gap-3.5 rounded-[6px] border border-border shadow-sm bg-gradient-to-b from-indigo-900 to-sky-950">
          <div className="flex gap-4 items-start h-12">
            <div className="transform -translate-y-4">
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
                {campaignBySlug?.data?.data.reward || 0} Point
              </span>

              {endDate && <Countdown date={endDate} renderer={renderer} />}
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              variant={"icon"}
              disabled={
                checkClaimCampaign === "unComplete" ||
                checkClaimCampaign === "claim"
              }
              className={cn(
                "!rounded-[6px] w-[124px] text-sm font-medium",
                checkClaimCampaign === "unComplete"
                  ? "bg-gray-500/40 cursor-not-allowed"
                  : "",
                checkClaimCampaign === "complete"
                  ? "bg-[#18181b]/40 hover:bg-[#18181b]/80"
                  : "",
                checkClaimCampaign === "claim"
                  ? "bg-green-600/60 cursor-not-allowed"
                  : ""
              )}
              size="default"
              onClick={() => {
                if (checkClaimCampaign === "complete") {
                  handleClaimCampaign(campaignBySlug?.data?.data._id);
                }
              }}
            >
              {checkClaimCampaign === "unComplete" && "Incomplete"}
              {checkClaimCampaign === "complete" && "Claim Reward"}
              {checkClaimCampaign === "claim" && "Claimed"}
            </Button>
            <Button
              variant={"icon"}
              size={"default"}
              className="!rounded-[6px] w-9 bg-[#18181b]/40 hover:bg-[#18181b]/80"
            >
              <InfoIcon size={36} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default ClaimReward;
