import Routes from "./Routes.js";
import React from "react";
import axios from "axios";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("axios");
window.Echo = {
  leave: jest.fn(),
  channel: (id) => ({
    listen: jest.fn(),
  }),
};

describe("should navigate to correct pages", () => {
  it("navigating and loading correct game after clicking with friend option", async () => {
    axios.post.mockImplementation((url, options) =>
      Promise.resolve({ data: { id: 1 } })
    );
    axios.get.mockImplementation((url, options) =>
      Promise.resolve({ data: { id: 1 } })
    );
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes />
      </MemoryRouter>
    );

    fireEvent.click(getByRole("button", { name: "Play against a friend" }));
    expect(axios.post).toHaveBeenCalledWith("/c4/addRoom");

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith("/c4/1"));
  });

  it("navigating to play against computer correctly", async () => {
    const { getByText, getByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes />
      </MemoryRouter>
    );

    fireEvent.click(getByRole("button", { name: "Play against Computer" }));
    expect(getByText("Strength of computer")).toBeInTheDocument();
  });
});
