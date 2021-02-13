import React from "react";

function Square(props) {
  return (
    <div className="square" onClick={props.onClick}>
      <div className="div-in-square">{props.value}</div>
    </div>
  );
}

export default Square;
