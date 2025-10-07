import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";
import useDeviceType from "@/hooks/useMediaQuery";

import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

import {
  DiamondLogo,
  banner,
  bgCarousel_1,
  bgCarousel_2,
  bgCarousel_3,
} from "@/constants/image.constant";

const dataCarousel = [
  {
    id: "1",
    background: bgCarousel_1,
    title: "It's time for Capybaras!",
    desc: "1000 Point",
  },
  {
    id: "2",
    background: bgCarousel_2,
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
    background: bgCarousel_1,
    title: "It's time for Capybaras!",
    desc: "1000 Point",
  },
  {
    id: "5",
    background: bgCarousel_2,
    title: "It's time for Capybaras!",
    desc: "1000 Point",
  },
  {
    id: "6",
    background: bgCarousel_3,
    title: "It's time for Capybaras!",
    desc: "1000 Point",
  },
];

const Banner = () => {
  const deviceType = useDeviceType();
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
              {dataCarousel.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="sm:basis-1/2 md:basis-1/3 w-full"
                >
                  <Link to="/">
                    <div className="w-full h-full flex flex-col items-center gap-1 flex-grow flex-shrink-0 basis-0 rounded-2xl bg-[linear-gradient(180deg,var(--background)_0%,var(--accent)_100%)] border border-border overflow-hidden">
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

                      <div className="w-full flex p-4 gap-2 flex-col ">
                        <span className="text-base font-semibold">
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
