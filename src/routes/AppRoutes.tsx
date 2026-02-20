import AuthCallback from "@/components/AuthCallback";
import Layout from "@/components/Layout";
import LoginForm from "@/components/LoginForm";
import ProjectDetails from "@/components/ProjectDetails";
import Login from "@/features/auth/Login";
import HomePage from "@/features/dashboard/HomePage";
import ResumeOptimiser from "@/features/dashboard/ResumeOptimiser";
import SettingsPage from "@/features/dashboard/SettingsPage";
import RequireAuth from "@/components/RequireAuth"; 
import { BrowserRouter, Routes, Route } from "react-router";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/" element={<Login />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="callback" element={<AuthCallback />} />
        </Route>

        

        {/* Protected / App Routes */}
        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="resume-optimiser" element={<ResumeOptimiser />} />
          <Route path="project/:id" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}