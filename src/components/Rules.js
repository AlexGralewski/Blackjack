import React from "react"
import { Link } from "react-router-dom"

import Footer from "./Footer"

function Rules() {
  return (
    <div className="rules">
      <h1>Rules</h1>
      <ul>
        <li>Single player vs automated dealer</li>
        <li>Decks used: 6</li>
        <li>Starting balance: 1000$</li>
        <li>Game length: 5 rounds (or loss of all the funds)</li>
        <li>Dealer will stand if he has more points than 17 or the player</li>
        <li>Ace is counted as 1 or 11 depending what is better for the player</li>
        <li>Round possible winnings are always 1.5x bet</li>
        <li>Game actions: hit - draw another card, double down - draw just one more card and stand, <br/>stand - wait for dealers turn</li>
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