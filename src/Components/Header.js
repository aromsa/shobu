import React from 'react';
import '../App.css';
import '../index.css'
import { slide as Menu } from 'react-burger-menu'

class Header extends React.Component {

  state = {menuOpen: false}

  showSettings = (event) => {
    console.log('clicking menu')
    event.preventDefault();
    let boolean = !this.state.menuOpen
    this.setState({
      menuOpen: boolean
    })
  }

  render(){

    return(
      <header>
        <span >SHOBU</span>
        
        <Menu right width={ '20%' } style={"cursor: pointer"}>   
        <br></br>
        <a onClick={() => this.props.newGame("Player 1", "Player 2")} id="new-game" className="menu-item">New Game</a>
        <br></br>
        <a onClick={this.props.resetGame} id="refresh-game" className="menu-item">Refresh Game</a>
        <br></br>
        <a onClick={this.props.deleteGame} id="quit-game" className="menu-item">Delete Game</a>
      </Menu>
        </header>
    )
  }
}

export default Header