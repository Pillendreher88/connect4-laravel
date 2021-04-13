import React, { useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import StartScreen from './StartScreen';
import GameRoom from './GameRoom';
import GlobalStyle from './GlobalStyle';
import KIWrapper from './KIWrapper';
import themes from './Theme';
import {Route,BrowserRouter as Router, Switch} from "react-router-dom";
import styled from 'styled-components';
import {ThemeProvider} from 'styled-components';

export const ThemeHandler = React.createContext('light');


const Container = styled.div`
margin: auto;
max-width: 1100px;
width: 100%;

`;

function App() {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {

    setTheme(theme === "light" ? "dark" : 'light');
  }

  return (
    <Router basename="/connect4">
      <GlobalStyle/>
      <ThemeProvider theme={themes[theme]}>
        <ThemeHandler.Provider value={toggleTheme}>
          <Container>
            <Switch>
              <Route path="/ki">
                <KIWrapper/>
              </Route>
              <Route path="/:roomId">
                <GameRoom/>
              </Route>
              <Route path="/" exact>
                <StartScreen/> 
              </Route>
            </Switch>
          </Container>
        </ThemeHandler.Provider>
      </ThemeProvider>
    </Router>
  );
} 

ReactDOM.render(<App/>, document.getElementById('react-app'));


