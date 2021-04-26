import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Connect4 from "./Connect4";
import Info from "./Info";
import Chat from "./Chat";
import ShareLink from "./ShareLink";
import styled from "styled-components";
import { mediaQueries } from "./Theme";
import { useParams, useHistory } from "react-router-dom";
import Four0Four from "./Four0Four";
import { Loading } from "./WaitingOpponent";
import { baseButtonStyles } from "./GlobalStyle";

const LoadingSmall = styled(Loading)`
  margin: 0;
  font-size: 5px;
  position: absolute;
  left: 32px;
  top: 50%;
  transform: translateY(-50%);
`;

const ButtonPlay = styled.button`
  ${baseButtonStyles}
  position: relative;
  padding: 20px;
  font-size: 1.2rem;
  width: 300px;
  background-color: rgb(0, 102, 0);
  color: white;

  &:hover {
    background-color: rgb(0, 153, 51);
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${mediaQueries.sm`
  width: 300px;
`}
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
`}
`;
function GameRoom() {
  const [gameData, setGameData] = useState();
  const [isLoadingJoin, setLoadingJoin] = useState(false);
  const [isLoadingGame, setLoadingGame] = useState(false);
  const [error, setError] = useState(null);
  const [player, setPlayer] = useState(0);
  const [messages, setMessages] = useState([]);
  const [PlayerWhoWantsRematch, setPlayerWhoWantsRematch] = useState(false);
  const previousRoomId = useRef(null);

  const history = useHistory();
  const { roomId } = useParams();

  useEffect(() => {
    loadGameData(roomId);
    setPlayerWhoWantsRematch(false);
    previousRoomId.current = roomId;

    return () => {
      leaveChannel(previousRoomId.current);
    };
  }, [roomId]);

  const joinRoom = (roomId) => {
    setLoadingJoin(true);
    axios
      .post(`/c4/${roomId}/join`)
      .then((result) => {
        setPlayer(result.data.player);
        setLoadingJoin(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingJoin(false);
        setError(error);
      });
  };

  const subscribeToChannels = (roomId) => {
    Echo.channel(roomId)
      .listen(".newMessage", (e) => {
        setMessages((messages) => [...messages, e.message]);
      })
      .listen(".RematchAccepted", (e) => {
        redirectToRematch(e.room.id);
      })
      .listen(".newMove", (e) => {
        setGameData(e.room);
      })
      .listen(".RematchOffered", (e) => {
        setPlayerWhoWantsRematch(e.player);
      })
      .listen(".RematchDeclined", (e) => {
        setPlayerWhoWantsRematch(false);
      });
  };

  const leaveChannel = (roomId) => {
    Echo.leave(roomId);
  };

  const loadGameData = (roomId) => {
    setLoadingGame(true);
    axios
      .get(`/c4/${roomId}`)
      .then((result) => {
        subscribeToChannels(roomId);
        setGameData(result.data.room);
        setPlayer(result.data.player);
        setMessages(result.data.messages);
        setLoadingGame(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingGame(false);
        setError(error);
      });
  };

  const redirectToRematch = (roomId) => {
    history.push(`/${roomId}`);
  };

  const onSend = (message) => {
    axios
      .post(`/c4/${roomId}/addMessage`, { message })
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  if (error && error.response && error.response.status === 404)
    return <Four0Four />;

  return gameData ? (
    <GameContainer>
      {gameData.started ? (
        <>
          <Right>
            <Connect4
              player={player}
              roomId={roomId}
              playerWhoWantsRematch={PlayerWhoWantsRematch}
              highlighted={gameData.winningDiscs}
              gameData={gameData}
            />
          </Right>
          <Left>
            <Info gameData={gameData} player={player} />
            <Chat messages={messages} onSend={onSend} player={player} />
          </Left>
        </>
      ) : player === 0 ? (
        <ButtonPlay onClick={() => joinRoom(roomId)} disabled={isLoadingJoin}>
          {isLoadingJoin && <LoadingSmall />}
          Join the game
        </ButtonPlay>
      ) : (
        <ShareLink url={window.location.href} />
      )}
    </GameContainer>
  ) : null;
}

export default GameRoom;
