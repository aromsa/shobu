import React from 'react';
import './App.css';
import './index.css'
import PlayerOne from './Components/PlayerOne'
import PlayerTwo from './Components/PlayerTwo'
import Header from './Components/Header'
import GameContainer from './Containers/GameContainer';

function App() {
  return (
    <div className="container">
      <Header/>
      <PlayerOne />
      <GameContainer />
      <PlayerTwo/>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
