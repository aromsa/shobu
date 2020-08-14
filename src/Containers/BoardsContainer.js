import React from 'react';
import '../App.css';
import '../index.css'
import Board from '../Components/Board'

class BoardsContainer extends React.Component {

  render(){
    console.log(this.props.currentGame)
    let boards = this.props.currentGame.map((board, i) => <Board destinationCellClick={this.props.destinationCellClick} 
    selectPiece={this.props.selectPiece} boardId={i} key={i} board={board}/>)
    return(
 
      <div className="boards-container">
        {boards}
      </div>

    )
  }
}

export default BoardsContainer