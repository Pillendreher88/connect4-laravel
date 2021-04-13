import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
align-items: center;
display: flex;
justify-content: center;
height: 50vh;
flex-direction: column;
margin: 2rem;
`;

export default function Four0Four() {
  return (
    <Container>
      <h1>
        404
      </h1>
      <h3>
        Sorry. The Page does not exist.
      </h3>
    </Container>
  )
}
