import React from "react"
import {Link} from "react-router-dom"

import Footer from "./Footer"

function HighScores(props) {
  const {scoreBoard} = props
  return(
    <div className="high-scores">
      <h1>High Scores</h1>
      <div className="high-score-list">
        {scoreBoard === null || scoreBoard === [] ? "no saved scores yet" :
        scoreBoard.map((record,id )=> (
          <div className="high-score-list-item">
            <div>{id+1}. {record.username} </div>
            <div>{record.score} </div>
          </div>
        ))}
      </div>
      <Link to="/">
        <button>
          Back
        </button>
      </Link>
      <Footer />
    </div>
  )
}

export default HighScores