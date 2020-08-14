import React from 'react';
import '../App.css';
import '../index.css'
let stoneB1 = "https://i.postimg.cc/zXsybcVv/blk-stone-1.png"
let stoneB2 = "https://i.postimg.cc/zGwGLDs2/blk-stone-2.png"
let stoneB3 = "https://i.postimg.cc/V6hfyJtv/blk-stone-3.png"
let stoneB4 = "https://i.postimg.cc/jqGfP51R/blk-stone-4.png"

let stoneW1 = "https://i.postimg.cc/6387GJL7/wht-stone-1.png"
let stoneW2 = "https://i.postimg.cc/4xXmQhQR/wht-stone-2.png"
let stoneW3 = "https://i.postimg.cc/mD1Dg3BC/wht-stone-3.png"
let stoneW4 = "https://i.postimg.cc/m2sDTFq1/wht-stone-4.png"

class Piece extends React.Component {

  render(){

    return(
    <div onClick={(e) => {e.stopPropagation(); this.props.selectPiece(this.props.pieceId)}} className="piece">
      <img src={stoneB1}></img>
    </div>
    )
  }
}

export default Piece