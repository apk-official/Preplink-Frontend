import { mockProjectDetails } from "@/mock/mockData";
import { createSlice } from "@reduxjs/toolkit";
/**
 * Interface representing Project details
 */
interface ProjectDetail{
    interview_questions: { question: string; answer: string,type:string }[];
    interview_tips: string[];
    about_company: {
        about: string;
        about_url:string,
        vision: string;
        vision_url:string,
        mission: string;
        mission_url:string,
        additional: string;
        additional_url:string
    };  
}

interface ProjectDetailsState{
    [key: string]: ProjectDetail;
}

const initialState: ProjectDetailsState = mockProjectDetails;

const projectDetailsSlice = createSlice({
    name: "projectDetails",
    initialState,
    reducers: {
        setProjectDetails: (state, action) => {
            const { id, data } = action.payload;
            state[id] = data;
        }
    }
})

export const { setProjectDetails } = projectDetailsSlice.actions;
export default projectDetailsSlice.reducer;