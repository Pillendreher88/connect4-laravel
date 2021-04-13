import React, {useRef} from 'react'
import styled from 'styled-components';
import { FaCopy, } from "react-icons/fa";
import { mediaQueries } from "./Theme";


const Header = styled.h1`
font-size: 1.4rem;
font-weight: 500;

${mediaQueries.sm`
  font-size: 1.6rem;
`}

`;

const Info = styled.h2`
font-size: 0.8rem;
margin-right: 1rem;
font-weight: 500;

${mediaQueries.sm`
  font-size: 1rem;
`}
`;

const Container = styled.div`

padding: 1em;
background: #f7f6f5;

`;

const ShareLinkContainer = styled.div`
display: flex;
flex: 1 0 auto;
max-width: 500px;
font-size: 12px;
`;

const ShareLinkInput = styled.input`
flex: 1 0 auto;
font-size:inherit;
max-width: 100%;
border-radius: 5px;
padding: 0.7em;
outline: 0;
box-shadow: none;
border: 1px solid rgba(34,36,38,.15);

&:focus {
  border-color: #85b7d9;  
}
`;
const ShareLinkButton = styled.button`
flex: 0 0 auto;
display: inline-flex;
padding: 0.25rem 0.5rem;
align-items: center;
outline: 0;
cursor: pointer;
background-color: #00b5ad;
border: 0;
color:white;
font-weight: 600;

&:hover {
  background-color:#009c95;
}

${mediaQueries.sm`
  padding: 1rem 2rem;
`}
`;
const ShareLinkButtonLabel = styled.span`
margin-right: 5px;

}
`;

export default function ShareLink({url}) {

  const ref = useRef(null);

  const copyToClipboard = () => {
     ref.current.select(); 
    document.execCommand('copy');
  }

  return (
    <Container>
    <Header as='h1'>Invite someone to play Connect4</Header>
    <Info as='h2'>Send this link to a friend. First person who calls this url will be your opponent.</Info>
    <ShareLinkContainer>
      <ShareLinkInput
      type="text" 
      readOnly
      ref = {ref} 
      value={url} 
      size = "35"
    />
    <ShareLinkButton onClick={copyToClipboard}>
    <ShareLinkButtonLabel>
      Copy
    </ShareLinkButtonLabel>
    <FaCopy/>
    </ShareLinkButton>
    </ShareLinkContainer>
    </Container>
  )
}
