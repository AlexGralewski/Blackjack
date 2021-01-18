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
      deck: 'bhwcmpj3ltym', //deckCode
      roundCount: 1, // round counter (out of 5)
      roundEndDisplay: "none"
    }
    this.shuffleCards = this.shuffleCards.bind(this)
    this.dealStartingHands = this.dealStartingHands.bind(this)
    this.startNewGame = this.startNewGame.bind(this)
    this.confirmBet = this.confirmBet.bind(this)
    this.handleBetChange = this.handleBetChange.bind(this)
    this.dealCard = this.dealCard.bind(this)
  }

  confirmBet = () => {
    const { bet, balance } = this.state
    if (bet > balance || bet <= 0) {
      alert("Bet should be positive number smaller than your balance.")
    } else {

      this.setState(prevState => {
        return ({
          balance: prevState.balance - bet,
          stake: bet * 2.5,
        })
      }, this.shuffleCards())
    }
  }

  shuffleCards = () => {
    fetch('https://deckofcardsapi.com/api/deck/bhwcmpj3ltym/shuffle/')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          deck: data.deck_id
        }, this.dealStartingHands())
      });
  }



  dealStartingHands = () => {
    this.dealCard('player')
    this.dealCard('dealer')
    this.dealCard('player')
  }

  dealCard = whichHand => {
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck}/draw/?count=1`)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => {
          let total = 0
          if (data.cards[0].value === "ACE") {
            if (total + 11 > 21) {
              total += 1
            } else {
              total += 11
            }
          } else if (data.cards[0].value === "KING" || data.cards[0].value === "QUEEN" || data.cards[0].value === "JACK") {
            total += 10
          } else {
            total += Number(data.cards[0].value)
          }
          if (whichHand === 'player') {
            return ({
              playerHand: [...prevState.playerHand, data.cards[0].image],
              playerPoints: prevState.playerPoints + total
            })
          } else {
            return ({
              dealerHand: [...prevState.dealerHand, data.cards[0].image,],
              dealerPoints: prevState.dealerPoints + total
            })
          }
        })
      })
  }

  handleHit = () => {
    this.dealCard('player')
  }

  handleDoubleDown = () => {
    this.dealCard('player')
    this.setState(prevState => {
      return ({
        bet: prevState.bet * 2,
        balance: prevState.balance - prevState.bet,
        stake: prevState.bet * 5,
      })
    })
  }

  handleBetChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  resetGameState = () => {
    this.setState({
      username: 'Player',
      bet: 5,
      balance: 1000,
      stake: 0,
      playerHand: [],
      playerPoints: 0,
      dealerHand: [],
      dealerPoints: 0,
      deck: 'bhwcmpj3ltym',
      roundCount: 1,
    })
  }

  startNewGame = () => {
    this.setState({
      username: 'Player',
      bet: 5,
      balance: 1000,
      roundCount: 1,
    })
  }

  dealerDraw = () => {
    if (this.state.playerPoints > 21) {
      this.roundEnd()
    } else {
      fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck}/draw/?count=1`)
        .then(response => response.json())
        .then(data => {
          this.setState(prevState => {
            let total = 0
            if (data.cards[0].value === "ACE") {
              if (this.state.dealerPoints + 11 > 21) {
                total += 1
              } else {
                total += 11
              }
            } else if (data.cards[0].value === "KING" || data.cards[0].value === "QUEEN" || data.cards[0].value === "JACK") {
              total += 10
            } else {
              total += Number(data.cards[0].value)
            }
            return ({
              dealerHand: [...prevState.dealerHand, data.cards[0].image,],
              dealerPoints: prevState.dealerPoints + total
            })
          }, this.checkDealerPoints())
        })
    }
  }
  checkDealerPoints = () => {

    console.log(this.state.dealerPoints)
    setTimeout(() => {

      if (this.state.dealerPoints < 17 && this.state.dealerPoints < this.state.playerPoints) {
        this.dealerDraw()
      } else {
        this.roundEnd()
      }
    }, 1000)
  }

  roundEnd = () => {
    alert("round end")
    this.setState(prevState => {
      if (prevState.roundCount === 5) {
        this.gameEnd()
      }
      return ({

        balance: prevState.balance + prevState.stake,
        stake: 0,
        bet: 5,
        roundCount: prevState.roundCount + 1
      })
    })
  }

  gameEnd = () => {

  }


  render() {
    const { resetGameState, dealStartingHands, handleBetChange, startNewGame, confirmBet, handleHit, handleDoubleDown, dealerDraw } = this
    const { username, bet, balance, stake, playerHand, playerPoints, dealerHand, dealerPoints, roundCount } = this.state
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
          bet={bet}
          balance={balance}
          confirmBet={confirmBet}
        />} />
        <Route exact path="/game" render={() => <PlayGame
          bet={bet}
          stake={stake}
          balance={balance}
          username={username}
          playerPoints={playerPoints}
          playerHand={playerHand}
          dealerPoints={dealerPoints}
          dealerHand={dealerHand}
          dealStartingHands={dealStartingHands}
          hit={handleHit}
          doubledown={handleDoubleDown}
          stand={dealerDraw}
          roundCount={roundCount}
          quitAndReset={resetGameState}
        />} />
        <Route exact path="/highscores" render={() => <HighScores />} />
        <Route exact path="/rules" render={() => <Rules />} />
        <Route exact path="/credits" render={() => <Credits />} />

      </Router>
    )
  }
}

export default App;
