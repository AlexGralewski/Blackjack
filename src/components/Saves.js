import React from "react"
import {Link} from "react-router-dom"

function Saves(props) {
  const {saves, loadChosenSave} = props
  return(
    <div className="saves">
      <h1>Saves</h1>
      <div className="saves-list">
        {saves === null || saves === [] ? "no saves yet" :
        saves.map((save,id )=> (
          <div className="save">
              <div className="save-id">{id+1}</div>
              <div className="save-text">
                <div className="save-username">{save.username}</div>
                <div className="save-round">Round: {save.round}/5</div>
                <div className="save-balance">Balance: {save.balance}</div>
              </div>
              
              <Link to="/betselection" onClick={() => {loadChosenSave(id)}}>
                <button>
                  Load
                </button>
                </Link>
            </div>
          ))}
      </div>
      <Link to="/">
        <button>
          Back
        </button>
      </Link>
    </div>
  )
}

export default Saves