import React from 'react';
import '../App.css';
import '../index.css'
import Piece from './Piece'

class Cell extends React.Component {

  render(){
    return(
      <div onClick={() => {this.props.destinationCellClick(this.props.cellId)}} className={`${(parseInt(this.props.cellId, 10)) < 150 ? "light-cell" : "dark-cell"}`}>

        {this.props.cell ? <Piece selectPiece={this.props.selectPiece} pieceId={this.props.cell} getPiece={this.props.getPiece}/> : null}

      </div>
    )
  }
}

export default Cell


