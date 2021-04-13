import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';


const loading = keyframes`
0%,
100% {
  box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
}
12.5% {
  box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
}
25% {
  box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
}
37.5% {
  box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
}
50% {
  box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
}
62.5% {
  box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
}
75% {
  box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
}
87.5% {
  box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
}
`;

export const Loading = styled.div`
color: black;
font-size: 10px;
margin: 100px auto;
width: 1em;
height: 1em;
border-radius: 50%;
position: relative;
text-indent: -9999em;
animation: ${loading} 1.3s infinite linear;
transform: translateZ(0);
`
const apear = keyframes`
    0%   {opacity: 0; }
    100% {opacity: 1; }
`;

const fade = keyframes`
    0%   {opacity: 1; }
    100% {opacity: 0; }
`;

const LoadingContainer = styled.div`
    display:flex;
    flex-wrap: wrap;
    width: 50px;
    margin-left: 15px;
    margin-right: 15px;

    & div {
      width: 20%;
      padding-top: 20%;
      background-color: red;
      border-radius: 50%;
      margin: 1px;
      animation-fill-mode: forwards, forwards, forwards, forwards;
      animation-duration: 1s, 0.5s;
      animation-timing-function: linear, linear, linear, linear;
      animation-iteration-count: 1, 1, 1, 1;
      animation-direction: normal, normal ,normal, normal;
      opacity: 0;
    }

    &.blue {

      
      & div {
        background-color:blue;
      }

      & div:nth-child(1) {
        animation-delay: 0s, 1.6s, 3.4s, 4.4s;
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

      }

      & div:nth-child(2) {
        animation-delay: 0.2s, 1.6s;
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

      }
   
      & div:nth-child(3) {
        animation-delay: 0.4s, 1.6s;
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

      }

      & div:nth-child(4) {
        animation-delay: 0.6s, 3s;    
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};
       
      }

      & div:nth-child(6) {
        animation-delay: 3.2s, 4.4s;  
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

      }
      & div:nth-child(8) {
        animation-delay: 1.6s, 3s;  
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

      }

      & div:nth-child(11) {
        animation-delay: 3s, 4.4s;  
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

        }
      & div:nth-child(12) {
        animation-delay: 1.8s, 3s; 
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};
 
      }
      & div:nth-child(16) {
        animation-delay: 2s, 4.4s;
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

      }
    }


    &.red {

      & div {
        background-color:red;
      }

      & div:nth-child(1) {
        animation-delay: 0s, 1.6s, 3.4s, 4.4s;
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

      }

      & div:nth-child(2) {
        animation-delay: 0.2s, 1.6s;
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

      }
   
      & div:nth-child(3) {
        animation-delay: 0.4s, 1.6s;
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

      }

      & div:nth-child(4) {
        animation-delay: 0.6s, 3s;    
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};
       
      }

      & div:nth-child(5) {
        animation-delay: 3.2s, 4.4s;  
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

      }
      & div:nth-child(7) {
        animation-delay: 1.6s, 3s;  
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

      }

      & div:nth-child(9) {
        animation-delay: 3s, 4.4s;  
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

        }
      & div:nth-child(10) {
        animation-delay: 1.8s, 3s; 
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};
 
      }
      & div:nth-child(13) {
        animation-delay: 2s, 4.4s;
        animation-name: ${apear}, ${fade}, ${apear}, ${fade};

      }
    }

`;

export default function WaitingOpponent() {

  const [key, setKey] = useState("red");
  const [count, setCount] = useState(0);
  const restart = (event) => {
    
    if(count === 3) {
      setCount(0);
      setKey(key => key === "red" ? "blue" : "red");
    }
    else {
      setCount(count => count + 1 );
    }
  }

  return (
    <LoadingContainer key={key} className={key}>
      <div onAnimationEnd = {restart}></div>
      <div ></div>
      <div ></div>
      <div ></div>
      <div ></div>
      <div ></div>
      <div ></div>
      <div ></div>
      <div ></div>
      <div ></div>
      <div ></div>
      <div ></div>
      <div ></div>
      <div ></div>
      <div></div>
      <div > </div>
    </LoadingContainer>
  )
}


