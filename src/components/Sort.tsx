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

type SortOption = "NEWEST" | "OLDEST" | "NAME_AZ" | "NAME_ZA";

const SortByItems: { label: string; value: SortOption }[] = [
  { label: "Newest First", value: "NEWEST" },
  { label: "Oldest First", value: "OLDEST" },
  { label: "Name (A-Z)", value: "NAME_AZ" },
  { label: "Name (Z-A)", value: "NAME_ZA" },
];

export default function Sort({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
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
        {SortByItems.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className="cursor-pointer focus:bg-[#F1EDFE]"
            onClick={() => onChange(item.value)}
          >
            <span className={value === item.value ? "font-medium" : ""}>
              {item.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
