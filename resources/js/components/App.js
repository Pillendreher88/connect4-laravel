import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router basename="/connect4">
      <Routes />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("react-app"));
