import React from 'react';
import './App.css';
import './index.css'
import Player from './Components/Player'
import Header from './Components/Header'
import GameContainer from './Containers/GameContainer'
import Welcome from './Components/Welcome'

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
    pieceInPlay: null,
    destinationCell: [],
    you: {},
    opponent: {},
    playerOnePiecesOut: [],
    playerTwoPiecesOut: [],
  }

  checkForUpdates = () => {
    // console.log('interval fetch')
    fetch(`${gamesURL}?jwt=${this.props.jwt}`)
    .then(resp => {
      if (resp.ok) { 
        return resp.json()
      }
      else {throw new Error('The server is temporarily busy.  Fetching again soon')}
    })
    .then(game => this.setState({currentGame: game.game, playerOnePiecesOut: game.pieces_out.you, playerTwoPiecesOut: game.pieces_out.opponent}))
    .catch(() => {
      console.log('The server is temporarily busy.  Fetching again soon')
    })
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
       this.gameInterval = setInterval(this.checkForUpdates, 3000)
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

  deleteOngoingGame = () => {
    clearInterval(this.gameInterval)
    const configObj = {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({jwt: this.state.you.url })
    }
    fetch(`${gamesURL}`, configObj)
    .then(resp => resp.json())
    .then(currentGame => {
        console.log(currentGame)
        this.setState({
          currentGame: [],
          pieceInPlay: "",
          destinationCell: [],
          you: {},
          opponent: {},
          playerOnePiecesOut: [],
          playerTwoPiecesOut: [],
        })
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
    if (this.state.destinationCell.length < 1)
    {
      console.log(piece)
      this.setState({
        pieceInPlay: piece
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.gameInterval)
  }

  valueAtCell = (cellId) => {
    return this.state.currentGame[cellId[0]][cellId[1]][cellId[2]]
  }

  capturePiece = async (pieceInCell) => {
    if (pieceInCell === this.state.pieceInPlay) {console.log("Deselected")}
    else { 
      console.log("Capturing this piece", pieceInCell) 
      // const newGameBoard = [...this.state.currentGame]
      this.makeMove(this.state.destinationCell[1], this.state.pieceInPlay, () => this.makeMove("400", pieceInCell))
      // send an array of Moves (will need to update the create path of Moves Controller to accept arrays )
      // update State
    }
  }

  checkForPiece = () => {
    const pieceInCell = this.valueAtCell(this.state.destinationCell[1])
    return (pieceInCell)
  }

  evaluateForMakeMove = () => {
    if (!this.state.pieceInPlay){return}
    if (this.state.destinationCell.length > 1) {
      if (!this.checkForPiece()) {
        this.makeMove(this.state.destinationCell[1], this.state.pieceInPlay)
      }
      else {
        this.capturePiece(this.checkForPiece())
        this.setState({destinationCell: [], pieceInPlay: null})
      }
    }
    // else {this.checkForPiece(cellId)}
  }

  destinationCellClick = (cellId) => {
    const newDestination = [...this.state.destinationCell, cellId]
    this.setState({destinationCell: newDestination}, this.evaluateForMakeMove)
  }

  makeMove = (cellId, pieceId, callbackMakeMove) => {
    fetch(movesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        piece_id: pieceId,
        coordinates: cellId
      })
    })
    .then(resp => {
      if (resp.ok) { 
        return resp.json()
      }
      else {throw new Error('The server is temporarily busy.  Please try your move again.')}
    })
    .then((game) => {
      console.log(game)
      this.setState({pieceInPlay: null, destinationCell: [], currentGame: game.game, playerOnePiecesOut: game.pieces_out.you, playerTwoPiecesOut: game.pieces_out.opponent})
      if (callbackMakeMove) {callbackMakeMove()}
    })
    .catch(() => {
      this.setState({pieceInPlay: null, destinationCell: []})
      alert('The server is temporarily busy.  Please try your move again.')
    })
  }

  render(){
    // console.log(this.state.pieceInPlay, this.state.destinationCell)
    return (
      <div className="container">
        <Header newGame={this.createNewGame} resetGame={this.resetOngoingGame} deleteGame={this.deleteOngoingGame}/>
        {/* <Welcome/> */}
        {this.props.jwt ? <>
        <Player getPiece={this.getPiece} player={this.state.you} piecesOut={this.state.playerOnePiecesOut} /> />
        <GameContainer destinationCellClick={this.destinationCellClick} selectPiece={this.selectPiece} getPiece={this.getPiece}
        currentGame={this.state.currentGame} />
        <Player player={this.state.opponent} piecesOut={this.state.playerTwoPiecesOut} /></> : <Welcome newGame={this.createNewGame}/> }
        <footer></footer>
      </div>
    );
  } 
}

export default App;
