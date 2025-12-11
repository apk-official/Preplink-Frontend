import ForgotPassword from "@/components/ForgotPassword";
import Layout from "@/components/Layout";
import LoginForm from "@/components/LoginForm";
import ProjectDetails from "@/components/ProjectDetails";
import Login from "@/features/auth/Login";
import HomePage from "@/features/dashboard/HomePage";
import SettingsPage from "@/features/dashboard/SettingsPage";
import { BrowserRouter, Routes, Route } from "react-router";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route  */}
        <Route path="/auth/" element={<Login />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="project/:id" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
