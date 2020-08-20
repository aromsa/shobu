import React from 'react';
import './App.css';
import './index.css'
import Player from './Components/Player'
import Header from './Components/Header'
import GameContainer from './Containers/GameContainer'
import Welcome from './Components/Welcome'

// const gamesURL = "http://localhost:3000/games"
// const movesURL = "http://localhost:3000/moves"
// const playersURL = "http://localhost:3000/players"

const gamesURL = "https://shobu-game-backend.herokuapp.com/games"
const movesURL = "https://shobu-game-backend.herokuapp.com/moves"
const playersURL = "https://shobu-game-backend.herokuapp.com/players"

class App extends React.Component {

  shouldFetch = true
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

  isPieceSelected = (pieceId) => pieceId===this.state.pieceInPlay

  checkForUpdates = () => {
    if (!this.shouldFetch) {return}
    console.log('interval fetch')
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
       this.pieces = currentGame.pieces
       this.setState({ currentGame: currentGame.game, you: currentGame.players.you, opponent: currentGame.players.opponent})
       this.gameInterval = setInterval(this.checkForUpdates, 3000)
       window.history.pushState({pathname: '/'}, "", `/gameinplay/${currentGame.players.you.url}`)
       window.location.reload()
    })
  }

  deepCopyOfCurrentGame = () => {
    let newAr0 = []
    this.state.currentGame.forEach(board => {
      let newAr1 = []
      board.forEach(row => {
        let newAr2 = [...row]
        newAr1 = [...newAr1, newAr2]
      })
      newAr0 = [...newAr0, newAr1]
    })
    return newAr0
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
       this.setState({ currentGame: currentGame.game, you: currentGame.players.you, opponent: currentGame.players.opponent, playerOnePiecesOut: currentGame.pieces_out.you, playerTwoPiecesOut:currentGame.pieces_out.opponent})
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
        window.location.reload()
    })
  } 

  getPiece = (pieceId) => this.pieces[pieceId]

  componentDidMount() {
    if (this.props.jwt)
      this.fetchOngoingGame()
    else {}
  }

  selectPiece = (piece) => {
    if (this.state.destinationCell.length < 1)
    {
      this.shouldFetch = false
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

  capturePiece = (pieceInCell) => {
    if (pieceInCell === this.state.pieceInPlay) {console.log("Deselected")}
    else { 
      console.log("Capturing this piece", pieceInCell) 
      // const newGameBoard = [...this.state.currentGame]
      const tempFromCell = this.state.destinationCell[0]
      const tempToCell = this.state.destinationCell[1]
      this.makeMove(this.state.destinationCell[1], this.state.pieceInPlay, () => this.makeMove("400", pieceInCell, null, () => this.shouldFetch=true))
      this.quickRenderMove(tempFromCell, tempToCell, this.state.pieceInPlay)
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
        this.makeMove(this.state.destinationCell[1], this.state.pieceInPlay, null, () => this.shouldFetch=true)
        this.quickRenderMove(this.state.destinationCell[0], this.state.destinationCell[1], this.state.pieceInPlay)
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

  quickRenderMove = (fromCellId, toCellId, pieceId) => {
    const tempBoard = this.deepCopyOfCurrentGame()
    tempBoard[fromCellId[0]][fromCellId[1]][fromCellId[2]] = null
    tempBoard[toCellId[0]][toCellId[1]][toCellId[2]] = pieceId
    this.setState({pieceInPlay: null, destinationCell: [], currentGame: tempBoard})
  }

  makeMove = (cellId, pieceId, callbackMakeMove, turnIntervalOn = () => {}) => {
    console.log(`cellId: ${cellId}, pieceId: ${pieceId}`)
    fetch(movesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        jwt: this.state.you.url,
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
      this.setState({playerOnePiecesOut: game.pieces_out.you, playerTwoPiecesOut: game.pieces_out.opponent}, turnIntervalOn)
      if (callbackMakeMove) {callbackMakeMove()}
    })
    .catch(() => {
      this.setState({}, turnIntervalOn)
      alert('The server is temporarily busy.  Please try your move again.')
    })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("Previous State:", prevState, "Current State:", this.state)
  // }

  render(){
    // console.log(this.state.pieceInPlay, this.state.destinationCell)
    return (
      <div className="container">
        <Header resetGame={this.resetOngoingGame} deleteGame={this.deleteOngoingGame}/>
        {this.props.jwt ? <>
        <Player getPiece={this.getPiece} player={this.state.you} piecesOut={this.state.playerOnePiecesOut} />
        <GameContainer isPieceSelected={this.isPieceSelected} destinationCellClick={this.destinationCellClick} selectPiece={this.selectPiece} getPiece={this.getPiece}
        currentGame={this.state.currentGame} />
        <Player getPiece={this.getPiece} player={this.state.opponent} piecesOut={this.state.playerTwoPiecesOut} /></> : <Welcome newGame={this.createNewGame}/> }
        <footer></footer>
      </div>
    );
  } 
}

export default App;
