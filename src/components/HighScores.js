import React from "react"
import {Link} from "react-router-dom"

function HighScores() {
  return(
    <div className="high-scores">
      <h1>High Scores</h1>
      <Link to="/">
        <button>
          Back
        </button>
      </Link>
    </div>
  )
}

export default HighScores