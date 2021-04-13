import React, {useState} from 'react';
import styled, {css} from 'styled-components';


const Container = styled.div`
  position: relative;
`;


const labelTop = css`
left: 50%;
bottom: calc(100% + 5px);
transform: translateX(-50%);

&:after {
  top: 100%;
  border-top-color:  #313131;
  
}

`
const labelRight = css`

top: 50%;
left: calc(100% + 5px);

&:after {
  border-right-color:  #313131;
}

`
const labelLeft= css`

top: 50%;
right: calc(100% + 5px);
transform: translateY(-50%);

&:after {
  left: 100%;
  border-left-color:  #313131;
  top: 50%;
  transform: translateY(-50%);

}

`
const labelBottom = css`

bottom: -5px;

&:after {
  border-bottom-color:  #313131;
}

`
const placementCss = (placement) => {

  switch(placement) {
    case "top":
      return labelTop ;
    case "left":
      return labelLeft;
    case "right":
      return labelRight;
    case "bottom":
      return labelBottom;
  }
}

const Label = styled.div`
  position:absolute;
  z-index: 99;
  background-color: #313131;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  visibility : ${props => props.isVisible ? "visible" : "hidden"};

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: .4rem solid transparent;
    left: 50%;
    z-index: -1;
    transform: translateX(-50%);
    transition: top $transTime ease;
  }
  ${props => placementCss(props.placement)}
`;

export default function Tooltip({children, placement, labelText}) {

  const [isVisible, setIsVisible] = useState(false);

  const handleEnter = (event) => {
    setIsVisible(true);
  }

  const handleLeave = (event) => {
    setIsVisible(false);
  }

  return (
    <Container onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
      <Label isVisible = {isVisible} placement = {placement}>{labelText}</Label>
    </Container>
  )
}

