import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import {
  bgCarousel_1,
  bgCarousel_2,
  bgCarousel_3,
  DiamondLogo,
} from "@/constants/image.constant";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/stores/user.store";
import { userApi } from "@/apis/user.api";
import useApi from "@/hooks/useApi";
import { missionApi } from "@/apis/mission.api";
import { useEffect, useMemo, useState } from "react";
import { useAppData } from "@/hooks/useAppData";

const JoinedCampaign = () => {
  const navigate = useNavigate();

  const { userInfo, campaigns } = useAppData();

  const joinCampaign = useMemo(() => {
    if (!userInfo.data || !campaigns.data) return [];

    const joinedIds = new Set(
      userInfo.data?.data?.campaigns?.map((c: any) => c._id.toString()) || []
    );

    return (
      campaigns.data.data?.filter((campaign: any) =>
        joinedIds.has(campaign._id.toString())
      ) || []
    );
  }, [userInfo.data, campaigns.data]);

  return (
    <div className="flex flex-col">
      <div className="h-10 px-6">
        <span className="text-sm font-semibold">Joined Campaign</span>
      </div>

      <CardContent className="grid sm:grid-cols-3 max-sm:grid-cols-2 gap-4 px-4">
        {joinCampaign &&
          joinCampaign.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => navigate(`/campaign/${item.slug}`)}
              className="w-full cursor-pointer flex flex-col items-center gap-1 flex-grow flex-shrink-0 basis-0 rounded-2xl bg-[linear-gradient(180deg,var(--background)_0%,var(--accent)_100%)] border border-border overflow-hidden"
            >
              <div className="relative w-full aspect-[253.33/158.33]">
                <img
                  src={item.banner}
                  className=" w-full h-full rounded-t-2xl object-cover"
                  alt="background-carousel"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 z-10"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0)50%, var(--accent) 100%)",
                  }}
                ></div>
              </div>

              <div className="w-full h-full flex flex-col justify-between p-3 gap-2">
                <span className="text-base font-semibold line-clamp-2">
                  {item.name}
                </span>
                <Separator />
                <span className="flex gap-1">
                  <img
                    src={DiamondLogo}
                    className="w-4 h-4"
                    alt="diamond-logo"
                  />
                  <span className="line-clamp-4">{item.description}</span>
                </span>
              </div>
            </div>
          ))}
      </CardContent>
    </div>
  );
};

export default JoinedCampaign;
