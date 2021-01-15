import React, { useState } from "react"

function App() {
  const [bet, setBet] = useState(0) //controls bet value
  const [balance, setBalance] = useState(1000) //controls credit balance
  const [stake, setStake] = useState(0)
  const [playerHand, setPlayerHand] = useState('')
  const [dealerHand, setDealerHand] = useState('')
  const [deck, setDeck] = useState('')
  const [displayMenu] = useState('none')

  function shuffleCards() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
      .then(response => response.json())
      .then(data => console.log(data));
  }

  function handleBetChange(e) {
    setBet(e.target.value)
  }

  function confirmBet(e) {
    if (bet > balance || bet <= 0) {
      alert("Bet should be positive number smaller than your balance.")
    } else {
      shuffleCards()
      setBalance(previousBalance => {
        return(previousBalance - bet)
      })
      setStake(bet*2)
    }
  }

  return (
    <div className="app">
      <div className="menu">
        <div className="menu-title">Blackjack</div>
        <button className="menu-item new-game">New Game</button>
        <button className="menu-item load-game">Load Game</button>
        <button className="menu-item high-scores">High Scores</button>
      </div>

      <div className="game">
        <div className="values-info">
          <p>Stake: {stake}</p>
          <p>Balance: {balance}</p>
        </div>
        <div className="bet-selection">
          <h1>BET</h1> 
          <div className="bet-buttons">         
            <input 
              type="button"
              name="bet"
              value="5"
              onClick={handleBetChange}/>
            <input 
              type="button"
              name="bet"
              value="10"
              onClick={handleBetChange}/>
            <input 
              type="button"
              name="bet"
              value="25"
              onClick={handleBetChange}/>
            <input 
              type="button"
              name="bet"
              value="50"
              onClick={handleBetChange}/>
            <input 
              type="button"
              name="bet"
              value="100"
              onClick={handleBetChange}/>
            <input 
              type="button"
              name="bet"
              value="500"
              onClick={handleBetChange}/>
            <input 
              type="button"
              name="bet"
              value={balance}
              onClick={handleBetChange}/>
          </div>
          <div className="custom-bet">
            <label>Custom Bet</label>
            <input 
              type="number"
              name="bet"
              step="5"
              value={bet}
              onChange={handleBetChange}
              />
          </div>
          <div className="bet-balance-information">
            <p>Your bet: {balance-bet >= 0 && bet >= 0 ? `${bet}$`: "Invalid bet"}</p>
            <p>Your balance: {balance}$</p>
            <p>Balance after bet: {balance-bet >= 0 && bet >= 0 ? `${balance-bet}$`: "Invalid bet"}</p>
          </div>
          <button onClick={confirmBet}>
            Confirm
          </button>
        </div>
        <div className="game-table">
          <div className="dealer-side">
            <div className="dealer-hand"></div>
            <div className="dealer-points"></div>
          </div>
          <div className="neutral">
            <div className="deck">
              <div className="card reversed">Deck</div>
            </div>
          </div>
          <div className="player-side">
            <div className="player-hand"></div>
            <div className="player-points"></div>
          </div>
        </div>
        <div className="game-buttons">
          <button>Hit</button>
          <button>Stand</button>
          <button>Double Down</button>
        </div>
      </div>
    </div>
  );
}

export default App;
