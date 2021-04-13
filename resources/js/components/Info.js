import React from 'react';
import styled from 'styled-components';


const Container = styled.div`

flex-grow: 0;
padding: 1rem;
box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.2),0 1px 5px 0 rgba(0,0,0,0.12);

`;

const PlayerColor = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

export default function Info({gameData, player}) {

  const renderGameStatus = () => {

    if(!gameData.started) {
      return <div>Warte auf deinen Gegner</div>
    }
    return (
      gameData.winner != 0 ? 

      ( player === 0 ?
        `${gameData.winner === 1 ? "Red" : "Blue"} won the match.` : 
      <div>{player === gameData.winner ? "You have won." : "You have lost."}</div> ) : 

      ( player === 0 ?
        `It is ${gameData.playersTurn === 1 ? "reds" : "blues"} turn.` : 
      <div>{player === gameData.playersTurn ? "It is your turn." : "Waiting for opponents turn."}</div>)
      );
  }

  const renderPlayerColorInfo = () => {
    return (
      <PlayerColor>
        {player === 0 ? "You are spectating." : 
        `You are playing with the  ${player === 1 ? "red" : "blue"} discs.`} 
    </PlayerColor>
      );
  }

  return (
    <Container>
      {renderPlayerColorInfo()}
      {renderGameStatus()}
    </Container>
  )
}
