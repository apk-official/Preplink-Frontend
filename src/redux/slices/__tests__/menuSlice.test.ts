import menuReducer, { setActiveItem } from "@/redux/slices/menuSlice";
import type { Action } from "@reduxjs/toolkit";
import { describe, test, expect } from "vitest";

describe("menuSlice reducer", () => {
  test("Should return initial state", () => {
    const initial = undefined;
    const state = menuReducer(initial, { type: "" } as Action);
    expect(state).toEqual({ activeItem: "Home" });
  });

  test("activeItem should update activeItem", () => {
    const initialState = { activeItem: "Home" };
    const next = menuReducer(initialState, setActiveItem("Settings"));
    expect(next.activeItem).toBe("Settings");
  });
});
