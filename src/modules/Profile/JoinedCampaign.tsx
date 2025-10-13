import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  bgCarousel_1,
  bgCarousel_2,
  bgCarousel_3,
  DiamondLogo,
} from "@/constants/image.constant";
import { Separator } from "@/components/ui/separator";

const data = [
  {
    id: "1",
    background: bgCarousel_1,
    title: "It's time for Capybaras!",
    desc: "1000 Point",
  },
  {
    id: "2",
    background: bgCarousel_3,
    title: "It's time for Capybaras!",
    desc: "1000 Point",
  },
  {
    id: "3",
    background: bgCarousel_3,
    title: "It's time for Capybaras!",
    desc: "1000 Point",
  },
  {
    id: "4",
    background: bgCarousel_2,
    title: "It's time for Capybaras!",
    desc: "1000 Point",
  },
];

const JoinedCampaign = () => {
  return (
    <div className="flex flex-col">
      <div className="h-10 px-6">
        <span className="text-sm font-semibold">Joined Campaign</span>
      </div>

      <CardContent className="grid grid-cols-3 gap-4 px-4">
        {data.map((item) => (
          <Link to="#">
            <div className="w-full flex flex-col items-center gap-1 flex-grow flex-shrink-0 basis-0 rounded-2xl bg-[linear-gradient(180deg,var(--background)_0%,var(--accent)_100%)] border border-border overflow-hidden">
              <div className="relative w-full aspect-[253.33/158.33]">
                <img
                  src={item.background}
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

              <div className="w-full flex p-3 gap-2 flex-col ">
                <span className="text-base font-semibold text-ellipsis">
                  {item.title}
                </span>
                <Separator />
                <span className="flex gap-1">
                  <img
                    src={DiamondLogo}
                    className="w-4 h-4"
                    alt="diamond-logo"
                  />
                  {item.desc}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </div>
  );
};

export default JoinedCampaign;
