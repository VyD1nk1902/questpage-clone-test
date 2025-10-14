import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";
import useDeviceType from "@/hooks/useMediaQuery";

import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

import {
  DiamondLogo,
  banner,
  bgCarousel_1,
  bgCarousel_2,
  bgCarousel_3,
} from "@/constants/image.constant";
import useApi from "@/hooks/useApi";
import { missionApi } from "@/apis/mission.api";
import { ICampaign } from "@/types/mission.type";
import { useAppData } from "@/hooks/useAppData";

const Banner = () => {
  const deviceType = useDeviceType();
  const { campaigns } = useAppData();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full rounded-[24px]">
        <img
          src={banner}
          className="w-full h-full object-contain aspect-2/1"
          alt="banner"
        />
      </div>
      <div>
        <span className="text-xl font-semibold px-2">Campaigns</span>
        <div
          className={cn(
            "w-full flex items-center justify-center",
            deviceType == "desktop" ? "h-[306px]" : "h-[290px]"
          )}
        >
          <Carousel className="w-full relative" opts={{ loop: true }}>
            <CarouselContent>
              {campaigns?.data &&
                campaigns?.data.data.map((item: ICampaign) => (
                  <CarouselItem
                    key={item._id}
                    className="sm:basis-1/2 md:basis-1/3 w-full cursor-pointer"
                    onClick={() => navigate(`/campaign/${item.slug}`)}
                  >
                    <div className="w-full h-full flex flex-col items-center gap-1 flex-grow flex-shrink-0 basis-0 rounded-2xl bg-[linear-gradient(180deg,var(--background)_0%,var(--accent)_100%)] border border-border overflow-hidden">
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

                      <div className="w-full flex p-4 gap-2 flex-col ">
                        <span className="text-base font-semibold">
                          {item.name}
                        </span>
                        <Separator />
                        <span className="flex gap-1">
                          <img
                            src={DiamondLogo}
                            className="w-4 h-4"
                            alt="diamond-logo"
                          />
                          {item.reward} Point
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="!absolute left-3" />
            <CarouselNext className="!absolute right-3" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Banner;
