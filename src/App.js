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
    destinationCell: ""
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
    .then(this.setState({destinationCell: cellId}))
  }

  render(){
    console.log(this.state.pieceInPlay, this.state.destinationCell)
    return (
      <div className="container">
        <Header/>
        <PlayerOne />
        <GameContainer destinationCellClick={this.destinationCellClick} selectPiece={this.selectPiece} currentGame={this.state.currentGame} />
        <PlayerTwo/>
        <footer>Footer</footer>
      </div>
    );
  } 
}

export default App;
