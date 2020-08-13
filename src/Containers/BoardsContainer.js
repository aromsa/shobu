import React from 'react';
import '../App.css';
import '../index.css'
import Board from '../Components/Board'

class BoardsContainer extends React.Component {

  render(){

    return(
 
      <div className="boards-container">
        <Board />
        <Board />
        <Board />
        <Board />
      </div>

    )
  }
}

export default BoardsContainer