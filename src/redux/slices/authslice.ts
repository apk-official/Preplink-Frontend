import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { apiFetch, clearTokens, setTokens } from "@/lib/api";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  accessToken: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),
};

// Backend logout call
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const res = await apiFetch("/api/v1/auth/logout", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens(
      state,
      action: PayloadAction<{ access_token: string; refresh_token: string }>,
    ) {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      setTokens(action.payload.access_token, action.payload.refresh_token);
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      clearTokens();
    },
  },
});

export const { setAuthTokens, logout } = authSlice.actions;
export default authSlice.reducer;
