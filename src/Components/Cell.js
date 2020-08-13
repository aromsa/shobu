import React from 'react';
import '../App.css';
import '../index.css'
import Piece from './Piece'

class Cell extends React.Component {

  render(){
    console.log(this.props.cellId)
    return(
      <div className="cell">

        {this.props.cell ? <Piece pieceId={this.props.cell}/> : null}

      </div>
    )
  }
}

export default Cell


