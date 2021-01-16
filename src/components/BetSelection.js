import React from "react"
import {Link} from "react-router-dom"

function BetSelection(props) {
  const { changebet, confirmbet, bet, balance } = props
  return(
    <div className="bet-selection">
      <h1>BET</h1> 
      <div className="bet-buttons">         
        <input 
          type="button"
          name="bet"
          value="5"
          onClick={changebet}/>
        <input 
          type="button"
          name="bet"
          value="10"
          onClick={changebet}/>
        <input 
          type="button"
          name="bet"
          value="25"
          onClick={changebet}/>
        <input 
          type="button"
          name="bet"
          value="50"
          onClick={changebet}/>
        <input 
          type="button"
          name="bet"
          value="100"
          onClick={changebet}/>
        <input 
          type="button"
          name="bet"
          value="500"
          onClick={changebet}/>
        <input 
          type="button"
          name="bet"
          value={balance}
          onClick={changebet}/>
      </div>
      <div className="custom-bet">
        <label>Custom Bet</label>
        <input 
          type="number"
          name="bet"
          step="5"
          value={bet}
          onChange={changebet}
          />
      </div>
      <div className="bet-balance-information">
        <p>Your bet: {balance-bet >= 0 && bet >= 0 ? `${bet}$`: "Invalid bet"}</p>
        <p>Your balance: {balance}$</p>
        <p>Balance after bet: {balance-bet >= 0 && bet >= 0 ? `${balance-bet}$`: "Invalid bet"}</p>
      </div>
      <Link to="/game">

        <button onClick={confirmbet}>
          Confirm
        </button>
      </Link>
    </div>
  )
}

export default BetSelection