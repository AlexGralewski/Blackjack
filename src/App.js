import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Menu from "./components/Menu"
import BetSelection from "./components/BetSelection"
import PlayGame from "./components/PlayGame"
import Rules from "./components/Rules"
import Credits from "./components/Credits"
import HighScores from "./components/HighScores"
import NameInput from "./components/NameInput"
import "./App.css"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      username: 'Player', //Player's username
      bet: 5, //Player's current bet in $
      balance: 1000, //Player's total balance in $
      stake: 0, //Possible winnings of the current round (bet + 1,5 bet)
      playerHand: [], //Player's hand
      playerPoints: 0, //Player's hand score
      dealerHand: [], //Dealer's hand
      dealerPoints: 0, //Dealer's hand score
      deck: '', //deckCode
      roundCount: 1, // round counter (out of 5)
    }
    this.shuffleCards = this.shuffleCards.bind(this)
    this.dealStartingHands = this.dealStartingHands.bind(this)
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
          stake: bet*2.5,
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

  dealStartingHands() {
    console.log(this.state.deck)

  }

  handleBetChange(e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  startNewGame() {
    this.setState({
      username: 'Player',
      bet: 5,
      balance: 1000,
      roundCount:1
    })
  }


  render() {
    const { dealStartingHands, handleBetChange, startNewGame, confirmBet} = this
    const {username, bet, balance, stake, playerHand, playerPoints, dealerHand, dealerPoints, roundCount} = this.state
    return (
      <Router>
        <Route exact path="/" render={() => <Menu 
          startNewGame={startNewGame}
          />} />
        <Route exact path="/username" render={() => <NameInput 
          changeName={handleBetChange}
          username={username}
          />} />
        <Route exact path="/betselection" render={() => <BetSelection 
          changeBet={handleBetChange}
          bet = {bet}
          balance = {balance}
          confirmBet = {confirmBet}
          />} />
        <Route exact path="/game" render={() => <PlayGame 
          bet = {bet}
          stake = {stake}
          balance={balance}
          username={username}
          playerPoints={playerPoints}
          playerHand={playerHand}
          dealerPoints={dealerPoints}
          dealerHand={dealerHand}
          dealStartingHands={dealStartingHands}
          roundCount={roundCount}
          />} />
        <Route exact path="/highscores" render={() => <HighScores/>} />
        <Route exact path="/rules" render={() => <Rules/>} />
        <Route exact path="/credits" render={() => <Credits/>} />
        
    </Router>
    )
  }
}

export default App;
