import React from 'react';
import '../App.css';
import '../index.css'

class Welcome extends React.Component {

  render(){

    return(
      <div className="welcome">
        <form className="form-body" >
      <h1>Start a new game!</h1>
      <br></br>
      <label>
        Player One's Name:
        <input
          name="name"
          type="text"
          required />
      </label>

      <label>
        Player Two's Name:
        <input
          name="name"
          type="text"
          required />
      </label>

      <label>
        <input
          name="acceptedTerms"
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