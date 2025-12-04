import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  activeItem: string;
}

const initialState: MenuState = {
  activeItem: "/",
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setActiveItem: (state, action: PayloadAction<string>) => {
      state.activeItem = action.payload;
    },
  },
});

export const { setActiveItem } = menuSlice.actions;
export default menuSlice.reducer;
