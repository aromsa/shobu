import React from 'react';
import '../App.css';
import '../index.css'
import BoardsContainer from './BoardsContainer'

class GameContainer extends React.Component {

  render(){

    return(
      <main>
      <h1>Game</h1>
      <br></br>
      <br></br>
      <div className="game-container"></div>
      <BoardsContainer/>
      </main>
    )
  }
}

export default GameContainer