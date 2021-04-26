import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Board from "./Board";

describe("Board", () => {
  test("renders discs correctly", () => {
    const board = "000000000000000000000000000000000000000021";
    render(<Board board={board} />);

    [...board].forEach((element, index) => {
      if (element != "0") {
        expect(screen.getByTestId("disc" + index)).toHaveStyle(
          `background-color: ${element === "1" ? "red" : "blue"}`
        );
      }
    });
  });

  test("renders highlighted discs correctly", () => {
    const board = "000000000000000000000000000000000001221111";
    const highlighted = [38, 39, 40, 41];
    render(<Board board={board} highlighted={highlighted} />);

    [...board].forEach((element, index) => {
      if (element != "0") {
        expect(screen.getByTestId("disc" + index)).toHaveStyle(
          `opacity: ${highlighted.indexOf(index) > -1 ? "1" : "0.4"}`
        );
      }
    });
  });

  test("renders custom header", () => {
    const board = "000000000000000000000000000000000001221111";
    render(
      <Board
        board={board}
        renderHeader={() => <div data-testid="customHeader"></div>}
      />
    );

    const header = screen.getByTestId("header");
    const customHeader = screen.getByTestId("customHeader");
    expect(header).toContainElement(customHeader);
  });
});
