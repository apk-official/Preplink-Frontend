import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/redux/slices/menuSlice";
import projectReducer from "@/redux/slices/projectSlice";
import projectDetailReducer from "@/redux/slices/projectDetailsSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    project: projectReducer,
    projectDetails: projectDetailReducer,
  },
});

// Types of Typscript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
