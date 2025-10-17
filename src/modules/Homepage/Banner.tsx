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
      <div className="w-full relative">
        <img
          src={banner}
          alt="banner"
          className="w-full h-full object-cover !rounded-[24px] max-sm:rounded-[16px] aspect-[2/1] max-sm:aspect-[351.00/175.50]"
        />
        {/* <div className="absolute inset-0 z-10 rounded-[24px] max-sm:rounded-[16px] bg-gradient-overlay"></div> */}
        <div className="absolute z-10 right-0 bottom-0 flex w-[150px] h-[52px] gap-1 justify-center items-center bg-[linear-gradient(180deg,var(--background)_0%,var(--accent)_100%)] rounded-tl-3xl rounded-br-3xl">
          <img src={DiamondLogo} className="w-7 h-7" alt="diamond_logo" />
          <span className="text-lg font-medium">1000 Point</span>
        </div>
        <div className="absolute z-10 left-0 bottom-0 p-3 md:p-6 w-[70%]">
          <span className="text-xl sm:text-3xl font-bold line-clamp-2">
            It's time for Capybaras!
          </span>
        </div>
      </div>
      <div>
        <span className="text-xl font-semibold px-2">Campaigns</span>
        <div
          className={cn(
            "w-full flex items-center justify-center",
            deviceType == "desktop" ? "h-[306px]" : "h-[260px]"
          )}
        >
          <Carousel
            className="w-full h-[90%]"
            opts={{ loop: true, align: "start", dragFree: true }}
          >
            <CarouselContent>
              {campaigns?.data &&
                campaigns?.data.data.map((item: ICampaign) => (
                  <CarouselItem
                    key={item._id}
                    className="max-md:basis-1/2 md:basis-1/3 w-full cursor-pointer"
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

                      <div className="w-full h-full flex flex-col justify-between p-4 gap-2 ">
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
                          {item.reward} Point
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="!absolute left-3 !z-50" />
            <CarouselNext className="!absolute right-3 !z-50" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Banner;
