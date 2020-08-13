import React from 'react';
import './App.css';
import './index.css'
import PlayerOne from './Components/PlayerOne'
import PlayerTwo from './Components/PlayerTwo'
import Header from './Components/Header'
import GameContainer from './Containers/GameContainer';
let URL = "http://localhost:3000/games"
// API LIVES IN APP

class App extends React.Component {

  state = {
    currentGame: []
  }

  componentDidMount(){
    fetch(URL)
    .then(resp => resp.json())
    .then(currentGame => this.setState({ currentGame: currentGame }))
  }

  render(){
    // console.log(this.state.currentGame)

    return (
      <div className="container">
        <Header/>
        <PlayerOne />
        <GameContainer currentGame={this.state.currentGame} />
        <PlayerTwo/>
        <footer>Footer</footer>
      </div>
    );
  } 
}

export default App;
