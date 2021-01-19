import React from "react"
import { Link } from "react-router-dom"

import Footer from "./Footer"

function RoundHistory() {
  return (
    <div className="round-history">
      <Link to="/game">
        <button>
          Back
        </button>
      </Link>
    </div>
  )
}

export default RoundHistory