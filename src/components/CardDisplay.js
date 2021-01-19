import React from "react"

function CardDisplay(props) {
  return(
    <div className="card">
      <img src={props.card} alt="card"/>
    </div>
  )
}

export default CardDisplay