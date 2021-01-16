import React from "react"
import {Link} from "react-router-dom"

function NameInput(props) {
  const { username, changeName } = props
  return(
    <div className="name-input">
      <h1>Choose your username</h1>
      <input 
        type="text"
        name="username"
        value={username}
        onChange={changeName} />
      <div className="name-link-buttons">
        <Link to="/">
          <button>
            Back
          </button>
        </Link>
        <Link to="/betselection" style={username === "" ? { display:"none"} : { display:"flex"}} >
          <button>
            Confirm
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NameInput