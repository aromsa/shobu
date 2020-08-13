import React from 'react';
import '../App.css';
import '../index.css'
import Cell from './Cell'

class Board extends React.Component {

  render(){

    return(
      <div className="board">
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
      </div>
    )
  }
}

export default Board