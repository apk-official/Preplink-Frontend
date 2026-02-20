import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveItem } from "@/redux/slices/menuSlice";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useState } from "react";

/**
 * Renders main menu navigation for the application
 *
 * @remarks
 * This is a responsive component, works on both Desktop and Mobile
 * It shows Company Logo, List of Menu Items, Avatar and Mobile menu toggle
 *
 * @returns
 * A responsive navigation with Company Logo, Menu Items and Avatar
 *
 */

export default function MenuBar() {
  // Menu items displayed in the navigation bar
  const menuItems = ["Home", "Settings", "Logout"];
  // Local state to handle mobile menu toggle(Open/Close)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //Redux dispatch to update active menu state globally
  const dispatch = useAppDispatch();
  //Active menu Item for Redux Store
  const activeItem = useAppSelector((state) => state.menu.activeItem);
  const { me } = useAppSelector((state) => state.user);
  if (!me) return <div>No user data</div>;
  /**
   * Helper function to derive route path for a given menu item
   *
   * @param item Menu item names
   * @returns Corresponding path string
   */
  function getNavPath(item: string): string {
    // Convert menu item pascal case name to lower case
    return item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
  }
  return (
    // Menu in Col
    <div className="flex flex-col justify-between w-full">
      {/* Desktop Menu Bar Full  */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-between p-1 bg-[#FEFFFE] rounded-full py-3.5 px-5 shadow-[0_4px_15px_rgba(227,227,227,0.5)]">
            PrepLink
          </div>
        </div>

        {/* Navbar Desktop */}
        <nav className="hidden md:flex items-center justify-between gap-4 p-1 bg-[#FEFFFE] rounded-full shadow-[0_4px_15px_rgba(227,227,227,0.5)]">
          {menuItems.map((item) => (
            <NavLink
              key={item}
              to={getNavPath(item)}
              onClick={() => dispatch(setActiveItem(item))}
              className={cn(
                "py-2.5 px-5 rounded-full",
                activeItem === item
                  ? "bg-[#7247FF] text-[#FEFFFE]"
                  : "text-[#131515] transition delay-100 duration-200 ease-in hover:bg-[#E0D6FF]"
              )}
            >
              {item}
            </NavLink>
          ))}
        </nav>
        {/* Mobile Menu - Avatar Container  */}
        <div className="flex gap-2 items-center justify-center">
          {/* Avatar  */}

          <Avatar>
            <AvatarImage
              src={me.img_url}
              alt="AvatarImage"
              className="h-[44px] w-[44px]"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* Mobile menu Icon  */}
          <button
            className={
              "outline-none border-none md:hidden flex items-center justify-between p-1 bg-[#FEFFFE] rounded-full py-3.5 px-5 cursor-pointer"
            }
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <XIcon size={20} weight="thin" />
            ) : (
              <ListIcon size={20} weight="thin" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu  */}
      {isMenuOpen && (
        <div className={"relative w-full md:hidden"}>
          <nav className="absolute inset-x-0 top-3 md:hidden flex flex-col items-center justify-between gap-4 p-4 bg-[#FEFFFE] rounded-4xl w-full transition delay-50 duration-200 ease-in">
            {menuItems.map((item) => (
              <NavLink
                key={item}
                to={getNavPath(item)}
                onClick={() => {
                  dispatch(setActiveItem(item));
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "py-2.5 px-5 rounded-full w-full text-center",
                  activeItem === item
                    ? "bg-[#5E2BFF] text-[#FEFFFE]"
                    : "text-[#131515] transition delay-100 duration-200 ease-in hover:bg-[#E0D6FF]"
                )}
              >
                {item}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
