import React from "react"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      username: 'Player',
      bet: 0,
      balance: 1000,
      stake: 0,
      playerHand: [],
      playerPoints: 0,
      dealerHand: [],
      dealerPoints: 0,
      deck: '',
      display: {
        menu:'flex',
        betSel:'none',
        table:'none'
      },
      gameCount: 1,
    }
    this.shuffleCards = this.shuffleCards.bind(this)
    this.dealCards = this.dealCards.bind(this)
    this.startNewGame = this.startNewGame.bind(this)
    this.confirmBet = this.confirmBet.bind(this)
    this.handleBetChange = this.handleBetChange.bind(this)
  }


  shuffleCards() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
      .then(response => response.json())
      .then(data => this.setState({deck:data.deck_id}));
  }

  drawCards(numberofCards) {
    fetch(`https://deckofcardsapi.com/api/deck/${this.statedeck}/draw/?count=${numberofCards}`)
      .then(response => response.json())
      .then(data => console.log(data))
  }

  dealCards() {
    const dealt = this.drawCards(4)

    console.log(dealt)
  }

  handleBetChange(e) {
    const {value} = e.target
    this.setState({
      bet: value
    })
  }

  startNewGame() {
    this.setState({
      display: {
        menu:'none', 
        betSel:'flex',
        table:'none'}
    })
  }

  confirmBet() {
    const { bet, balance } = this.state
    if (bet > balance || bet <= 0) {
      alert("Bet should be positive number smaller than your balance.")
    } else {
      this.shuffleCards()
      this.setState(prevState => {
        return({
          balance: prevState.balance - bet,
          stake: bet*2,
          display: {
            menu:'none',
            betSel:'none',
            table:'flex'
          },
        })
      })
    } 
  }

  render() {
    const { shuffleCards, drawCards, dealCards, handleBetChange, startNewGame, confirmBet} = this
    const {username, bet, balance, stake, playerHand, playerPoints, dealerHand, dealerPoints, deck, display, gameCount} = this.state
    return (
      <div className="app">
        <div className="menu" style={{display:display.menu}}>
          <div className="menu-title">Blackjack</div>
          <button 
            className="menu-item new-game"
            onClick={startNewGame}>
              New Game
          </button>
          <button 
            className="menu-item load-game"
            onClick={startNewGame}>
              Load Game
          </button>
          <button 
            className="menu-item high-scores"
            onClick={startNewGame}>
              High Scores
          </button>
          <button 
            className="menu-item high-scores"
            onClick={startNewGame}>
              Rules
          </button>
        </div>
        <div className="bet-selection" style={{display:display.betSel}}>
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
        <div className="game" style={{display:display.table}}>
          
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
      </div>
    )
  }
}

export default App;
