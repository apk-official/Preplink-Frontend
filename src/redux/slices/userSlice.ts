import { createSlice, type PayloadAction } from "@reduxjs/toolkit"; 
import { mockUserData } from "@/mock/mockData";
/**
 * Interface representing siingle user
 */
interface User{
    user_id: number;
    name: string;
    email: string;
    user_type: string;
    credits: number;
}
/**
 * Type representing user state
 * 
 *@remarks
 * Only one authenticated user is handled at a time
 */
type UserState = User;


const initialState: UserState = mockUserData;

/**
 * Redux slice for managing user-related state
 */
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser:(state,action:PayloadAction<User>)=>{return{...state,...action.payload}},
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;