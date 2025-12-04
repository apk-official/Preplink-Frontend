import { SidebarSimpleIcon } from "@phosphor-icons/react";
import { SidebarTrigger } from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TopBar() {
  return (
    <div className="sticky top-0 bg-[#fefefe] h-12 w-full border-b border-b-[#E5E5E5] flex items-center justify-between px-2 md:px-4 lg:px-5 xl:px-8 2xl:px-10">
      <SidebarTrigger className="cursor-pointer">
        <SidebarSimpleIcon />
      </SidebarTrigger>
      {/* Avatar  */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>Avatar Image</AvatarFallback>
      </Avatar>
    </div>
  );
}
