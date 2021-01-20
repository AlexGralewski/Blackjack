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
import RoundHistory from "./components/RoundHistory"

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
      endRoundPopup: "none", //determines if end-round popup is displayed
      endGamePopup: "none", //determines if end-round popup is displayed
      roundResult: "",  // tells if current round was "won", "drew", "lost"
      roundHistory: [], //array containing data about previous hands
      scoreBoard: [] //array containing high scores, loaded upon choosing option high scores in main menu
    }
    this.shuffleCards = this.shuffleCards.bind(this)
    this.dealStartingHands = this.dealStartingHands.bind(this)
    this.confirmBet = this.confirmBet.bind(this)
    this.handleBetChange = this.handleBetChange.bind(this)
    this.dealCard = this.dealCard.bind(this)
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
      endRoundPopup: "none", 
      endGamePopup: "none", 
      roundResult: "",  
      roundHistory: [],
      scoreBoard: []
    })
  }

  //handles change in input of bet
  handleBetChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  //handles "confirm bet" button click
  confirmBet = () => {
    const { bet, balance } = this.state
    if (bet > balance || bet <= 0) {
      alert("Bet should be positive number smaller than your balance.")
    } else {

      this.setState(prevState => {
        return ({
          balance: prevState.balance - bet,
          stake: bet * 2.5,
          endRoundPopup: "none",
          endGamePopup: "none"
        })
      }, this.shuffleCards())
    }
  }

  //shuffles cards, automatical on "confirm bet" button click
  shuffleCards = () => {
    fetch('https://deckofcardsapi.com/api/deck/bhwcmpj3ltym/shuffle/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          deck: data.deck_id
        }, this.dealStartingHands())
      });
  }

  //deals starting hands to player and dealer
  dealStartingHands = () => {
    this.dealCard('player')
    this.dealCard('dealer')
    this.dealCard('player')
  }

  //deals cards (and adds points of the dealt card)
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

  //handles "hit" button click
  handleHit = () => {
    this.dealCard('player')
  }

  //handles "doubledown" button click
  handleDoubleDown = () => {
    this.dealCard('player')
    this.setState(prevState => {
      return ({
        bet: prevState.bet * 2,
        balance: prevState.balance - prevState.bet,
        stake: prevState.bet * 5,
      })
    }, this.dealerDraw())
  }

  //draws cards for dealer after player chose to "stand" or "double down"
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
          }, this.countDealerPoints())
        })
    }
  }

  //counts dealer card points after drawing
  countDealerPoints = () => {
    setTimeout(() => {
      if (this.state.dealerPoints < 17 && this.state.dealerPoints <= this.state.playerPoints) {
        this.dealerDraw()
      } else {
        this.roundEnd()
      }
    }, 1000)
  }

  //round end event
  roundEnd = () => {
    const { playerPoints, dealerPoints } = this.state
    this.saveRoundHistory()
    this.setState(prevState => {
      let winlosedraw
      if (prevState.roundCount === 5) {
        this.gameEnd()
      }
      if ((playerPoints > dealerPoints && playerPoints < 22) || dealerPoints > 21) {
        winlosedraw = "won"
        return ({
          balance: prevState.balance + prevState.stake,
          endRoundPopup: "flex",
          roundResult: winlosedraw
        })
      } else if (playerPoints === dealerPoints) {
        winlosedraw = "drew"
        return ({
          balance: prevState.balance + Number(prevState.bet),
          endRoundPopup: "flex",
          roundResult: winlosedraw

        })
      } else {
        winlosedraw = "lost"
        if (this.state.balance === 0) {
          this.gameEnd()
        }
        
        return ({
          endRoundPopup: "flex",
          roundResult: winlosedraw
        })
      }
    })
  }

  //saves rounds history
  saveRoundHistory = () => {
    this.setState(prevState => {
      return({
        roundHistory: [...prevState.roundHistory, {
          roundCount: this.state.roundCount,
          playerHand: this.state.playerHand,
          playerPoints: this.state.playerPoints,
          dealerHand: this.state.dealerHand,
          dealerPoints: this.state.dealerPoints,
        }]
      })
    })
  }

  //handles click of "next round" button
  nextRound = () => {
    this.setState(prevState => {
      return ({
        playerHand: [],
        playerPoints: 0,
        dealerHand: [],
        dealerPoints: 0,
        roundCount: prevState.roundCount + 1,
        endRoundPopup: "none"
      })
    })
  }

  //end game event
  gameEnd = () => {
    this.setState({
      endGamePopup: "flex"
    })
  }

  //handles "save game" button click
  saveGame = () => {
    let save = { username: this.state.username, balance: this.state.balance, round: this.state.roundCount }
    localStorage.setItem('save', JSON.stringify(save))
  }

  //loads last save
  loadSave = () => {
    let save = localStorage.getItem('save')
    save = JSON.parse(save)
    console.log(save)
    if (save === null) {
      return
    } else {
      this.setState({
        username: save.username,
        balance: save.balance,
        roundCount: save.round
      })
    }
  }

  //saves game score after game ended (on button click)
  saveGameScore = () => {
    let scores = localStorage.getItem('scores')
    scores = JSON.parse(scores)
    console.log(scores)
    if (scores === null) {
      scores = [{username: this.state.username, score: this.state.balance}]
    } else {
      scores.push({username: this.state.username, score: this.state.balance})
      function compareScores( a, b ) {
        if ( a.score < b.score ){
          return 1;
        }
        if ( a.score > b.score ){
          return -1;
        }
        return 0;
      } 
      scores.sort( compareScores );
      localStorage.setItem('scores', JSON.stringify(scores))
    }
    

    localStorage.setItem('scores', JSON.stringify(scores))
  }

  //loads scoreboard
  loadScoreboard = () => {
    let scores = localStorage.getItem('scores')
    scores = JSON.parse(scores)
    this.setState({
      scoreBoard: scores
    })
  }

  componentWillUnmount() {
    this.saveGame()
  }
  
  render() {
    const { saveGame, nextRound, resetGameState, dealStartingHands,
      handleBetChange, confirmBet, handleHit,
      handleDoubleDown, dealerDraw, loadSave, loadScoreboard, saveGameScore} = this
    const { endGamePopup, endRoundPopup, username, bet, balance, stake,
      playerHand, playerPoints, dealerHand, dealerPoints, roundCount, roundResult, 
      roundHistory, scoreBoard} = this.state
    return (
      <Router>
        <Route exact path="/" render={() => <Menu
          resetGameState={resetGameState}
          loadSave={loadSave}
          loadScoreboard={loadScoreboard}
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
          endRoundPopup={endRoundPopup}
          endGamePopup={endGamePopup}
          nextRound={nextRound}
          saveGame={saveGame}
          roundResult={roundResult}
          roundHistory={roundHistory}
          saveGameScore={saveGameScore}
        />} />
        <Route exact path="/roundhistory" render={() => <RoundHistory 
          roundHistory={roundHistory}
          />} />
        <Route exact path="/highscores" render={() => <HighScores 
          scoreBoard={scoreBoard}
          />} />
        <Route exact path="/rules" render={() => <Rules />} />
        <Route exact path="/credits" render={() => <Credits />} />

      </Router>
    )
  }
}

export default App;
