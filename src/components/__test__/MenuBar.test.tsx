import { render, screen } from "@testing-library/react";
import MenuBar from "../MenuBar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router";

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}

describe("Menubar Component", () => {
  test("renders the logo", () => {
    renderWithProviders(<MenuBar />);
    expect(screen.getByText("PrepLink")).toBeInTheDocument();
  });

  test("Renders the avatar", () => {
    renderWithProviders(<MenuBar />);
    expect(screen.getByText("CN")).toBeInTheDocument();
  });
  test("Renders all navigation menu", () => {
    renderWithProviders(<MenuBar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
