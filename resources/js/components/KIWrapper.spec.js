import React from "react";
import axios from "axios";
import { render, fireEvent, waitFor } from "@testing-library/react";
import KiComponent, { selectKiMove } from "./KIWrapper";
import "@testing-library/jest-dom";

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

describe("KiComponent", () => {
  test("renders buttons for ki Control", () => {
    const { getByRole } = render(<KiComponent />);

    expect(getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(getByRole("button", { name: "3" })).toBeInTheDocument();
    expect(getByRole("button", { name: "4" })).toBeInTheDocument();
    expect(getByRole("button", { name: "5" })).toBeInTheDocument();
  });

  test("changes kiLevel after button click", () => {
    const { getByRole } = render(<KiComponent />);
    const button = getByRole("button", { name: "4" });
    fireEvent.click(button);
    expect(getByRole("button", { name: "4" })).toHaveStyle(`color: #fff`);
    expect(getByRole("button", { name: "5" })).toHaveStyle(`color: black`);
  });

  test("renders buttons for disc input", () => {
    const { getByRole } = render(<KiComponent />);

    expect(getByRole("button", { name: "insert0" })).toBeInTheDocument();
    expect(getByRole("button", { name: "insert1" })).toBeInTheDocument();
    expect(getByRole("button", { name: "insert2" })).toBeInTheDocument();
    expect(getByRole("button", { name: "insert3" })).toBeInTheDocument();
    expect(getByRole("button", { name: "insert4" })).toBeInTheDocument();
    expect(getByRole("button", { name: "insert5" })).toBeInTheDocument();
    expect(getByRole("button", { name: "insert6" })).toBeInTheDocument();
  });

  it("is placing disc in correct row when clicking input button", async () => {
    const { getByTestId, getByRole } = render(<KiComponent />);
    axios.get.mockImplementation((url, options) =>
      Promise.resolve({ data: { 0: 1, 1: 2, 3: 3, 4: 2, 5: 9999, 6: 2 } })
    );
    fireEvent.click(getByRole("button", { name: "insert6" }));
    await waitFor(() => expect(getByTestId("disc" + 48)).toBeInTheDocument());
  });

  it("is making correct api call  und placing disc for ki when clicking input button", async () => {
    const { getByRole, getByTestId } = render(<KiComponent />);
    axios.get.mockImplementation((url, options) =>
      Promise.resolve({ data: { 0: 1, 1: 2, 3: 3, 4: 2, 5: 2, 6: 9999 } })
    );
    fireEvent.click(getByRole("button", { name: "insert6" }));
    await waitFor(() => expect(getByTestId("disc" + 48)).toBeInTheDocument());
    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(
        `https://kevinalbs.com/connect4/back-end/index.php/getMoves?board_data=0000000000000000000000000000000000000000000000001&player=2`,
        expect.anything()
      )
    );
    await waitFor(() => expect(getByTestId("disc" + 41)).toBeInTheDocument());
  });
});

describe("selects kiMove from Api response correctly", () => {
  it("computer selects the best move on hardest difficulty", () => {
    let moves = { 0: 1, 1: 2, 3: 3, 4: 2, 5: 1, 6: 0 };
    let result = selectKiMove(moves, 5);
    expect(result[1]).toBe(3);

    moves = { 0: -9999, 1: 6, 3: -3, 4: 2, 5: 1, 6: 9999 };
    result = selectKiMove(moves, 5);
    expect(result[1]).toBe(6);

    moves = { 0: 1, 1: 2, 3: 3, 4: 9, 5: 9, 6: 0 };
    result = selectKiMove(moves, 5);
    const received = result[1] === 4 || result[1] === 5;
    expect(received).toBe(true);
  });

  it("computer selects not optimal first row when small error is suffienctly large ", () => {
    const mathRandomSpy = jest.spyOn(Math, "random");
    const moves = { 0: 2, 1: 2, 3: 3, 4: 2, 5: 1, 6: 0 };

    mathRandomSpy.mockImplementation(() => 0).mockImplementationOnce(() => 0.6);
    let result = selectKiMove(moves, 4);
    expect(result[1]).toBe(0);
    expect(result[0]).toBe(3.2);

    mathRandomSpy.mockImplementation(() => 0).mockImplementationOnce(() => 0.4);
    result = selectKiMove(moves, 3);
    expect(result[1]).toBe(0);
    expect(result[0]).toBe(3.2);

    mathRandomSpy.mockImplementation(() => 0).mockImplementationOnce(() => 0.3);
    result = selectKiMove(moves, 2);
    expect(result[1]).toBe(0);
    expect(result[0]).toBe(3.2);

    mathRandomSpy.mockImplementation(() => 0).mockImplementationOnce(() => 0.3);
    result = selectKiMove(moves, 1);
    expect(result[1]).toBe(0);
    expect(result[0]).toBe(3.5);
  });

  it("computer selects sometimes worst row in case of random event big error", () => {
    const mathRandomSpy = jest.spyOn(Math, "random");
    const moves = { 0: -9999, 1: 2, 3: 3, 4: 2, 5: 1, 6: 0 };

    mathRandomSpy
      .mockImplementation(() => 0)
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 1);
    let result = selectKiMove(moves, 4);
    expect(result[1]).toBe(0);

    mathRandomSpy
      .mockImplementation(() => 0)
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 1);
    result = selectKiMove(moves, 3);
    expect(result[1]).toBe(0);

    mathRandomSpy
      .mockImplementation(() => 0)
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 1);
    result = selectKiMove(moves, 2);
    expect(result[1]).toBe(0);

    mathRandomSpy
      .mockImplementation(() => 0)
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 1);
    result = selectKiMove(moves, 1);
    expect(result[1]).toBe(0);
  });
});
