import React from 'react';
import '../App.css';
import '../index.css'


class Piece extends React.Component {

  

  render(){
    const thePiece = this.props.getPiece(this.props.pieceId)
    console.log(this.thePiece)
    return(
    <div onClick={(e) => {e.stopPropagation(); this.props.selectPiece(this.props.pieceId)}} className="piece">
      <img src={thePiece.url} style={{transform: `rotate(${thePiece.rotation})`}}></img>
    </div>
    )
  }
}

export default Piece