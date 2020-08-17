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
  gameInterval = null  

  state = {
    currentGame: [],
    pieceInPlay: "",
    destinationCell: "",
    you: {},
    opponent: {},
    playerOnePiecesOut: [],
    playerTwoPiecesOut: [],
  }

  checkForUpdates = () => {
    console.log('interval fetch')
    fetch(`${gamesURL}?jwt=${this.props.jwt}`)
    .then(resp => resp.json())
    .then(game => this.setState({currentGame: game.game, playerOnePiecesOut: game.pieces_out.you, playerTwoPiecesOut: game.pieces_out.opponent}))
  }

  clearCurrentGame = () => {
    if (this.gameInterval) { clearInterval(this.gameInterval) }
  }

  createNewGame = (player1Name, player2Name) => {
    this.clearCurrentGame()
    const configObj = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({player_1_name: player1Name, player_2_name: player2Name})
    }
    fetch(`${gamesURL}`, configObj)
    .then(resp => {
        return resp.json()
    })
    .then(currentGame => {
      console.log(currentGame)
       this.pieces = currentGame.pieces
       this.setState({ currentGame: currentGame.game, you: currentGame.players.you, opponent: currentGame.players.opponent})
       this.gameInterval = setInterval(this.checkForUpdates, 3000)
       window.history.pushState({pathname: '/'}, "", `/gameinplay/${currentGame.players.you.url}`)
    })
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
      //  this.gameInterval = setInterval(this.checkForUpdates, 3000)
    })
    .catch(() => {
      window.history.pushState({pathname: '/'}, "", '/')
    })
  }

  resetOngoingGame = () => {
    const configObj = {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({jwt: this.state.you.url })
    }
    fetch(`${gamesURL}`, configObj)
    .then(resp => resp.json())
    .then(currentGame => {
      console.log(currentGame)
       this.setState({ currentGame: currentGame.game, playerOnePiecesOut: [], playerTwoPiecesOut: []})
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

  componentWillUnmount() {
    clearInterval(this.gameInterval)
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
    .then((game) => {
      console.log(game)
      this.setState({currentGame: game.game, playerOnePiecesOut: game.pieces_out.you, playerTwoPiecesOut: game.pieces_out.opponent})})
  }

  render(){
    return (
      <div className="container">
        <Header newGame={this.createNewGame} resetGame={this.resetOngoingGame}/>
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
