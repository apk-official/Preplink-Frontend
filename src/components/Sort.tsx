import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { FunnelSimpleIcon } from "@phosphor-icons/react";

const SortByItems = ["Newest First", "Oldest First", "Name (A-Z)", "Name (Z-A)"]

export default function Sort() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-[#F1EDFE] outline-none focus-visible:ring-0 border-none hover:bg-[#DED4FE] cursor-pointer text-[#131515]">
          <FunnelSimpleIcon/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SortByItems.map((item)=>(<DropdownMenuItem className="cursor-pointer focus:bg-[#F1EDFE]">
          {item}
        </DropdownMenuItem>))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
