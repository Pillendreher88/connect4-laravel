import React from "react";
import styled, { keyframes } from "styled-components";
import { Loading } from "./WaitingOpponent";

const Header = styled.div`
  border-radius: 5px;
  position: relative;
  padding: 10px 0px;
  box-sizing: border-box;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const drop = keyframes`
  100% {
    transform: translate(-50%,-50%);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

const Circle = styled.div`
  width: 95%;
  padding-top: 95%;
  box-sizing: border-box;
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, ${(props) => -props.row * 100 - 50}%);
  animation: ${drop} ${(props) => props.row * 0.1}s linear 1;
  animation-fill-mode: forwards;
  z-index: 1;
  ${(props) => {
    switch (props.color) {
      case "0":
        return "background-color: white;";
      case "1":
        return "background-color: red;";
      case "2":
        return "background-color: blue;";
    }
  }}
  opacity: 0.4;
  ${(props) => props.fullOpacity && "opacity: 1;"}
`;

const CircleWrapper = styled.div`
  flex: 0 0 calc(100% / 7);
  max-width: calc(100% / 7);
  position: relative;
`;

const DummyAspectRatio = styled.div`
  margin-top: 100%;
`;

const OverlayWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 2;
  width: 90%;
  padding-top: 90%;
  box-sizing: content-box;
  background-color: transparent;
  border-radius: 50%;
  flex-shrink: 0;
  border: 30px solid grey;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  width: calc(100% - 20px);
  max-width: 500px;
  position: relative;
  background: white;
  margin: 10px;
  &:before {
    content: "";
    margin: -10px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: ${(props) =>
      props.player === 1
        ? "linear-gradient( #8B0000, rgba(255,0,0,1) 80%, black)"
        : "linear-gradient( #00008B, #0000FF 80%, black)"};
    border-radius: 5px;
    box-shadow: 0px 5px 5px black;
  }
`;

export default function Board({
  board,
  highlighted,
  renderHeader,
  player,
  isLoading,
}) {
  const boardRender = [...board].map((color, index) => (
    <CircleWrapper key={index}>
      {color != 0 && (
        <Circle
          color={color}
          data-testid={"disc" + index}
          fullOpacity={
            !highlighted ||
            highlighted.length === 0 ||
            highlighted.indexOf(index) > -1
          }
          row={Math.floor(index / 7)}
        ></Circle>
      )}
      <OverlayWrapper>
        <DummyAspectRatio />
        <Overlay />
      </OverlayWrapper>
    </CircleWrapper>
  ));

  return (
    <Container player={player}>
      <Header data-testid="header">
        {isLoading ? (
          <Loading data-testid="loading" />
        ) : renderHeader ? (
          renderHeader()
        ) : null}
      </Header>
      <Row>{boardRender}</Row>
    </Container>
  );
}
