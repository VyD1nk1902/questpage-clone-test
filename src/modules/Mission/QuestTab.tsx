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

const QuestTab = () => {
  const { token } = useUserStore();
  const { slug } = useParams<{ slug: string }>();
  const { data } = useApi(slug ? missionApi.getCampaignsBySlug(slug) : null);
  const { data: dataMission } = useApi(
    data?.data._id ? missionApi.getMissionByCampaign(data?.data._id) : null
  );
  const { data: dataUser, mutate } = useApi(token ? userApi.getUserInfo : null);

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
                className="flex items-center gap-3 px-6 py-4 bg-background"
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

                {!checkMissionComplete(item._id) ? (
                  <Button
                    className="py-0 px-3 bg-card !rounded hover:opacity-80"
                    onClick={() =>
                      handleCompleteMission(
                        item._id,
                        item.point,
                        item.action.url
                      )
                    }
                  >
                    Go
                  </Button>
                ) : (
                  <Button
                    disabled={checkMissionClaim(item._id) ? true : false}
                    className="py-0 px-3 !rounded hover:opacity-80"
                    onClick={() => handleClaimMission(item._id)}
                  >
                    Claim
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
