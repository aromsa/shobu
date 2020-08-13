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
        squaresArr.push(<Cell key={cellId} cellId={cellId} cell={cell} />)
      })
    })
    return squaresArr
  }


  render(){
    // console.log(this.props.board)
    return(
      <div className="board">
        {this.cells()}
      </div>
    )
  }
}

export default Board