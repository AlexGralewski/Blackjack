import React from "react"
import {Link} from "react-router-dom"

import CardDisplay from "./CardDisplay"

function PlayGame(props) {
  const { bet,stake, balance, dealerPoints,username, playerPoints, hit, playerHand, dealerHand,roundCount} = props
  return(
    <div className="game">
      <div className="quit-save-buttons">
        <Link to="/">
          <button>
            Save and Quit
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
          <div className="name-points">
            <div className="name">Dealer</div>
            <div className="points">{dealerPoints}</div>
          </div>
          <div className="hand">
            {dealerHand.map((card,index) => <CardDisplay key={index} card={card}/>)}
          </div>
        </div>
        <hr />
        <div className="neutral">
          <div className="values-info">
            <p>Round: {roundCount}/5</p>
            <p>Bet: {bet}</p>
            <p>Stake: {stake} </p>
            <p>Balance: {balance}</p>
          </div>
          <div className="deck">
            <div className="card card1 reversed" />
            <div className="card card2 reversed" />
            <div className="card card3 reversed" />
          </div>
        </div>
        <hr />
        <div className="player-side">
          <div className="name-points">
            <div className="name">{username}</div>
            <div className="points">{playerPoints}</div>
          </div>
          <div className="hand">
            {playerHand.map((card,index) => <CardDisplay key={index} card={card}/>)}
            </div>
        </div>
      </div>
      <div className="hit-stand-double-buttons">
        <input 
          type="button"
          value="Hit"
          onClick={() => {
            hit()}
          }
          style={playerPoints >= 21 ? { display:"none"} : { display:"block"}}
          />
        <input 
          type="button"
          value="Double Down"
          style={playerPoints >= 21 ? { display:"none"} : { display:"block"}}
          onClick={() => {
            hit()}
          }/>
        <input 
          type="button"
          value="Stand"
          onClick={() => {
            hit()}
          }/>
      </div>

    </div>
  )
}

export default PlayGame