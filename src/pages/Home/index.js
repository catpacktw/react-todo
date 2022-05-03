import { useState, useEffect, useRef } from "react";
import {
  GET_TODO_LIST,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  UPDATE_TASK_STATUS,
} from "../../global/constant";

import Add from "./components/Add";
import List from "./components/List";
import Filter from "./components/Filter";
import "./index.css";

async function fetchQueryData(taskStatus, setData) {
  const resp = await fetch(
    taskStatus === null
      ? GET_TODO_LIST
      : GET_TODO_LIST +
          "?" +
          new URLSearchParams({ status: taskStatus })
  );
  const { data } = await resp.json();
  setData(data);
  console.log(data);
  return data;
}

async function fetchCompleteData(id) {
  await fetch(
    UPDATE_TASK_STATUS +
      "?" +
      new URLSearchParams({
        id: id,
      }),
    {
      method: "PUT",
    }
  );
}

async function fetchDeleteData(id) {
  await fetch(
    DELETE_TASK +
      "?" +
      new URLSearchParams({
        id: id,
      }),
    {
      method: "DELETE",
    }
  );
}

async function fetchEditData(row) {
  await fetch(UPDATE_TASK, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });
}

async function fetchAddData(data) {
  await fetch(ADD_TASK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data[0]),
  });
}

const Home = () => {
  const [data, setData] = useState([]);
  const [taskStatus, setTaskStatus] = useState(null);
  const reflashFilter = useRef(false);
  const submittingStatus = useRef(false);
  const reflashStatus = useRef(0);
  const completeStatus = useRef(0);
  const editStatus = useRef(0);

  useEffect(() => {
    if (!submittingStatus.current) {
      return;
    }
    fetchAddData(data)
      .then(() => (submittingStatus.current = false))
      .then(() => fetchQueryData(taskStatus, setData));
  }, [data]);

  useEffect(() => {
    if (!editStatus.current) {
      return;
    }
    data.map((row) => {
      if (row.id === editStatus.current) {
        fetchEditData(row)
          .then(() => (editStatus.current = 0))
          .then(() => fetchQueryData(taskStatus, setData));
      }
      return row;
    });
  }, [data]);

  useEffect(() => {
    if (completeStatus.current === 0) {
      return;
    }
    fetchCompleteData(completeStatus.current)
      .then(() => (completeStatus.current = 0))
      .then(() => fetchQueryData(taskStatus, setData));
  }, [data]);

  useEffect(() => {
    if (reflashStatus.current === 0) {
      return;
    }
    fetchDeleteData(reflashStatus.current)
      .then(() => (reflashStatus.current = 0))
      .then(() => fetchQueryData(taskStatus, setData));
  }, [data]);

  useEffect(() => {
    if (reflashFilter.current === false) {
      return;
    }
    fetchQueryData(taskStatus, setData)
    .then(() => (reflashFilter = false));
  }, [taskStatus]);

  useEffect(() => {
    fetchQueryData(taskStatus, setData);
  }, []);

  return (
    <div className="app">
      <Add addData={setData} submittingStatus={submittingStatus} />
      <Filter setTaskStatus={setTaskStatus} reflashFilter={reflashFilter} />
      <List
        listData={data}
        modifyData={setData}
        reflashStatus={reflashStatus}
        completeStatus={completeStatus}
        editStatus={editStatus}
      />
    </div>
  );
};

export default Home;
