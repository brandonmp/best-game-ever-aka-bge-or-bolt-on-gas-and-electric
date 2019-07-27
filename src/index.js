import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board.jsx";

import "./styles.css";
import PlaySpace from "./PlaySpace.jsx";

function App() {
  return (
    <div className="App">
     <PlaySpace/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
