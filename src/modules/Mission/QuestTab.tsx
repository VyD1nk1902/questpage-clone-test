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

const QuestTab = () => {
  const { token } = useUserStore();
  const { slug } = useParams<{ slug: string }>();
  const { data: dataCampaign } = useApi(
    slug ? missionApi.getCampaignsBySlug(slug) : null
  );
  const { data: dataMission } = useApi(
    dataCampaign?.data._id
      ? missionApi.getMissionByCampaign(dataCampaign?.data._id)
      : null
  );
  const { data: dataUser, mutate } = useApi(token ? userApi.getUserInfo : null);
  const { data: leaderboardData, mutate: mutateLeaderboard } = useApi(
    userApi.getLeaderBoard("all", 1, 10, dataUser?.data.walletAddress)
  );

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

        const existing = dataUser?.data?.missions || [];
        mutate({ missions: [...existing, newMission] }, false);

        const updatedMissions = [...existing, newMission].map((item: any) => ({
          _id: item._id.toString(),
        }));

        const isAllMissionsCompleted = dataMission?.data?.every(
          (mission: any) =>
            updatedMissions.some(
              (completed: any) => completed._id === mission._id.toString()
            )
        );

        const hasJoined = dataUser?.data?.campaigns
          ? dataUser?.data?.campaigns.find(
              (item: any) => item._id.toString() == dataCampaign?.data._id
            )
          : null;

        if (!hasJoined) {
          const newCampaign = {
            _id: dataCampaign?.data._id,
            point: dataCampaign?.data.reward,
            dateClaim: null,
            isClaimed: false,
            isCompleted: false,
          };
          const existingCampaign = dataUser?.data?.campaigns || [];

          mutate({ campaigns: [...existingCampaign, newCampaign] }, false);
        }

        if (isAllMissionsCompleted) {
          await missionApi.completeCampaign(dataCampaign?.data._id);
          if (!hasJoined) {
            const newCampaign = {
              _id: dataCampaign?.data._id,
              point: dataCampaign?.data.reward,
              dateClaim: null,
              isClaimed: false,
              isCompleted: true,
            };
            const existingCampaign = dataUser?.data?.campaigns || [];
            mutate({ campaigns: [...existingCampaign, newCampaign] }, false);
          } else {
            const existingCampaigns = dataUser?.data?.campaigns || [];
            const updatedCampaigns = existingCampaigns.map((item: any) => {
              if (item._id.toString() === dataCampaign?.data._id.toString()) {
                return { ...item, isCompleted: true };
              }
              return item;
            });
            mutate({ campaigns: updatedCampaigns }, false);
          }
        } else {
          if (!hasJoined) {
            const newCampaign = {
              _id: dataCampaign?.data._id,
              point: dataCampaign?.data.reward,
              dateClaim: null,
              isClaimed: false,
              isCompleted: false,
            };
            const existingCampaign = dataUser?.data?.campaigns || [];

            mutate({ campaigns: [...existingCampaign, newCampaign] }, false);
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

        mutate({ level: newLevel, xp: newXP, missions: newMission }, false);
        await mutateLeaderboard();

        showSuccessToast(
          "Mission Claimed Successfully",
          "You have successfully claimed the mission reward."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const completedMissionIds = dataUser?.data?.missions
    ? dataUser?.data?.missions.map((item: any) => ({
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
    const mission = dataUser?.data.missions?.find(
      (item: any) => item._id == missionId
    );
    return mission?.isClaimed;
  };

  const checkVerify = (mission_type_name: string) => {
    let isVerify = false;
    if (mission_type_name == "X") {
      if (dataUser?.data?.twitter.username) {
        isVerify = true;
      }
    }

    if (mission_type_name == "Discord") {
      if (dataUser?.data?.discord.username) {
        isVerify = true;
      }
    }

    if (mission_type_name == "Telegram") {
      if (dataUser?.data?.telegram.username) {
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
        {dataMission &&
          dataMission.data.map((item: IMission) => {
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
                  <div className="flex flex-col gap-2 ">
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
