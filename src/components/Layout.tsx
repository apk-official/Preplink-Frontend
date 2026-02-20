import { Outlet } from "react-router";
import TopBar from "./TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "./AppSideBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchMe } from "@/redux/slices/userSlice";

export default function Layout() {
  const dispatch = useAppDispatch();
  const access = useAppSelector((s) => s.auth.accessToken);

  useEffect(() => {
    if (access) dispatch(fetchMe());
  }, [access, dispatch]);
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
