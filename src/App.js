import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Menu from "./components/Menu"
import BetSelection from "./components/BetSelection"
import PlayGame from "./components/PlayGame"
import Rules from "./components/Rules"
import "./App.css"

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
      gameCount: 1,
    }
    this.shuffleCards = this.shuffleCards.bind(this)
    this.dealCards = this.dealCards.bind(this)
    this.startNewGame = this.startNewGame.bind(this)
    this.confirmBet = this.confirmBet.bind(this)
    this.handleBetChange = this.handleBetChange.bind(this)
  }

  confirmBet() {
    const { bet, balance } = this.state
    if (bet > balance || bet <= 0) {
      alert("Bet should be positive number smaller than your balance.")
    } else {
      
      this.setState(prevState => {
        return({
          balance: prevState.balance - bet,
          stake: bet*2,
        })
      }, this.shuffleCards())
    } 
  }

  shuffleCards() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
      .then(response => response.json())
      .then(data => {
        this.setState({
          deck: data.deck_id
      }, this.dealCards)
      });
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


  render() {
    const { shuffleCards, drawCards, dealCards, handleBetChange, startNewGame, confirmBet} = this
    const {username, bet, balance, stake, playerHand, playerPoints, dealerHand, dealerPoints, deck, display, gameCount} = this.state
    return (
      <Router>
        <Route exact path="/" render={() => <Menu 
          newgame={startNewGame}
          />} />
        <Route exact path="/betselection" render={() => <BetSelection 
          changebet={handleBetChange}
          bet = {bet}
          balance = {balance}
          confirmbet = {confirmBet}
          />} />
        <Route exact path="/game" render={() => <PlayGame 
          bet = {bet}
          stake = {stake}
          balance={balance}
          username={username}
          playerPoints={playerPoints}
          dealerPoints={dealerPoints}
          dealCards={dealCards}
          />} />
        
    </Router>
    )
  }
}

export default App;
