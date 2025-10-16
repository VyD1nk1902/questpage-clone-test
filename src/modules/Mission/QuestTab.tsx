import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DiscordLogoIcon,
  WarningCircleIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { DiamondLogo } from "@/constants/image.constant";
import { useParams } from "react-router-dom";
import useApi from "@/hooks/useApi";
import { missionApi } from "@/apis/mission.api";
import { IMission } from "@/types/mission.type";
import { userApi } from "@/apis/user.api";
import { useUserStore } from "@/stores/user.store";
import { showSuccessToast } from "@/utils/toast.utils";
import { cn } from "@/lib/utils";
import SettingUserModal from "@/components/modal/SettingUserModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import instance from "@/apis/instance";
import { useAppData } from "@/hooks/useAppData";
import { useUpdateData } from "@/hooks/useUpdateData";

const QuestTab = () => {
  const { token } = useUserStore();
  const { setClaimPoint } = useUserStore();
  const { updateUserInfo } = useUpdateData();
  const { userInfo, campaignBySlug } = useAppData();
  const { missionByCampaign } = useAppData({
    campaignId: campaignBySlug?.data?.data?._id,
  });

  const handleCompleteMission = async (
    missionId: string,
    point: number,
    url: string
  ) => {
    window.open(url, "_blank");
    try {
      const response = await missionApi.completeMission(missionId, point);
      if (response) {
        const newMission = {
          _id: missionId,
          point,
          dateClaim: null,
          isClaimed: false,
        };

        const existing = userInfo?.data?.data?.missions || [];

        updateUserInfo({ missions: [...existing, newMission] });

        const updatedMissions = [...existing, newMission].map((item: any) => ({
          _id: item._id.toString(),
        }));

        const isAllMissionsCompleted = missionByCampaign?.data?.data?.every(
          (mission: any) =>
            updatedMissions.some(
              (completed: any) => completed._id === mission._id.toString()
            )
        );

        const hasJoined = userInfo?.data?.data?.campaigns
          ? userInfo?.data?.data?.campaigns.find(
              (item: any) =>
                item._id.toString() == campaignBySlug?.data?.data._id
            )
          : null;

        if (!hasJoined) {
          const newCampaign = {
            _id: campaignBySlug?.data?.data._id,
            point: campaignBySlug?.data?.data.reward,
            dateClaim: null,
            isClaimed: false,
            isCompleted: false,
          };
          const existingCampaign = userInfo?.data?.data?.campaigns || [];

          updateUserInfo({ campaigns: [...existingCampaign, newCampaign] });
        }

        if (isAllMissionsCompleted) {
          await missionApi.completeCampaign(campaignBySlug.data?.data._id);
          if (!hasJoined) {
            const newCampaign = {
              _id: campaignBySlug.data?.data._id,
              point: campaignBySlug.data?.data.reward,
              dateClaim: null,
              isClaimed: false,
              isCompleted: true,
            };
            const existingCampaign = userInfo?.data?.data?.campaigns || [];

            updateUserInfo({ campaigns: [...existingCampaign, newCampaign] });
          } else {
            const existingCampaigns = userInfo?.data?.data?.campaigns || [];
            const updatedCampaigns = existingCampaigns.map((item: any) => {
              if (
                item._id.toString() === campaignBySlug.data?.data._id.toString()
              ) {
                return { ...item, isCompleted: true };
              }
              return item;
            });

            updateUserInfo({ campaigns: updatedCampaigns });
          }
        } else {
          if (!hasJoined) {
            const newCampaign = {
              _id: campaignBySlug.data?.data._id,
              point: campaignBySlug.data?.data.reward,
              dateClaim: null,
              isClaimed: false,
              isCompleted: false,
            };
            const existingCampaign = userInfo.data?.data?.campaigns || [];

            updateUserInfo({ campaigns: [...existingCampaign, newCampaign] });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClaimMission = async (missionId: string) => {
    try {
      const data = await missionApi.claimMission(missionId);
      if (data) {
        const newMission = data.data.missions;
        const newLevel = data.data.level;
        const newXP = data.data.xp;

        updateUserInfo({ level: newLevel, xp: newXP, missions: newMission });

        setClaimPoint();

        showSuccessToast(
          "Mission Claimed Successfully",
          "You have successfully claimed the mission reward."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const completedMissionIds = userInfo.data?.data?.missions
    ? userInfo.data?.data?.missions.map((item: any) => ({
        _id: item._id.toString(),
        isClaimed: item.isClaimed,
      }))
    : [];

  const checkMissionComplete = (missionId: string) => {
    return completedMissionIds.some(
      (mission: any) => mission._id === missionId
    );
  };

  const checkMissionClaim = (missionId: string) => {
    const mission = userInfo.data?.data.missions?.find(
      (item: any) => item._id == missionId
    );
    return mission?.isClaimed;
  };

  const checkVerify = (mission_type_name: string) => {
    let isVerify = false;
    if (mission_type_name == "X") {
      if (userInfo.data?.data?.twitter) {
        isVerify = true;
      }
    }

    if (mission_type_name == "Discord") {
      if (userInfo.data?.data?.discord) {
        isVerify = true;
      }
    }

    if (mission_type_name == "Telegram") {
      if (userInfo.data?.data?.telegram) {
        isVerify = true;
      }
    }

    return isVerify;
  };

  return (
    <Tabs defaultValue="once">
      <div className="flex justify-between items-center">
        <span className="px-6 text-sm font-semibold">Quest</span>
        <TabsList className="h-10">
          <TabsTrigger value="once" className="data-[state=active]:bg-primary">
            Once
          </TabsTrigger>
          <TabsTrigger value="daily" className="data-[state=active]:bg-primary">
            Daily
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="once" className="flex flex-col gap-3">
        {missionByCampaign.data &&
          missionByCampaign.data.data.map((item: IMission) => {
            return (
              <Card
                key={item._id}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 bg-background",
                  !token &&
                    "cursor-not-allowed pointer-events-none opacity-50 select-none"
                )}
              >
                <CardHeader className="p-2">
                  {item.mission_type.name == "Discord" ? (
                    <DiscordLogoIcon size={24} weight="fill" fill="white" />
                  ) : (
                    <XLogoIcon size={24} />
                  )}
                </CardHeader>
                <CardContent className="p-0 flex-grow flex-shrink-0 basis-0">
                  <div className="flex flex-col gap-2 justify-center">
                    <span className="text-sm">{item.name}</span>
                    <span className="flex gap-1">
                      <img
                        src={DiamondLogo}
                        alt="diamond-logo"
                        className="w-4 h-4"
                      />
                      <span className="text-muted-foreground text-xs">
                        {item.description}
                      </span>
                    </span>
                  </div>
                </CardContent>

                {!checkVerify(item.mission_type.name) ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="h-7 bg-popover border border-border w-fit rounded-md hover:opacity-80">
                        Verify
                      </Button>
                    </DialogTrigger>
                    <SettingUserModal selectedTab="social" />
                  </Dialog>
                ) : (
                  <Button
                    variant={"icon"}
                    disabled={checkMissionClaim(item._id)}
                    className={cn(
                      "!rounded-[6px] w-[124px] text-sm font-medium",
                      !checkMissionComplete(item._id)
                        ? "bg-card hover:opacity-80"
                        : "",
                      checkMissionComplete(item._id) &&
                        !checkMissionClaim(item._id)
                        ? "bg-primary hover:opacity-80"
                        : "",
                      checkMissionClaim(item._id)
                        ? "bg-green-600/60 cursor-not-allowed"
                        : ""
                    )}
                    size="default"
                    onClick={() => {
                      if (!checkMissionComplete(item._id)) {
                        handleCompleteMission(
                          item._id,
                          item.point,
                          item.action.url
                        );
                      }
                      if (
                        checkMissionComplete(item._id) &&
                        !checkMissionClaim(item._id)
                      ) {
                        handleClaimMission(item._id);
                      }
                    }}
                  >
                    {!checkMissionComplete(item._id) && "Go"}
                    {checkMissionComplete(item._id) &&
                      !checkMissionClaim(item._id) &&
                      "Claim Reward"}
                    {checkMissionClaim(item._id) && "Claimed"}
                  </Button>
                )}
              </Card>
            );
          })}
      </TabsContent>
      <TabsContent value="daily">
        <Card className="flex flex-col items-center justify-center p-20 bg-background">
          <CardHeader>
            <WarningCircleIcon size={32} />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <span>Oops!!!</span>
            </div>
          </CardContent>
          <CardFooter>
            <span className="font-normal text-muted-foreground">
              No mission available
            </span>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
export default QuestTab;
