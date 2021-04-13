
import {css} from 'styled-components';


export const breakpoints = {
  sm: '500px',
  md: '900px',
};

export const mediaQueries = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media (min-width: ${breakpoints[label]}) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);

const themes = {

  dark: {
    backgroundColor: "#18181b",
    backgroundColorAlt: "#404040",
    backgroundColorInputFocus: "#000000",
    backgroundColorInput: " #8c8c8c",
    color: "white",
    colorBlue: "rgb(0, 137, 255)",
    colorRed: "rgb(255, 0, 0)",
    colorCaret: "white",
    colorInputNotFocused: "black",
  },
  light: {
    backgroundColor: "white",
    backgroundColorAlt: "#cccccc",
    backgroundColorInputFocus: "#ffffff",
    backgroundColorInput: "#737373",
    color:"black",
    colorBlue: "blue",
    colorRed: "red",
    colorCaret: "black",
    colorInputNotFocused: "white",
  }
};

export default themes;