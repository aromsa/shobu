import React from 'react';
import '../App.css';
import '../index.css'
import { slide as Menu } from 'react-burger-menu'

class Header extends React.Component {
  
  state = {menuOpen: false}

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  
  closeMenu () {
    this.setState({menuOpen: false})
  }

  render(){

    return(
      <header>
        <span >SHOBU</span>
        
        <Menu right width={ '20%' } style={"cursor: pointer"} isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>   
        <br></br>
        <a onClick={() => { this.closeMenu(); this.props.newGame("Player 1", "Player 2")}} id="new-game" className="menu-item">New Game</a>
        <br></br>
        <a onClick={() => { this.closeMenu(); this.props.resetGame()}} id="refresh-game" className="menu-item">Refresh Game</a>
        <br></br>
        <a onClick={() => { this.closeMenu(); this.props.deleteGame()}} id="quit-game" className="menu-item">Delete Game</a>
      </Menu>
        </header>
    )
  }
}

export default Header