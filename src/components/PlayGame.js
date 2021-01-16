import React from "react"

function PlayGame(props) {
  const { bet,stake, balance, dealerPoints,username, playerPoints, dealCards} = props
  return(
    <div className="game">          
      <div className="game-table" >
        <div className="dealer-side">
          <div className="player-title">Dealer</div>
          <div className="dealer-hand"></div>
          <div className="dealer-points">{dealerPoints}</div>
        </div>
        <div className="neutral">
          <div className="values-info">
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
          <div className="player-hand"></div>
          <div className="player-points">{playerPoints}</div>
        </div>
      </div>
      <div className="game-buttons">
        <input 
          type="button"
          value="Hit"
          onClick={dealCards}/>
        <input 
          type="button"
          value="Stand"
          onClick={dealCards}/>
        <input 
          type="button"
          value="Double Down"
          onClick={dealCards}/>
      </div>
    </div>
  )
}

export default PlayGame