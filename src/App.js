import React from 'react';
import './App.css';
import './index.css'
import PlayerOne from './Components/PlayerOne'
import PlayerTwo from './Components/PlayerTwo'
import Header from './Components/Header'
import GameContainer from './Containers/GameContainer'

const gamesURL = "http://localhost:3000/games"
const movesURL = "http://localhost:3000/moves"
const playersURL = "http://localhost:3000/players"

class App extends React.Component {

  pieces = {}
  players = []
  activeGame = !!this.props.jwt  

  state = {
    currentGame: [],
    pieceInPlay: "",
    destinationCell: "",
    you: {},
    opponent: {},
    playerOnePiecesOut: 0,
    playerTwoPiecesOut: 0,
  }

  fetchOngoingGame = () => {
    fetch(`${playersURL}?jwt=${this.props.jwt}`)
    .then(resp => {
      if (resp.ok) { 
        return resp.json()
      }
      else {throw new Error('Not a valid game link')}
    })
    .then(currentGame => {
       this.pieces = currentGame.pieces
       this.setState({ currentGame: currentGame.game, you: currentGame.players.you, opponent: currentGame.players.opponent})
    })
    .catch(() => {
      window.history.pushState({pathname: '/'}, "", '/')
    })
  }

  getPiece = (pieceId) => this.pieces[pieceId]

  componentDidMount() {
    if (this.props.jwt)
      this.fetchOngoingGame()
    else {console.log("This will load a new game")}
  }

  selectPiece = (piece) => {
    console.log(piece)
    this.setState({
      pieceInPlay: piece
    })
  }

  destinationCellClick = (cellId) => {
    this.makeMove(cellId)
  }

  makeMove = (cellId) => {
    console.log(cellId)
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
    .then((game) => {
      console.log(game)
      this.setState({currentGame: game.game})})
  }

  render(){
    // console.log(this.state.pieceInPlay, this.state.destinationCell)
    console.log(this.pieces)
    return (
      <div className="container">
        <Header/>
        <PlayerOne piecesOut={this.state.playerOnePiecesOut} />
        <GameContainer destinationCellClick={this.destinationCellClick} selectPiece={this.selectPiece} getPiece={this.getPiece}
        currentGame={this.state.currentGame} />
        <PlayerTwo piecesOut={this.state.playerTwoPiecesOut} />
        <footer></footer>
      </div>
    );
  } 
}

export default App;
