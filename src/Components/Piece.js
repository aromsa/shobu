import React from 'react';
import '../App.css';
import '../index.css'


class Piece extends React.Component {

  

  render(){
    console.log(this.props)
    const thePiece = this.props.getPiece(this.props.pieceId)
    // console.log(this.props.isPieceSelected(this.props.pieceId) ? "It's selected" : null)
    return(
    <div onClick={(e) => this.props.selectPiece(this.props.pieceId)} className="piece">
      <img className={(this.props.isPieceSelected(this.props.pieceId)) ? "rock-img rock-select" : "rock-img"} src={thePiece.url} style={{transform: `rotate(${thePiece.rotation})`}}></img>
    </div>
    )
  }
}

export default Piece