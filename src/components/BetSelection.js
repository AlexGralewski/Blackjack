import React from "react"
import {Link} from "react-router-dom"

function BetSelection(props) {
  const { changeBet, confirmBet, bet, balance, saveGame, roundCount } = props
  return(
    <div className="bet-selection">
      <h1>BET</h1> 
      <div className="bet-buttons">         
        <input 
          type="button"
          name="bet"
          value="5"
          onClick={changeBet}/>
        <input 
          type="button"
          name="bet"
          value="10"
          onClick={changeBet}/>
        <input 
          type="button"
          name="bet"
          value="25"
          onClick={changeBet}/>
        <input 
          type="button"
          name="bet"
          value="50"
          onClick={changeBet}/>
        <input 
          type="button"
          name="bet"
          value="100"
          onClick={changeBet}/>
        <input 
          type="button"
          name="bet"
          value="500"
          onClick={changeBet}/>
        <input 
          type="button"
          name="bet"
          value={balance}
          onClick={changeBet}/>
      </div>
      <div className="custom-bet">
        <label>Custom Bet</label>
        <input 
          type="number"
          name="bet"
          step="5"
          value={bet}
          min="0"
          max={balance}
          onChange={changeBet}
          />
      </div>
      <div className="bet-balance-information">
        <p>Your bet: {balance >= bet && bet >= 0 ? `${bet}$`: "Invalid bet"}</p>
        <p>Possible winnings: {balance >= bet && bet >= 0 ? `${bet * 2.5}$`: "Invalid bet"}</p>
        <p>Your balance: {balance}$</p>
        <p>Balance after bet: {balance >= bet && bet >= 0 ? `${balance-bet}$`: "Invalid bet"}</p>
      </div>
      <div className="bet-link-buttons">
        <Link to="/">
          <button>
            Quit
          </button>
        </Link>
        <Link to="/" onClick={() => saveGame()} style={roundCount > 1 ? { display: "flex" } : { display: "none" }}>
          <button>
            Save and Quit
          </button>
        </Link>
        <Link to="/game" style={bet > 0 && balance >= bet ? { display:"flex"} : { display:"none"}}>
          <button onClick={confirmBet}>
            Confirm
          </button>
        </Link>
      </div>
    </div>
  )
}

export default BetSelection