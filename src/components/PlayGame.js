import React from "react"
import { Link } from "react-router-dom"

import CardDisplay from "./CardDisplay"

function PlayGame(props) {
  const { saveGame, nextRound, endGamePopup, endRoundPopup, quitAndReset,
    bet, stake, balance, dealerPoints, username, playerPoints, hit, playerHand,
    dealerHand, roundCount, doubledown, stand, roundResult } = props
  return (
    <div className="game">
      <div className="game-table" >
        <div className="dealer-side">
          <div className="name-points">
            <div className="name">Dealer</div>
            <div className="points">{dealerPoints}</div>
          </div>
          <div className="hand">
            {dealerHand.map((card, index) => <CardDisplay key={index} card={card} />)}
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
          <div className="quit-save-buttons" onClick={saveGame}>
            <Link to="/">
              <button>
                Save and Quit
              </button>
            </Link>
            <Link to="/" onClick={quitAndReset}>
              <button>
                Quit
              </button>
            </Link>
            <Link to="/roundhistory">
              <button>
                Round history
              </button>
            </Link>
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
            {playerHand.map((card, index) => <CardDisplay key={index} card={card} />)}
          </div>
        </div>
      </div>
      <div className="hit-stand-double-buttons">
        <input
          type="button"
          value="Hit"
          onClick={() => {
            hit()
          }
          }
          style={playerPoints >= 21 ? { display: "none" } : { display: "block" }}
        />
        <input
          type="button"
          value="Double Down"
          style={playerPoints >= 21 ? { display: "none" } : { display: "block" }}
          onClick={() => {
            doubledown()
          }
          } />
        <input
          type="button"
          value="Stand"
          onClick={() => {
            stand()
          }
          } />
      </div>
      <div className="end-round-popup" style={{ display: endRoundPopup }}>
        You {roundResult} round {roundCount}
          <div className="end-round-buttons">
          <Link to="/betselection" onClick={nextRound}>
            <button>
              Next Round
              </button>
          </Link>
        </div>
      </div>
      <div className="end-round-popup" style={{ display: endGamePopup }}>
        <div className="end-game-buttons">
          Game Over
            <Link to="/">
            <button>
              FFFFF
              </button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default PlayGame