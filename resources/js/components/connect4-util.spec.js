import "@testing-library/jest-dom";
import { checkRow, checkRows, checkColumn, checkDiags } from "./connect4-util";

describe("checking rows correctly", () => {
  test("win of player1 is getting detected", () => {
    const boards = [
      "0000000000000000000000000000000000000000000001111",
      "0000000000000000000000000000000000000011112121212",
      "0000000000000000000000000000000111112121211212121",
    ];

    expect(checkRow(boards[0], 0)).toEqual([48, 47, 46, 45]);
    expect(checkRow(boards[1], 1)).toEqual([41, 40, 39, 38]);
    expect(checkRow(boards[2], 2)).toEqual([34, 33, 32, 31]);
  });

  test("win of player2 is getting detected", () => {
    const boards = [
      "0000000000000000000000000000000000000000000002222",
      "0000000000000000000000000000000000000022222121212",
      "0000000000000000000000000000000222212121211212121",
    ];

    expect(checkRow(boards[0], 0)).toEqual([48, 47, 46, 45]);
    expect(checkRow(boards[1], 1)).toEqual([41, 40, 39, 38]);
    expect(checkRow(boards[2], 2)).toEqual([34, 33, 32, 31]);
  });

  test("no player is winning is getting detected", () => {
    const boards = [
      "0000000000000000000000000000000000000000000002221",
      "0000000000000000000000000000000000000012222121212",
      "0000000000000000000000000000000122212121211212121",
    ];

    expect(checkRows(boards[0])).toBe(false);
    expect(checkRows(boards[1])).toBe(false);
    expect(checkRows(boards[2])).toBe(false);
  });
});

describe("checking columns correctly", () => {
  test("win of player1 is getting detected", () => {
    const boards = [
      "0000000000000000000000000001000000100000010000001",
      "0000000000000000000000000010000001000000120000012",
      "0000000000000000000000000100000010000001020000102",
    ];

    expect(checkColumn(boards[0], 6)).toEqual([48, 41, 34, 27]);
    expect(checkColumn(boards[1], 5)).toEqual([47, 40, 33, 26]);
    expect(checkColumn(boards[2], 4)).toEqual([46, 39, 32, 25]);
  });

  test("win of player2 is getting detected", () => {
    const boards = [
      "0000000000000000000000000002000000200000020000002",
      "0000000000000000000000000020000002000000220000022",
      "0000000000000000000000000200000020000002020000202",
    ];

    expect(checkColumn(boards[0], 6)).toEqual([48, 41, 34, 27]);
    expect(checkColumn(boards[1], 5)).toEqual([47, 40, 33, 26]);
    expect(checkColumn(boards[2], 4)).toEqual([46, 39, 32, 25]);
  });

  test("no player is winning is getting detected", () => {
    const boards = [
      "0000000000000000000000000001000000200000020000002",
      "0000000000000000000000000010000002000000220000022",
      "0000000000000000000000000100000020000002020000202",
    ];

    expect(checkRows(boards[0])).toBe(false);
    expect(checkRows(boards[1])).toBe(false);
    expect(checkRows(boards[2])).toBe(false);
  });
});

describe("checking diagonals correctly", () => {
  test("win of player1 is getting detected", () => {
    const board = "0000000000000000000000001000000010000000100000001";

    expect(checkDiags(board)).toEqual([24, 32, 40, 48]);
  });

  test("win of player2 is getting detected", () => {
    const board = "0000000000000000000000002000000020000000200000002";
    expect(checkDiags(board)).toEqual([24, 32, 40, 48]);
  });
});
