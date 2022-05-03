const Filter = ({ setTaskStatus, reflashFilter }) => {
  function changeTaskStatus(status) {
    reflashFilter.current = true;
    setTaskStatus(status);
  }

  return (
    <div className="filters btn-group stack-exception">
      <button
        onClick={() => changeTaskStatus(null)}
        type="button"
        className="btn toggle-btn"
      >
        All
      </button>
      <button
        onClick={() => changeTaskStatus(0)}
        type="button"
        className="btn toggle-btn"
      >
        Pending
      </button>
      <button
        onClick={() => changeTaskStatus(1)}
        type="button"
        className="btn toggle-btn"
      >
        Done
      </button>
    </div>
  );
};

export default Filter;
