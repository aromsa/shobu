import React from 'react';
import '../App.css';
import '../index.css'

class Welcome extends React.Component {

  state = {
    playerOneName:"",
    playerTwoName:"",
    TosChecked:false
  }

  updateField = (e) => {
    let newState
    if (e.target.name==="TosChecked") {newState= {TosChecked: !this.state.TosChecked}}
    else {newState = {[e.target.name]:e.target.value}}
    this.setState(newState)
  }

  createTheGame = (e) => {
    e.preventDefault()
    this.props.newGame(this.state.playerOneName, this.state.playerTwoName)
  }



  render(){

    return(
      <div className="welcome">
        <form className="form-body" onSubmit={this.createTheGame} >
      <h1>Start a new game!</h1>
      <br></br>
      <label>
        Player One's Name:
        <input
          onChange={this.updateField}
          value={this.state.playerOneName}
          name="playerOneName"
          placeholder="Player One"
          type="text"
          required />
      </label>

      <label>
        Player Two's Name:
        <input
          onChange={this.updateField}
          name="playerTwoName"
          value={this.state.playerTwoName}
          placeholder="Player Two"
          type="text"
          required />
      </label>

      <label>
        <input
          onChange={this.updateField}
          checked={this.state.TosChecked}
          name="TosChecked"
          type="checkbox"
          required />
        I accept the terms of service        
      </label>

      <button>Start!</button>
    </form>
      </div>
    )
  }
}

export default Welcome