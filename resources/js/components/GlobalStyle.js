import { css, createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
`;

export const baseButtonStyles = css`

  position: relative;
  display: inline-flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  outline: 0;
  border: 0;
  cursor: pointer;
`;
 
export default GlobalStyle;