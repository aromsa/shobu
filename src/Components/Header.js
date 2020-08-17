import React from 'react';
import '../App.css';
import '../index.css'
import { slide as Menu } from 'react-burger-menu'

class Header extends React.Component {

  state = {menuOpen: false}

  showSettings = (event) => {
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
        <a onClick={this.showSettings} id="new-game" className="menu-item">New Game</a>
        <br></br>
        <a onClick={this.showSettings} id="refresh-game" className="menu-item">Refresh Game</a>
        <br></br>
        <a onClick={this.showSettings} id="quit-game" className="menu-item">Quit Game</a>
      </Menu>
        </header>
    )
  }
}

export default Header