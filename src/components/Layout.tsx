import { Outlet } from "react-router";
import TopBar from "./TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "./AppSideBar";

export default function Layout() {
  return (
    <SidebarProvider>
      
      <div className="flex min-h-screen w-screen bg-[#FEFEFE]">
       <AppSideBar /> 
        <div className="flex flex-1 flex-col">
          <TopBar />
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </div>

    </SidebarProvider>
  );
}
