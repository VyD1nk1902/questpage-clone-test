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

const tabsData = [
  {
    id: 1,
    icon: XLogoIcon,
    title: "Follow @archerhunter_HQ on X",
    subTitle: "1000 point",
    btn: "Go",
  },
  {
    id: 2,
    icon: XLogoIcon,
    title: "Retweet the Tweet",
    subTitle: "1000 point",
    btn: "Go",
  },
  {
    id: 3,
    icon: XLogoIcon,
    title: "Have the Members role in GaiAl Discord Server",
    subTitle: "1000 point",
    btn: "Verify",
  },
  {
    id: 4,
    icon: DiscordLogoIcon,
    title: "Have the og role in GaiAl Discord Server",
    subTitle: "1000 point",
    btn: "Verify",
  },
  {
    id: 5,
    icon: DiscordLogoIcon,
    title: "Have the builder role in GaiAl Discord Server",
    subTitle: "1000 point",
    btn: "Verify",
  },
];

const QuestTab = () => {
  return (
    <div>
      <div>
        <Tabs defaultValue="once">
          <div className="flex justify-between items-center">
            <span className="px-6">Quest</span>
            <TabsList className="h-10">
              <TabsTrigger
                value="once"
                className="data-[state=active]:bg-primary"
              >
                Once
              </TabsTrigger>
              <TabsTrigger
                value="daily"
                className="data-[state=active]:bg-primary"
              >
                Daily
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="once" className="flex flex-col gap-3">
            {tabsData.map((item) => {
              const IconComponent = item.icon;
              return (
                <Card className="flex items-center gap-3 px-6 py-4 bg-background">
                  <CardHeader className="p-2">
                    {item.icon === DiscordLogoIcon ? (
                      <IconComponent size={24} weight="fill" fill="white" />
                    ) : (
                      <IconComponent size={24} />
                    )}
                  </CardHeader>
                  <CardContent className="p-0 flex-grow flex-shrink-0 basis-0">
                    <div className="flex flex-col gap-2 ">
                      <span className="text-sm">{item.title}</span>
                      <span className="flex gap-1">
                        <img
                          src="/public/Mission/diamond-logo.png"
                          alt="diamond-logo"
                          className="w-4 h-4"
                        />
                        <span className="text-muted-foreground text-xs">
                          {item.subTitle}
                        </span>
                      </span>
                    </div>
                  </CardContent>

                  <Button className="py-0 px-3 bg-card !rounded">
                    {item.btn}
                  </Button>
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
      </div>
    </div>
  );
};
export default QuestTab;
