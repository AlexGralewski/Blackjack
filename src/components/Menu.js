import React from "react"
import {Link} from "react-router-dom"

import Footer from "./Footer"

function Menu(props) {
  const {startNewGame, loadSave} = props
  return(
    <div className="menu">
      <div className="menu-title">Blackjack</div>
      <Link to="/username" onClick={() => {startNewGame()}}>
        <button className="menu-item new-game">
          New Game
        </button>
      </Link>
      <Link to="/betselection" onClick={() => {loadSave()}}>
        <button className="menu-item">
          Load Game
        </button>
      </Link>
      <Link to="/highscores" >
        <button className="menu-item">
          High Scores
        </button>
      </Link>
      <Link to="/rules" >
        <button className="menu-item">
          Rules
        </button>
      </Link>
      <Link to="/credits" >
        <button className="menu-item">
          Credits
        </button>
      </Link>
      <button className="reset-game" onClick={() => {localStorage.clear()}}>
        Reset Game
      </button>
      <Footer />
    </div>
  )
}

export default Menu