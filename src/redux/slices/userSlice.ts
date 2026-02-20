import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { apiFetch } from "@/lib/api";
/**
 * Interface representing siingle user
 */
interface User{
    user_id: number;
    name: string;
    email: string;
    user_type: string;
    credits: number;
    disabled: boolean;
    img_url: string;
}
/**
 * Type representing user state
 * 
 *@remarks
 * Only one authenticated user is handled at a time
 */
type UserState = {
  me: User | null;
  status: "idle" | "loading" | "ready" | "error";
  error?: string;
};

const initialState: UserState = {
  me: null,
  status: "idle",
};

export const fetchMe = createAsyncThunk("user/fetchMe", async () => {
  const res = await apiFetch("/api/v1/user/");
  if (!res.ok) throw new Error("Failed to fetch user");
  return (await res.json()) as User;
});

/**
 * Redux slice for managing user-related state
 */
const userSlice = createSlice({
    name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.me = null;
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "ready";
        state.me = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to fetch user";
      });
  },
});
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;