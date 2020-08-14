import React from 'react';
import '../App.css';
import '../index.css'

class PlayerTwo extends React.Component {

  render(){

    return(
      <div className="player-2">{this.props.name}</div>
    )
  }
}

export default PlayerTwo