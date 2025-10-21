import Layout from "@/components/Layout";
import Login from "@/features/auth/Login";
import HomePage from "@/features/dashboard/HomePage";
import SettingsPage from "@/features/dashboard/SettingsPage";
import { BrowserRouter, Routes, Route } from "react-router";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route  */}
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
