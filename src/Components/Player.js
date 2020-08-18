import React from 'react';
import '../App.css';
import '../index.css'
import Piece from './Piece'

class Player extends React.Component {

  alertWithPlayerLink = () => {
    alert(`http://localhost:3001/gameinplay/${this.props.player.url}`)
  }

  render(){
    // let piecesOut = this.props.piecesOut.map(piece => <Piece pieceId={piece} getPiece={this.props.getPiece} />)
    return(
      <div className="player">
        <h1>{this.props.player.name}</h1>
        <br></br>
        <p>Score:{this.props.piecesOut.length}</p>
        <br></br>
        <br></br>
        {/* {piecesOut} */}
        <div className="player-buttons">
          <button>Update {this.props.player.name}'s Info</button>
          <button onClick={this.alertWithPlayerLink}>Get {this.props.player.name}'s Link</button>
        </div>
      </div>
    )
  }
}

export default Player