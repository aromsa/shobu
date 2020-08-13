import React from 'react';
import '../App.css';
import '../index.css'

class Piece extends React.Component {

  render(){

    return(
    <p>{this.props.pieceId}</p>
    )
  }
}

export default Piece