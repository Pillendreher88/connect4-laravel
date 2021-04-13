import React, {useState} from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import {Loading} from './WaitingOpponent';
import {baseButtonStyles} from './GlobalStyle';


const ButtonPlay = styled.button`

${baseButtonStyles}
padding: 20px;
font-size: 1.2rem;
width: 300px;
background-color: rgb(0, 102, 0);
color: white;

&:hover {
  background-color: rgb(0, 153, 51);
}
`;

const Container = styled.div`
padding: 0.5rem;
display: flex;
flex-direction: column;
align-items: center;
`;

const StyledLink = styled(Link)`
display: block;
margin-bottom: 2rem;
text-decoration: none;  
`;

const Title = styled.h1`

`;

const LoadingSmall = styled(Loading)`
margin: 0;
font-size: 5px;
position: absolute; 
left: 32px;
top: 50%;
transform: translateY(-50%);
`;

function StartScreen() {

  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const addRoom = () => {
    setLoading(true);
    axios.post('/c4/addRoom').then((result) => {
      setLoading(false);
      history.push(`/${result.data.id}`)});
  }

  return( 
  <Container>
    <Title>Play Connect4</Title>
    <StyledLink to="/ki">
      <ButtonPlay>
        Play against Computer
      </ButtonPlay>
    </StyledLink>
    <ButtonPlay onClick={addRoom} disabled = {isLoading}>
      {isLoading && <LoadingSmall/>}
      Play against a friend 
    </ButtonPlay>
  </Container>
      );
}

export default StartScreen;
