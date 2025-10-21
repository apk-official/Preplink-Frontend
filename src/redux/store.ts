import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/redux/slices/menuSlice";

export const store = configureStore({
  reducer: { menu: menuReducer },
});

// Types of Typscript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
