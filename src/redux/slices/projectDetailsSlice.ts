import { apiFetch } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProjectDetail {
  interview_questions: { question: string; answer: string; type: string }[];
  interview_tips: string[];
  about_company: {
    about: string;
    about_url: string;
    vision: string;
    vision_url: string;
    mission: string;
    mission_url: string;
    additional: string;
    additional_url: string;
  };
}

/** ✅ what backend returns (based on your FastAPI code) */
type BackendInterviewQuestion = {
  question: string;
  answer: string;
  question_type?: string; // ✅ this is what your backend sends
  type?: string; // optional fallback
};

type BackendPrepDetailResponse = {
  interview_question?: BackendInterviewQuestion[];
  interview_questions?: BackendInterviewQuestion[];
  interview_tips?: unknown[];
  about_company?: unknown;
};

type ProjectDetailsState = {
  byId: Record<number, ProjectDetail>;
  statusById: Record<number, "idle" | "loading" | "ready" | "error">;
  errorById: Record<number, string | undefined>;
};

const EMPTY_ABOUT: ProjectDetail["about_company"] = {
  about: "",
  about_url: "",
  vision: "",
  vision_url: "",
  mission: "",
  mission_url: "",
  additional: "",
  additional_url: "",
};

const initialState: ProjectDetailsState = {
  byId: {},
  statusById: {},
  errorById: {},
};

// helpers to normalize unknown backend shapes
function normalizeTips(
  input: BackendPrepDetailResponse["interview_tips"],
): string[] {
  if (!Array.isArray(input)) return [];
  // if backend returns string[]
  if (input.every((t) => typeof t === "string")) return input as string[];

  // if backend returns objects like { tip: "..." } or { content: "..." }
  return input
    .map((t) => {
      if (typeof t === "string") return t;
      if (t && typeof t === "object") {
        const obj = t as Record<string, unknown>;
        const tip = obj.tip ?? obj.content ?? obj.text;
        return typeof tip === "string" ? tip : null;
      }
      return null;
    })
    .filter((x): x is string => Boolean(x));
}

function normalizeAbout(
  input: BackendPrepDetailResponse["about_company"],
): ProjectDetail["about_company"] {
  if (!input) return EMPTY_ABOUT;

  // if backend returns list (because .all())
  const first = Array.isArray(input) ? input[0] : input;
  if (!first || typeof first !== "object") return EMPTY_ABOUT;

  const obj = first as Record<string, unknown>;

  return {
    about: typeof obj.about === "string" ? obj.about : "",
    about_url: typeof obj.about_url === "string" ? obj.about_url : "",
    vision: typeof obj.vision === "string" ? obj.vision : "",
    vision_url: typeof obj.vision_url === "string" ? obj.vision_url : "",
    mission: typeof obj.mission === "string" ? obj.mission : "",
    mission_url: typeof obj.mission_url === "string" ? obj.mission_url : "",
    additional: typeof obj.additional === "string" ? obj.additional : "",
    additional_url:
      typeof obj.additional_url === "string" ? obj.additional_url : "",
  };
}

export const fetchProjectDetails = createAsyncThunk(
  "projectDetails/fetchProjectDetails",
  async (projectId: number) => {
    const res = await apiFetch(`/api/v1/prep/${projectId}`);
    if (!res.ok) throw new Error("Failed to fetch project details");

    const raw = (await res.json()) as BackendPrepDetailResponse;

    const data: ProjectDetail = {
      interview_questions: (
        raw.interview_question ??
        raw.interview_questions ??
        []
      ).map((q) => ({
        question: q.question,
        answer: q.answer,
        type: (q.type ?? q.question_type ?? "Other").trim() || "Other",
      })),
      interview_tips: normalizeTips(raw.interview_tips),
      about_company: normalizeAbout(raw.about_company),
    };

    return { projectId, data };
  },
);

const projectDetailsSlice = createSlice({
  name: "projectDetails",
  initialState,
  reducers: {
    clearProjectDetails(state, action: { payload: number }) {
      const id = action.payload;
      delete state.byId[id];
      delete state.statusById[id];
      delete state.errorById[id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectDetails.pending, (state, action) => {
        const id = action.meta.arg;
        state.statusById[id] = "loading";
        state.errorById[id] = undefined;
      })
      .addCase(fetchProjectDetails.fulfilled, (state, action) => {
        const { projectId, data } = action.payload;
        state.byId[projectId] = data;
        state.statusById[projectId] = "ready";
      })
      .addCase(fetchProjectDetails.rejected, (state, action) => {
        const id = action.meta.arg;
        state.statusById[id] = "error";
        state.errorById[id] = action.error.message ?? "Failed to fetch details";
      });
  },
});

export const { clearProjectDetails } = projectDetailsSlice.actions;
export default projectDetailsSlice.reducer;
