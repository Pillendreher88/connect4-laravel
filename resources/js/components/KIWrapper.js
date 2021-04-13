import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Board from "./Board.js";
import checkBoard from "./connect4-util.js";
import { mediaQueries } from "./Theme";

const Left = styled.div`
  width: 100%;
  flex-grow: 0;
  padding: 1rem;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  ${mediaQueries.sm`
  width: 300px;
`}
`;

const LeftTitle = styled.h2``;

const Link = styled.a``;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 70%;
  padding-bottom: 1rem;

  ${mediaQueries.sm`
  width: 90%;
`}
`;

const ButtonKi = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  cursor: pointer;
  background: ${(props) =>
    props.active
      ? "#629924"
      : "linear-gradient(to bottom, #f5f5f5 0%, #ededed 100%)"};
  color: ${(props) => (props.active ? "#fff" : "black")};
  border-right: 1px solid #d9d9d9;
`;

const Right = styled.div`
  flex: 0 0 auto;
  width: 100%;
  margin-bottom: 10px;

  ${mediaQueries.sm`
  width: 500px;
  margin-left: 10px;
`}
`;

const GameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  flex-direction: row;

  ${mediaQueries.sm`
  flex-direction: row-reverse;
  align-items: start;
`}
`;

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

const RematchButton = styled.button`
  width: 100%;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 24px 12px;
  outline: 0;
  border: 0;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background-color: #d3d3d3;
  }
`;

export default function KIWrapper() {
  const getInitState = () => ({
    board: "0000000000000000000000000000000000000000000000000",
    started: false,
    winner: false,
    playersTurn: true,
  });

  const [state, setState] = useState(getInitState());

  const [isLoading, setLoading] = useState(false);
  const [kiLevel, setKiLevel] = useState(5);

  const { playersTurn, board, winningDiscs, winner } = state;

  useEffect(() => {
    if (!playersTurn && !winner) {
      makeKIMove();
    }
  }, [playersTurn]);

  const handleClick = (index) => {
    addMove(42 + index, "1");
  };

  const restart = () => {
    setState(getInitState());
  };

  const addMove = (index, player) => {
    if (board[index] === "0") {
      let boardNew = board.substr(0, index) + player + board.substr(index + 1);

      let changedProps = {
        playersTurn: !playersTurn,
        board: boardNew,
      };

      const winningDiscs = checkBoard(boardNew, index % 7);
      if (winningDiscs) {
        changedProps.winner = player;
        changedProps.winningDiscs = winningDiscs;
      }

      setState({ ...state, ...changedProps });
    } else if (index - 7 > -1) {
      addMove(index - 7, player);
    }
  };

  const selectKiMove = (moves) => {
    const values = Object.values(moves);

    return values.reduce(
      (prev, current, index) => {
        let ratingWithErrors = current + Math.random() * (6 - kiLevel);
        if (Math.random() > 0.9 + kiLevel * 0.02) {
          ratingWithErrors *= -1;
        }

        if (prev[0] < ratingWithErrors) {
          return [ratingWithErrors, Object.keys(moves)[index]];
        } else return prev;
      },
      [-1, -1]
    );
  };

  const makeKIMove = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://kevinalbs.com/connect4/back-end/index.php/getMoves?board_data=${state.board}&player=2`,
        {
          transformRequest: [
            (data, headers) => {
              delete headers.common["X-CSRF-TOKEN"];
              delete headers.common["X-Requested-With"];
              delete headers["X-Socket-Id"];
              return data;
            },
          ],
        }
      );
      const move = selectKiMove(response.data);
      addMove(42 + move[1], "2");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderEndHeader = () => {
    return <RematchButton onClick={restart}>Restart</RematchButton>;
  };

  const renderHeader = () => {
    return [0, 1, 2, 3, 4, 5, 6].map((number, index) => (
      <CircleWrapper>
        <Button
          onClick={(event) => handleClick(index)}
          disabled={state.winner || isLoading || state.board[index] !== "0"}
          color={1}
        >
          <TriangleStyled />
        </Button>
      </CircleWrapper>
    ));
  };

  return (
    <GameContainer>
      <Right>
        <Board
          board={state.board}
          isLoading={isLoading}
          renderHeader={() =>
            winner != 0 ? renderEndHeader() : renderHeader()
          }
          highlighted={winningDiscs}
        />
      </Right>
      <Left>
        <LeftTitle>Strength of computer</LeftTitle>
        <ButtonGroup>
          <ButtonKi onClick={() => setKiLevel(1)} active={kiLevel === 1}>
            1
          </ButtonKi>
          <ButtonKi onClick={() => setKiLevel(2)} active={kiLevel === 2}>
            2
          </ButtonKi>
          <ButtonKi onClick={() => setKiLevel(3)} active={kiLevel === 3}>
            3
          </ButtonKi>
          <ButtonKi onClick={() => setKiLevel(4)} active={kiLevel === 4}>
            4
          </ButtonKi>
          <ButtonKi onClick={() => setKiLevel(5)} active={kiLevel === 5}>
            5
          </ButtonKi>
        </ButtonGroup>
        {"Computer is using "}
        <Link href="https://kevinalbs.com/connect4/back-end/info.html">
          this Api Endpoint.
        </Link>
      </Left>
    </GameContainer>
  );
}
