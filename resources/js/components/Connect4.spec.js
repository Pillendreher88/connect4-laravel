import axios from "axios";
import React from "react";
import Connect4 from "./Connect4.js";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("Connect4-Wrapper", () => {
  test("renders buttons in header when game is running", () => {
    const gameData = {
      id: 1,
      created_at: "2021-04-15T18:33:57.000000Z",
      updated_at: "2021-04-15T18:34:11.000000Z",
      name: null,
      player1: "DdygV8G8AeyzuqYZGbOCXmty2YqK4mQPTUj4FRlp",
      player2: "rYaFqVBC4I0Z3WBXvtMQOhei6JUWAs1Fudm716s2",
      gameObject: "000000000000000000000000000000000001221111",
      winner: 0,
      playersTurn: 1,
      started: 1,
      messages: [],
    };

    const { getByRole } = render(
      <Connect4 gameData={gameData} player={1} roomId={1} />
    );

    expect(getByRole("button", { name: "insert0" })).toBeInTheDocument();
    expect(getByRole("button", { name: "insert1" })).toBeInTheDocument();
    expect(getByRole("button", { name: "insert2" })).toBeInTheDocument();
    expect(getByRole("button", { name: "insert3" })).toBeInTheDocument();
    expect(getByRole("button", { name: "insert4" })).toBeInTheDocument();
    expect(getByRole("button", { name: "insert5" })).toBeInTheDocument();
    expect(getByRole("button", { name: "insert6" })).toBeInTheDocument();
  });

  test("Buttons are not visible when it is not players turn", () => {
    const gameData = {
      id: 1,
      created_at: "2021-04-15T18:33:57.000000Z",
      updated_at: "2021-04-15T18:34:11.000000Z",
      name: null,
      player1: "DdygV8G8AeyzuqYZGbOCXmty2YqK4mQPTUj4FRlp",
      player2: "rYaFqVBC4I0Z3WBXvtMQOhei6JUWAs1Fudm716s2",
      gameObject: "000000000000000000000000000000000001221111",
      winner: 0,
      playersTurn: 2,
      started: 1,
      messages: [],
    };
    const { queryByRole } = render(
      <Connect4 gameData={gameData} player={1} roomId={1} />
    );

    expect(queryByRole("button", { name: "insert0" })).not.toBeInTheDocument();
    expect(queryByRole("button", { name: "insert1" })).not.toBeInTheDocument();
    expect(queryByRole("button", { name: "insert2" })).not.toBeInTheDocument();
    expect(queryByRole("button", { name: "insert3" })).not.toBeInTheDocument();
    expect(queryByRole("button", { name: "insert4" })).not.toBeInTheDocument();
    expect(queryByRole("button", { name: "insert5" })).not.toBeInTheDocument();
    expect(queryByRole("button", { name: "insert6" })).not.toBeInTheDocument();
  });
  test("Button is not visible when column is full", () => {
    const gameData = {
      id: 1,
      created_at: "2021-04-15T18:33:57.000000Z",
      updated_at: "2021-04-15T18:34:11.000000Z",
      name: null,
      player1: "DdygV8G8AeyzuqYZGbOCXmty2YqK4mQPTUj4FRlp",
      player2: "rYaFqVBC4I0Z3WBXvtMQOhei6JUWAs1Fudm716s2",
      gameObject: "010000001000000100000010000001000000100000",
      winner: 0,
      playersTurn: 1,
      started: 1,
      messages: [],
    };
    const { queryByRole } = render(
      <Connect4 gameData={gameData} player={1} roomId={1} />
    );

    expect(queryByRole("button", { name: "insert1" })).not.toBeInTheDocument();
  });

  test("makes api call to the correct url and param when clicking button", async () => {
    const gameData = {
      id: 1,
      created_at: "2021-04-15T18:33:57.000000Z",
      updated_at: "2021-04-15T18:34:11.000000Z",
      name: null,
      player1: "DdygV8G8AeyzuqYZGbOCXmty2YqK4mQPTUj4FRlp",
      player2: "rYaFqVBC4I0Z3WBXvtMQOhei6JUWAs1Fudm716s2",
      gameObject: "000000000000000000000000000000000000000000",
      winner: 0,
      playersTurn: 1,
      started: 1,
      messages: [],
    };
    const { getByRole } = render(
      <Connect4 gameData={gameData} player={1} roomId={3} />
    );
    axios.post.mockImplementation((url, options) => Promise.resolve());

    fireEvent.click(getByRole("button", { name: "insert1" }));
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(`/c4/3/move`, { move: 1 })
    );
    fireEvent.click(getByRole("button", { name: "insert4" }));
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(`/c4/3/move`, { move: 4 })
    );
    expect(axios.post).toHaveBeenCalledTimes(2);
  });
});
