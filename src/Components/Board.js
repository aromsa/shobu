import React from 'react';
import '../App.css';
import '../index.css'
import Cell from './Cell'

class Board extends React.Component {

  cells = () => {
    let squaresArr = []
    this.props.board.forEach((row, i1) => {
      row.forEach((cell, i2) => {
        let cellId = `${this.props.boardId}${i1}${i2}`
        squaresArr.push(<Cell destinationCellClick={this.props.destinationCellClick} 
          selectPiece={this.props.selectPiece} key={cellId} cellId={cellId} cell={cell} getPiece={this.props.getPiece} />)
      })
    })
    return squaresArr
  }

  render(){
    // console.log(this.props.board)
    return(
      <div className={`${(parseInt(this.props.boardId)) < 2 ? "light-board" : "dark-board"}`}>
        {this.cells()}
      </div>
    )
  }
}

export default Board