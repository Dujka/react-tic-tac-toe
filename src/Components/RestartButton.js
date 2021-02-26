import React from "react";

function RestartButton(props) {
  return (
    <button className="control-button" onClick={props.onClick}>
      Restart game
    </button>
  );
}

export default RestartButton;
