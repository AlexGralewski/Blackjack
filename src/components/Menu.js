import React from "react"
import {Link} from "react-router-dom"

import Footer from "./Footer"

function Menu(props) {
  const {resetGameState, loadSaves, loadScoreboard} = props
  return(
    <div className="menu">
      <div className="menu-title">Blackjack</div>
      <Link to="/username" onClick={() => {resetGameState()}}>
        <button className="menu-item new-game">
          New Game
        </button>
      </Link>
      <Link to="/loadgame" onClick={() => {loadSaves()}}>
        <button className="menu-item">
          Load Game
        </button>
      </Link>
      <Link to="/highscores" onClick={() => {loadScoreboard()}} >
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