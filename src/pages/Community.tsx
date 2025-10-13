import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  bg_Discord,
  bg_Galxe,
  bg_Tele,
  bg_X,
} from "@/constants/image.constant";

import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { UserIcon } from "@phosphor-icons/react";

const data = [
  {
    id: "1",
    background: bg_Tele,
    title: "Telegram",
    desc: "12K Members",
  },
  {
    id: "2",
    background: bg_Discord,
    title: "Discord",
    desc: "10,2K Members",
  },
  {
    id: "3",
    background: bg_X,
    title: "X",
    desc: "12,2K Members",
  },
  {
    id: "4",
    background: bg_Galxe,
    title: "Galxe",
    desc: "10,2K Members",
  },
];

const Community = () => {
  return (
    <div className="main-content !px-0 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        <span className="px-6 text-xl sm:text-3xl font-semibold">
          Our official community
        </span>
        <Carousel className="w-full relative" opts={{ loop: true }}>
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem
                key={item.id}
                className="sm:basis-1/2 md:basis-1/3 w-full"
              >
                <Link to="#">
                  <div className="w-full h-full flex flex-col items-center gap-1 flex-grow flex-shrink-0 basis-0 rounded-2xl bg-[linear-gradient(180deg,var(--background)_0%,var(--accent)_100%)] border border-border overflow-hidden">
                    <div className="relative w-full aspect-square">
                      <img
                        src={item.background}
                        className="w-full h-full rounded-t-2xl object-cover"
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
                        <UserIcon size={16} />
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
  );
};

export default Community;
