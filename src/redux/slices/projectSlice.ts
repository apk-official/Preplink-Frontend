import { apiFetch } from "@/lib/api";
import { mockProjects } from "@/mock/mockData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Projects{
    project_id: number;
    company_name: string,
    company_logo:string,
    position: string,
    created_at:string,
}

type ProjectState = {
  items: Projects[];
  status: "idle" | "loading" | "ready" | "error";
  error?: string;
};

const initialState: ProjectState = {
  items: [],
  status: "idle",
};

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    const res = await apiFetch("/api/v1/prep/");
    if (!res.ok) throw new Error("Failed to fetch projects");
    return (await res.json()) as Projects[];
  }
);





const projectSlice = createSlice({
    name: "project",
  initialState,
  reducers: {
    clearProjects(state) {
      state.items = [];
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "ready";
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to fetch projects";
      });
  },
})

export const { clearProjects } = projectSlice.actions;
export default projectSlice.reducer;