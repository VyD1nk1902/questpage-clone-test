import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ethLogo, LineVertical, DiamondLogo } from "@/constants/image.constant";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ClockIcon } from "@phosphor-icons/react";
import { Progress } from "@/components/ui/progress";

const ProfileHead = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Profile</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">CryptoHawk</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-6 px-6">
        <Avatar className="w-16 h-16">
          <AvatarImage
            className="w-full h-full object-cover"
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full flex justify-between items-end">
          <div className="flex flex-col gap-2 justify-center">
            <span className="text-lg font-medium">CryptoHawk</span>
            <div className="flex gap-3 p-1 pr-3 bg-secondary rounded-3xl">
              <img src={ethLogo} alt="eth-logo" />
              <span className="text-sm font-medium text-muted-foreground">
                0x45f...d7b8
              </span>
            </div>
          </div>

          <Button
            variant={"outline"}
            size={"default"}
            className="bg-accent hover:bg-border"
          >
            Edit Profile
          </Button>
        </div>
      </div>
      <Separator />
      <div className="px-6 flex gap-6">
        <div className="flex gap-3 justify-center items-center">
          <div className="bg-secondary rounded-full flex justify-center items-center w-7 h-7">
            <ClockIcon size={16} color="#e7e2e9" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground">
              Join at
            </span>
            <span className="text-sm font-medium">12/29/2025</span>
          </div>
        </div>
        <img src={LineVertical} alt="line-separator" />
        <div className="w-[40%] flex gap-3 justify-center items-center">
          <img src={DiamondLogo} className="w-7 h-7" alt="diamond-logo" />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground">
              Total Loyalty
            </span>
            <span className="text-sm font-medium">1000 Point</span>
          </div>
        </div>
        <img src={LineVertical} alt="line-separator" />
        <div className="w-full flex flex-col gap-2 justify-center">
          <div className="flex justify-between">
            <span>Lv 1</span>
            <span>10/100XP</span>
          </div>
          <Progress value={33} />
        </div>
      </div>
    </div>
  );
};

export default ProfileHead;
