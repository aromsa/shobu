import React from 'react';
import '../App.css';
import '../index.css'

class PlayerOne extends React.Component {

  render(){

    return(
      <div className="player-1">{this.props.name}</div>
    )
  }
}

export default PlayerOne