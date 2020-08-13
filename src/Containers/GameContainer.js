import React from 'react';
import '../App.css';
import '../index.css'
import BoardsContainer from './BoardsContainer'

class GameContainer extends React.Component {

  render(){
    // console.log(this.props.currentGame)

    return(
      <main>
      <h1>Game</h1>
      <br></br>
      <br></br>
      <div className="game-container"></div>
      <BoardsContainer currentGame={this.props.currentGame} />
      </main>
    )
  }
}

export default GameContainer