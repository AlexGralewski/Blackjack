import React from "react"
import { Link } from "react-router-dom"

import CardDisplay from "./CardDisplay"

function RoundHistory(props) {
  const { roundHistory } = props

  return (
    <div className="round-history">
      <div className="round-history-list">
        {roundHistory.map(object => (
          <div className="round-history-list-item">
            <div>Round: {object.roundCount}</div>
            <div>{object.playerHand.map(card => (<CardDisplay card={card} />))}</div>
            <div>Player points: {object.playerPoints}</div>
            <div>{object.dealerHand.map(card => (<CardDisplay card={card} />))}</div>
            <div>Dealer points: {object.dealerPoints}</div>
          </div>
        ))}
      </div>
      <Link to="/game">
        <button>
          Back
        </button>
      </Link>
    </div>
  )
}

export default RoundHistory