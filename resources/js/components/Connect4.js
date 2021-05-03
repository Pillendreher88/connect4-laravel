import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import OfferRematch from "./OfferRematch";
import Board from "./Board";
import Waiting from "./WaitingOpponent";
import { baseButtonStyles } from "./GlobalStyle";
import axios from "axios";

const CircleWrapper = styled.div`
  flex: 0 0 calc(100% / 7);
  max-width: calc(100% / 7);
  position: relative;
`;

const anim = keyframes`

  0%   {top: 0px;}
  50%  {top: 10px;}
  100% {top: 0px;}
`;

const Button = styled.button`
width: 100%;
height: 50px;
position: relative;
background: transparent;
border: 0;
cursor: pointer;

&:disabled {
  visibility: hidden;
  }

&:hover svg{
  ${(props) => {
    switch (props.color) {
      case 0:
        return "fill: white;";
      case 1:
        return "fill: red;";
      case 2:
        return "fill: blue;";
    }
  }}
  }

&:not(disabled) svg{
  animation: ${anim} 1.2s linear infinite;
  }
}
`;

const RematchButton = styled.button`
  ${baseButtonStyles}
  width: 100%;
  padding: 24px 12px;
  font-size: 1rem;
  font-weight: 600;
  &:hover {
    background-color: #d3d3d3;
  }
`;

const Triangle = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 10 10">
      <polygon points="0,0 10,0 5,10" />
    </svg>
  );
};

const TriangleStyled = styled(Triangle)`
  font-size: 30px;
  width: 1em;
  height: 1em;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
`;

export default function Connect4({
  roomId,
  highlighted,
  gameData,
  player,
  playerWhoWantsRematch,
}) {
  const { gameObject: board, winner, playersTurn } = gameData;
  const [isLoading, setLoading] = useState(false);

  const handleClick = (index) => {
    setLoading(true);
    axios
      .post(`/c4/${roomId}/move`, { move: index })
      .then((result) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const offerRematch = () => {
    setLoading(true);
    axios
      .post(`/c4/${roomId}/offerRematch`, {})
      .then((result) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const renderEndHeader = () => {
    return playerWhoWantsRematch ? (
      playerWhoWantsRematch === player ? (
        <>
          <Waiting />
          Rematch offered{" "}
        </>
      ) : (
        <OfferRematch roomId={roomId} setLoading={setLoading} />
      )
    ) : (
      <RematchButton onClick={offerRematch}>Rematch</RematchButton>
    );
  };

  const renderHeader = () => {
    if (player === 0)
      return (
        <>
          <Waiting />{" "}
          {`Waiting for ${playersTurn === 1 ? "Red" : "Blue"} to move.`}
        </>
      );
    if (player != playersTurn)
      return (
        <>
          <Waiting /> Waiting for Opponents
        </>
      );

    return [0, 1, 2, 3, 4, 5, 6].map((number, index) => (
      <CircleWrapper key={index}>
        <Button
          onClick={(event) => handleClick(index)}
          disabled={
            winner != 0 ||
            player != playersTurn ||
            isLoading ||
            board[index] !== "0"
          }
          color={player}
          aria-label={`insert${index}`}
        >
          <TriangleStyled />
        </Button>
      </CircleWrapper>
    ));
  };

  return (
    <Board
      board={board}
      highlighted={highlighted}
      player={player}
      isLoading={isLoading}
      renderHeader={() =>
        gameData.winner != 0 ? renderEndHeader() : renderHeader()
      }
    />
  );
}
