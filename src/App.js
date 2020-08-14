import React from 'react';
import './App.css';
import './index.css'
import PlayerOne from './Components/PlayerOne'
import PlayerTwo from './Components/PlayerTwo'
import Header from './Components/Header'
import GameContainer from './Containers/GameContainer';
let gamesURL = "http://localhost:3000/games"
let movesURL = "http://localhost:3000/moves"

class App extends React.Component {

  state = {
    currentGame: [],
    pieceInPlay: "",
    // destinationCell: "",
    playerOnePiecesOut: 0,
    playerTwoPiecesOut: 0,
  }

  componentDidMount(){
    fetch(gamesURL)
    .then(resp => resp.json())
    .then(currentGame => this.setState({ currentGame: currentGame }))
  }

  selectPiece = (piece) => {
    this.setState({
      pieceInPlay: piece
    })
  }

  destinationCellClick = (cellId) => {
    this.makeMove(cellId)
  }

  makeMove = (cellId) => {
    fetch(movesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        piece_id: this.state.pieceInPlay,
        coordinates: cellId
      })
    })
    .then(resp => resp.json())
    .then((game) => this.setState({currentGame: game}))
  }

  render(){
    console.log(this.state.pieceInPlay, this.state.destinationCell)
    return (
      <div className="container">
        <Header/>
        <PlayerOne piecesOut={this.state.playerOnePiecesOut} />
        <GameContainer destinationCellClick={this.destinationCellClick} selectPiece={this.selectPiece} 
        currentGame={this.state.currentGame} />
        <PlayerTwo piecesOut={this.state.playerTwoPiecesOut} />
        <footer>Footer</footer>
      </div>
    );
  } 
}

export default App;
