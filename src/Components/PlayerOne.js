import React from 'react';
import '../App.css';
import '../index.css'

class PlayerOne extends React.Component {

  render(){
// console.log(this.props.piecesOut)
    return(
      <div className="player">
        <h1>Player One</h1>
        <br></br>
      <p>Pieces Out:{this.props.piecesOut}</p>
      
      </div>
      
    )
  }
}

export default PlayerOne