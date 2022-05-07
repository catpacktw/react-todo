import React from "react";

function PriorityButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => {
        props.priorityName(props.btn[0]);
        props.weight(props.btn[1]);
      }}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.btn[0]}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default PriorityButton;
