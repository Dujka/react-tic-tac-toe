import React from "react";

function UndoRedo(props) {
  let text;
  if (props.increment == 1) text = "Redo";
  else text = "Undo";

  return (
    <button className="control-button" onClick={props.onClick}>
      {text}
    </button>
  );
}

export default UndoRedo;
