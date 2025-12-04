import { mockProjects } from "@/mock/mockData";
import { createSlice } from "@reduxjs/toolkit";

export interface Projects{
    id: number;
    company: string,
    position: string,
    date: string,
    time: string,
}
type ProjectState = Projects[];

const initialState: ProjectState = mockProjects



const projectSlice = createSlice({
    name:"project",
    initialState,
    reducers: {
        setProject: (_, action) => action.payload,
    }
})

export const { setProject } = projectSlice.actions
export default projectSlice.reducer;