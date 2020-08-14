import React from 'react';
import '../App.css';
import '../index.css'

class PlayerTwo extends React.Component {

  render(){

    return(
      <div className="player-2">
        <h1>Player Two</h1>
           <br></br>
        <p>Pieces Out:{this.props.piecesOut}</p>
      </div>
    )
  }
}

export default PlayerTwo