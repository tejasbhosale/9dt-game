import React from "react";
import Square from "./Square";
const Grid = ({ squares, onClick }) => {
    
return(
  <div className="board">
    {squares.map((square, i) => (
      <Square key={i} square={square} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
  
)};

export default Grid;