import React from 'react';
import '../App.css';
import '../index.css'
import Piece from './Piece'

class Player extends React.Component {

  alertWithPlayerLink = () => {
    alert(`http://localhost:3001/gameinplay/${this.props.player.url}`)
  }

  color = () => {
    if (this.props.player.primary === true){
      return "black"
    }else {
      return "white"
    }
  }

  render(){
    // console.log(this.props.piecesOut)
    let piecesOut = this.props.piecesOut.map(piece => <Piece selectPiece={() => {}} key={`x+${piece.id}`}  pieceId={piece.id} getPiece={this.props.getPiece} />)
    
    return(
      <div className="player">
        <h1>{this.props.player.name}</h1>
        <br></br>
          <p>Color: {this.color()} </p>
        <br></br>
          <p>Score: {this.props.piecesOut.length}</p>
        <br></br>
        <div className="player-container">
        {piecesOut}
        </div>
      
        <div className="player-buttons">
          <button>Update {this.props.player.name}'s Info</button>
          <button onClick={this.alertWithPlayerLink}>Get {this.props.player.name}'s Link</button>
        </div>
      </div>
    )
  }
}

export default Player