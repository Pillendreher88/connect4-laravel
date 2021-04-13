import React, {useState} from 'react';
import styled from 'styled-components';
import { ImCross } from "react-icons/im";
import { BsCheck} from "react-icons/bs";

const Title = styled.div`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 11px;

`;

const Buttons = styled.div`
display: flex;
flex-direction: row;
align-items: center;

`;

const Button = styled.button`
display: inline-flex;
justify-content: center;
align-items: center;
cursor: pointer;
padding: 6px 12px;
outline: 0;
border: 0;
margin-left: 10px;
color: ${props => props.color};

&:hover {
  background-color: #D3D3D3;
}
`;

export default function OfferRematch({roomId, setLoading}) {


  const agreeRematch = () => {
    setLoading(true);
    axios.post(`/c4/${roomId}/rematch`, {}).then((result => {
      setLoading(false);
    })).catch((error) => {
      console.log(error);
      setLoading(false);
     });
  }

  const declineRematch = () => {
    setLoading(true);
    axios.post(`/c4/${roomId}/declineRematch`, {}).then((result => {
      setLoading(false);
    })).catch((error) => {
      console.log(error);
      setLoading(false);
     });
  }

  return (
    <div>
      <Title>Agree to rematch?</Title>
<Buttons>
        <Button color="green" onClick= {agreeRematch}>
          <BsCheck/>
        </Button>
        <Button color="red">
          <ImCross onClick= {declineRematch}/>
        </Button>
      </Buttons>
    </div>
  )
}
