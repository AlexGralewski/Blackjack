import React from "react"
import { Link } from "react-router-dom"

function RoundHistory(props) {
  const { roundHistory } = props
  
  return (
    <div className="round-history">
      {roundHistory}
      <Link to="/game">
        <button>
          Back
        </button>
      </Link>
    </div>
  )
}

export default RoundHistory