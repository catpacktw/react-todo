import React from "react";

function FilterButton({
  btn,
  isPressed,
  setTaskStatus,
  reflashFilter,
  setFilterName,
}) {
  function changeTaskStatus(status) {
    reflashFilter.current = true;
    setTaskStatus(status);
  }

  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => {
        setFilterName(btn[0]);
        changeTaskStatus(btn[1]);
      }}
    >
      <span className="visually-hidden">Show </span>
      <span>{btn[0]}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
