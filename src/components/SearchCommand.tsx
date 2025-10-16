import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import useDeviceType from "@/hooks/useMediaQuery";
// import useFetchData from "@/hooks/useFetchData";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import { DiamondLogo } from "@/constants/image.constant";
import { Item } from "@radix-ui/react-dropdown-menu";
import useApi from "@/hooks/useApi";
import { missionApi } from "@/apis/mission.api";
import { useAppData } from "@/hooks/useAppData";

interface SearchCommandProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const SearchCommand: React.FC<SearchCommandProps> = ({ open, setOpen }) => {
  const [searchItem, setSearchItem] = useState("");
  const deviceType = useDeviceType();
  // const { campaign, loading } = useFetchData();
  const navigate = useNavigate();

  const { campaigns } = useAppData();

  const isSearching = searchItem.trim().length > 1;
  const dataSearch = isSearching
    ? campaigns?.data?.data
    : campaigns?.data?.data.slice(0, 6);

  return (
    <div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a Command or search..."
          value={searchItem}
          onValueChange={(value) => setSearchItem(value)}
          className="w-[90%]"
          autoFocus={false}
        />
        <CommandList
          className={cn(
            "max-h-screen flex-1 hide-scrollbar bg-accent",
            deviceType == "mobile" && "pb-20"
          )}
        >
          <CommandEmpty>
            {campaigns?.isLoading ? "Loading" : "No Result found."}
          </CommandEmpty>
          <Separator />
          <CommandGroup heading="Campaign">
            <div className={cn("flex flex-col p-3 gap-3")}>
              {dataSearch &&
                dataSearch.map((item: any) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.title} ${item.desc}`}
                    className="flex justify-center gap-1 !p-0 rounded-[16px] !bg-background border border-white/10 cursor-pointer"
                    // onSelect={() => {
                    //   navigate(`/campaign/${item.id}`);
                    //   setOpen(false);
                    // }}
                  >
                    <img
                      src={item.banner}
                      alt={item.banner}
                      className="w-32 min-w-32 aspect-square object-cover rounded-l-[16px]"
                    />
                    <div className="flex flex-col gap-2 p-3 flex-1">
                      <span>{item.name}</span>
                      <Separator />
                      <span className="flex gap-1">
                        <img src={DiamondLogo} className="h-4 w-4" alt="icon" />
                        {item.description}
                      </span>
                    </div>
                  </CommandItem>
                ))}
            </div>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchCommand;
