import { useState } from "react";

const Edit = ({ addData, submittingStatus }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function changeTitle(e) {
    setTitle(e.target.value);
  }
  function changeContent(e) {
    setContent(e.target.value);
  }

  console.log(title, content);

  function addItem() {
    submittingStatus.current = true;
    addData((prevData) => [{ title, content }, ...prevData]);
    setTitle("");
    setContent("");
  }

  return (
    <div>
      <h1>TO-DO</h1>
      <h3>Subject</h3>
      <input type="text" value={title} onChange={changeTitle} />
      <h3>Content</h3>
      <input type="text" value={content} onChange={changeContent} />
      <button onClick={addItem} className="add">
        Add Todo
      </button>
    </div>
  );
};

export default Edit;
