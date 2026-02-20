import { Navigate } from "react-router";
import { useAppSelector } from "@/redux/hooks";
import type { JSX } from "react";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const access = useAppSelector((s) => s.auth.accessToken);
  return access ? children : <Navigate to="/auth/login" replace />;
}