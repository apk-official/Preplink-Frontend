import { SidebarSimpleIcon } from "@phosphor-icons/react";
import { SidebarTrigger } from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/redux/hooks";
import { Badge } from "./ui/badge";

export default function TopBar() {
  const { me } = useAppSelector((state) => state.user);
    if (!me) return <div>No user data</div>;
  return (
    <div className="sticky top-0 bg-[#fefefe] h-12 w-full border-b border-b-[#E5E5E5] flex items-center justify-between px-2 md:px-4 lg:px-5 xl:px-8 2xl:px-10">
      <SidebarTrigger className="cursor-pointer">
        <SidebarSimpleIcon />
      </SidebarTrigger>
      {/* Avatar  */}
      <div className="flex items-center justify-center gap-2">
        <Badge variant="outline">Credits {me.credits }</Badge>
        <Avatar>
        <AvatarImage src={me.img_url} />
        <AvatarFallback>Avatar Image</AvatarFallback>
      </Avatar>
      </div>
      
    </div>
  );
}
