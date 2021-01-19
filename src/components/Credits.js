import React from "react"
import { Link } from "react-router-dom"

import Footer from "./Footer"

function Credits(props) {
  return(
    <div className="credits">
      <ul>
        <li>Deck of cards API: <a href="https://github.com/crobertsbmw">Chase Roberts</a></li>
        <li>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></li>
      </ul>
      <Link to="/">
        <button>
          Back
        </button>
      </Link>
      <Footer />
    </div>
  ) 
}

export default (Credits)