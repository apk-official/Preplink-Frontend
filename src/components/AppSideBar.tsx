import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { HouseIcon, GearSixIcon, SignOutIcon } from "@phosphor-icons/react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { NavLink, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { setActiveItem } from "@/redux/slices/menuSlice";
import { useEffect } from "react";
// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: HouseIcon,
  },
  {
    title: "Settings",
    url: "settings",
    icon: GearSixIcon,
  },
  {
    title: "LogOut",
    url: "logout",
    icon: SignOutIcon,
  },
];
export default function AppSideBar() {
  //Redux dispatch to update active menu state globally
  const dispatch = useAppDispatch();
  //Active menu Item for Redux Store
  const activeItem = useAppSelector((state) => state.menu.activeItem);
  const location = useLocation();

  useEffect(() => {
    dispatch(setActiveItem(location.pathname));
  }, [location.pathname,dispatch]);
  return (
    <Sidebar>
      <SidebarContent className="bg-[#fefefe] px-3 gap-0">
        <SidebarHeader>
          <p className="font-bold">PrepLink</p>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => dispatch(setActiveItem(item.url))}
                    className={cn(
                      "py-5 px-5 rounded-lg cursor-pointer",
                      activeItem === item.url
                        ? "bg-[#E9E5F6] text-[#5E2BFF] font-medium hover:bg-[#E9E5F6] hover:text-[#5E2BFF] hover:font-medium"
                        : "text-[#131515] hover:bg-[#E9E5F6]"
                    )}
                  >
                    <NavLink key={item.title} to={item.url}>
                      {activeItem === item.url ? (
                        <item.icon weight="fill" />
                      ) : (
                        <item.icon />
                      )}
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
