import { useState } from "react";
import PriorityButton from "./PriorityButton";
import { PRIORITY_BTN_MAP } from "../../../global/constant";

const PRIORITY_BTN_NAMES = Object.entries(PRIORITY_BTN_MAP);

const Add = ({ addData, submittingStatus }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [weight, setWeight] = useState(2);
  const [priorityName, setPriorityName] = useState(["Medium"]);

  const priorityBtns = PRIORITY_BTN_NAMES.map((btn) => (
    <PriorityButton
      btn={btn}
      isPressed={btn[0] === priorityName}
      priorityName={setPriorityName}
      weight={setWeight}
    />
  ));

  function changeTitle(e) {
    setTitle(e.target.value);
  }
  function changeContent(e) {
    setContent(e.target.value);
  }

  console.log(title, content, weight);

  function addItem() {
    submittingStatus.current = true;
    addData((prevData) => [{ title, content, weight }, ...prevData]);
    setTitle("");
    setContent("");
  }

  return (
    <div>
      <h1>TO-DO</h1>
      <div className="priority btn-group stack-exception">
        <h3>Subject</h3>
        {priorityBtns}
      </div>
      <div className="add-text">
        <input type="text" value={title} onChange={changeTitle} />
      </div>
      <h3>Content</h3>
      <div className="add-text">
        <input type="text" value={content} onChange={changeContent} />
      </div>
      <button onClick={addItem} className="add">
        Add Todo
      </button>
    </div>
  );
};

export default Add;
