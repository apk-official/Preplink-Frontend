import { Outlet } from "react-router";
import MenuBar from "./MenuBar";

export default function Layout() {
  return (
    <div className="p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 text-sm bg-[#F5F5F5] min-h-screen w-screen">
      <MenuBar />
      <Outlet />
    </div>
  );
}
