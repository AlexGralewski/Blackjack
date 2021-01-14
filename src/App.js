import React, { useState } from "react"

function App() {



  return (
    <div className="app">
      <div className="menu">
        <button className="menu-item new-game">New Game</button>
        <button className="menu-item load-game">Load Game</button>
        <button className="menu-item high-scores">High Scores</button>
      </div>

      <div className="game">
        <div className="table">
          <div className="dealer-hand"></div>
          <div className="deck"></div>
          <div className="player-hand"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
