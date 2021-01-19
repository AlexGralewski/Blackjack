import React from "react"
import { Link } from "react-router-dom"

import Footer from "./Footer"

function Saves() {
  return (
    <div className="saves">
      <Link to="/">
        <button>
          Back
        </button>
      </Link>
      <Footer />
    </div>
  )
}

export default Saves