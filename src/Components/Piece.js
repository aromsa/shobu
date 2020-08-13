import React from 'react';
import '../App.css';
import '../index.css'

class Piece extends React.Component {

  render(){

    return(
    <div onClick={() => this.props.selectPiece(this.props.pieceId)} className="piece">
      {this.props.pieceId}
    </div>
    )
  }
}

export default Piece