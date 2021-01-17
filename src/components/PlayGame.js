import React from "react"
import {Link} from "react-router-dom"

function PlayGame(props) {
  const { bet,stake, balance, dealerPoints,username, playerPoints, dealCards, playerHand, dealerHand,roundCount} = props
  return(
    <div className="game">
      <div className="quit-save-buttons">
        <Link to="/">
          <button>
            Save
          </button>
        </Link>
        <Link to="/">
          <button>
            Quit
          </button>
        </Link>
      </div>          
      <div className="game-table" >
        <div className="dealer-side">
          <div className="player-title">Dealer</div>
          <div className="dealer-hand">{dealerHand}</div>
          <div className="dealer-points">{dealerPoints}</div>
        </div>
        <div className="neutral">
          <div className="values-info">
            <p>Round: {roundCount}/5</p>
            <p>Bet: {bet}</p>
            <p>Stake: {stake} </p>
            <p>Balance: {balance}</p>
          </div>
          <div className="deck">
            <div className="card card1" />
            <div className="card card2" />
            <div className="card card3" />
          </div>
        </div>
        <div className="player-side">
          <div className="player-title">{username}</div>
          <div className="player-hand">{playerHand}</div>
          <div className="player-points">{playerPoints}</div>
        </div>
      </div>
      <div className="hit-stand-double-buttons">
        <input 
          type="button"
          value="Hit"
          onClick={dealCards}
          style={playerPoints >= 21 ? { display:"none"} : { display:"block"}}
          />
        <input 
          type="button"
          value="Double Down"
          style={playerPoints >= 21 ? { display:"none"} : { display:"block"}}
          onClick={dealCards}/>
        <input 
          type="button"
          value="Stand"
          onClick={dealCards}/>
      </div>

    </div>
  )
}

export default PlayGame