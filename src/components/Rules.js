import React from "react"
import { Link } from "react-router-dom"

import Footer from "./Footer"

function Rules() {
  return (
    <div className="rules">
      <ul>
        <li>Single player vs dealer</li>
        <li>Decks used: 6</li>
        <li>Game length: 5 rounds</li>
        <li>Game length: 5 rounds</li>
      </ul>
      <Link to="/">
        <button>
          Back
        </button>
      </Link>
      <Footer />
    </div>
  )
}

export default Rules