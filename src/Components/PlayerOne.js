import React from 'react';
import '../App.css';
import '../index.css'

class PlayerOne extends React.Component {

  render(){
// console.log(this.props.piecesOut)
    return(
      <div className="player">
        <h1>Player One</h1>
        <br></br>
        <p>Score:{this.props.piecesOut}</p>
        <br></br>
        <br></br>
       <div className="player-container">
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
        <div className="item">4</div>
        <div className="item">5</div>
        <div className="item">7</div>
        <div className="item">8</div>
        <div className="item">9</div>
        <div className="item">10</div>
        <div className="item">11</div>
        <div className="item">12</div>
        <div className="item">13</div>
        <div className="item">14</div>
        <div className="item">15</div>
        <div className="item">16</div>
      </div>
        <div className="player-buttons">
          <button>Update Player Info</button>
          <button>Get Player 1 Link</button>
        </div>
      </div>
    )
  }
}

export default PlayerOne