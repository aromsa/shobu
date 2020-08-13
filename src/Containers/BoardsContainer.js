import React from 'react';
import '../App.css';
import '../index.css'
import Board from '../Components/Board'

class BoardsContainer extends React.Component {

  render(){

    return(
 
      <div className="boards-container">
        <Board />
        <div className="white-board-1"> </div>
        <div className="brown-board-2"> </div>
        <div className="brown-board-3"> </div>
      </div>

    )
  }
}

export default BoardsContainer