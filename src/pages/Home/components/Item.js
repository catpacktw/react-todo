import { useState } from "react";

const PRIORITY_BTN_MAP = {
  Urgent: 3,
  High: 2,
  Medium: 1,
  Low: 0,
};

const Item = ({
  id,
  title,
  content,
  status,
  weight,
  modifyData,
  reflashStatus,
  completeStatus,
  editStatus,
}) => {
  const [editId, setEditId] = useState(0);
  const [editContent, setEditContent] = useState(content);

  function submitEdit() {
    editStatus.current = id;
    modifyData(function (prev) {
      return prev.map((item) =>
        item.id === id ? { ...item, content: editContent } : item
      );
    });
    setEditId(0);
  }

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
        <div className="text-box">
          <h3>
            <s>{title}</s>
            <s>
              <small> [{findPriority(weight)}]</small>
            </s>
          </h3>
          <p className="text-content">
            <s>{content}</s>
          </p>
        </div>
      );
    }
    return (
      <div className="text-box">
        <h3>
          {title}
          <small> [{findPriority(weight)}]</small>
        </h3>
        <p className="text-content">{content}</p>
      </div>
    );
  }

  function ButtonIsCompleted() {
    if (status === 1) {
      return <div>Undo</div>;
    }
    return <div>Done</div>;
  }

  function findPriority(weight) {
    var priority = "";
    for (let [key, value] of Object.entries(PRIORITY_BTN_MAP)) {
      if (value === weight) priority = key;
    }
    return priority;
  }

  return (
    <div>
      <div className="item">
        {id === editId ? (
          <div className="text-box">
            <h3>
              {title}
              <small> [{findPriority(weight)}]</small>
            </h3>
            <textarea
              className="text-area"
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </div>
        ) : (
          <IsCompleted />
        )}
        <button onClick={completeItem} className="completed">
          <ButtonIsCompleted />
        </button>
      </div>
      <div className="button">
        {id === editId ? (
          <button onClick={submitEdit} className="edit">
            Submit
          </button>
        ) : (
          <button onClick={() => setEditId(id)} className="edit">
            Edit
          </button>
        )}
        <button onClick={deleteItem} className="remove">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
