import React from "react"
import {Link} from "react-router-dom"

function Menu(props) {
  const {startNewGame} = props
  return(
    <div className="menu">
      <div className="menu-title">Blackjack</div>
      <Link to="/username" onClick={startNewGame}>
        <button className="menu-item new-game">
          New Game
        </button>
      </Link>
      <Link to="/betselection" >
        <button className="menu-item load-game">
          Load Game
        </button>
      </Link>
      <Link to="/highscores" >
        <button className="menu-item high-scores">
          High Scores
        </button>
      </Link>
      <Link to="/rules" >
        <button className="menu-item rules">
          Rules
        </button>
      </Link>
      <Link to="/credits" >
        <button className="menu-item credits">
          Credits
        </button>
      </Link>
      
    </div>
  )
}

export default Menu