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

  state = {
    currentGame: [],
    pieceInPlay: "",
    destinationCell: "",
    player1: {},
    player2: {}
  }

  // componentDidMount(){
  //   fetch(gamesURL)
  //   .then(resp => resp.json())
  //   .then(currentGame => this.setState({ currentGame: currentGame }))
  // }

  fetchOngoingGame = () => {
    fetch(`${playersURL}?jwt=${this.props.jwt}`)
    .then(resp => {
      if (resp.ok) { 
        return resp.json()
      }
      else {throw new Error()}
    })
    .then(currentGame => this.setState({ currentGame: currentGame }))
    .catch(() => {
      window.history.pushState({pathname: '/'}, "", '/')
    })
  }

  componentDidMount() {
    if (this.props.jwt)
      this.fetchOngoingGame()
    else {console.log("This will load a new game")}
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
    // console.log(this.state.pieceInPlay, this.state.destinationCell)
    console.log(this.state.currentGame)
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

  // noGameYet = () => {
  //   return (
  //     <div className="container">
  //       <Header/>
  //       <PlayerOne name="No Player 1 Yet" />
  //       <GameContainer destinationCellClick={this.destinationCellClick} selectPiece={this.selectPiece} currentGame={this.state.currentGame} />
  //       <PlayerTwo name="No Player 2 Yet"/>
  //       <footer>Footer</footer>
  //     </div>
  //   )
  // }

  // gameInProgress = routerProps => {
  //   console.log(routerProps)
  //   return (
  //     <div className="container">
  //       <Header/>
  //       <PlayerOne name={this.state.player1.name} />
  //       <GameContainer destinationCellClick={this.destinationCellClick} selectPiece={this.selectPiece} currentGame={this.state.currentGame} />
  //       <PlayerTwo name={this.state.player1.name}/>
  //       <footer>Footer</footer>
  //     </div>
  //   )
  // }

  // render() {
  //   console.log("heyo")
   
  //   return (
  //     <Router>
  //       <div>
  //         <Route exact path="/" render={this.noGameYet}/>
  //         <Route path="/gameinplay/:jwt" render={this.gameInProgress}/>
  //       </div>
  //     </Router>
  //   )
  // } 
}

export default App;
