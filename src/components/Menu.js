import React from "react"
import {Link} from "react-router-dom"

import Footer from "./Footer"

function Menu(props) {
  const {resetGameState, loadSaves, loadScoreboard} = props
  return(
    <div className="menu">
      <div className="menu-title">Blackjack</div>
      <Link to="/username" onClick={() => {resetGameState()}} className="menu-item">
          New Game
      </Link>
      <Link to="/loadgame" onClick={() => {loadSaves()}} className="menu-item">
          Load Game
      </Link>
      <Link to="/highscores" onClick={() => {loadScoreboard()}} className="menu-item">
          High Scores
      </Link>
      <Link to="/rules" className="menu-item">
          Rules
      </Link>
      <Link to="/credits" className="menu-item">
          Credits
      </Link>
      <button className="reset-game" onClick={() => {localStorage.clear()}} >
        Reset Game
      </button>
      <Footer />
    </div>
  )
}

export default Menu