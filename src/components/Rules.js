import React from "react"
import { Link } from "react-router-dom"

function Rules(props) {
  return(
    <div className="rules">
      <ul>
        <li>Single player vs dealer</li>
        <li>Decks used: 6</li>
      </ul>
      <Link to="/">
        <button>
          Back
        </button>
      </Link>
    </div>
  ) 
}

export default (Rules)