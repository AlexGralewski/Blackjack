import React from "react"

function displayCard(props) {
  //takes string argument where first letter is the value of the card and second is suit
  return(
    <div className="card">
      <div class="top-part"></div>
      <div class="bottom-part"></div>
    </div>
  )
}

export default displayCard