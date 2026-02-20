import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthTokens } from "@/redux/slices/authslice";
import { fetchMe } from "@/redux/slices/userSlice";

export default function AuthCallback() {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

useEffect(() => {
  const access = params.get("access_token");
  const refresh = params.get("refresh_token");

  if (!access || !refresh) {
    navigate("/auth/login");
    return;
  }

  dispatch(setAuthTokens({ access_token: access, refresh_token: refresh }));
  dispatch(fetchMe());


  window.history.replaceState({}, document.title, "/auth/callback");

  // Then navigate to home
  navigate("/", { replace: true });

}, [params, dispatch, navigate]);

  return <div className="p-6 text-sm">Signing you in…</div>;
}