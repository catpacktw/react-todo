const Item = ({
  id,
  title,
  content,
  status,
  modifyData,
  reflashStatus,
  completeStatus,
}) => {

  function completeItem() {
    completeStatus.current = id;
    modifyData(function (prev) {
      return prev.map((item) =>
        item.id === id ? { ...item, status: status ^ 1 } : item
      );
    });
  }

  function deleteItem() {
    reflashStatus.current = id;
    modifyData(function (prev) {
      return prev.filter((item) => item.id !== id);
    });
  }

  function IsCompleted() {
    if (status === 1) {
      return (
        <div>
          <h3>
            <s>{title}</s>
          </h3>
          <s>{content}</s>
        </div>
      );
    }
    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    );
  }

  function ButtonIsCompleted() {
    if (status === 1) {
      return <div>Undo</div>;
    }
    return <div>Done</div>;
  }

  return (
    <div>
      <div className="item">
        <IsCompleted />
        <button onClick={completeItem} className="completed">
          <ButtonIsCompleted />
        </button>
      </div>
      <div className="button">
      <button className="edit">
          Edit
        </button>
        <button onClick={deleteItem} className="remove">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
