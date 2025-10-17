import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const QuestDetail = () => {
  return (
    <div>
      <div className="px-6 h-10 flex items-center">
        <span className="text-sm font-semibold">Quest Detail</span>
      </div>
      <Card className="bg-background sm:p-6 max-sm:p-3  flex flex-col gap-4 items-center">
        <CardContent>
          <div>
            <div className="mb-6 space-y-2 text-sm">
              <span>0.20% of Total Rewards (2M $GAIA)</span>
              <p>Description:</p>
              <p>🧩 In GaiAI, every identity is a creative symbol on-chain.</p>
              <p>
                By completing the "Creative Identity Challenge" series of quests
                in the community, you can unlock exclusive Roles and gradually
                obtain 5 creator identities.
              </p>
              <p>
                Each completed identity quest (Quest 1-5) will earn you
                additional points and increase your share of the airdrop reward
                pool.
              </p>
            </div>

            <div className="h-64 bg-muted-foreground !rounded-[6px] mb-6"></div>

            <div className="text-sm space-y-3">
              <p>Hey Somniacs, what do you like most - DeFi or Gaming?</p>
              <p>Today you don't have to choose.</p>
              <p>
                With Somnia Exchange's gamified DEX, you can enjoy both at the
                same time!
              </p>
              <p>
                Team's main goal has always been to make trading fun and
                addictive for users, so they are bringing the idea to life with
                this gamified platform.
              </p>
              <p>Swap NIA token to earn feed and grow your chicken empire!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestDetail;
