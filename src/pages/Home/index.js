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
import "./index.css";

async function fetchQueryData(setData) {
  const resp = await fetch(GET_TODO_LIST);
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
      .then(() => fetchQueryData(setData));
  }, [data]);

  useEffect(() => {
    if (!editStatus.current) {
      return;
    }
    data.map((row) => {
      if (row.id === editStatus.current) {
        fetchEditData(row)
          .then(() => (editStatus.current = 0))
          .then(() => fetchQueryData(setData));
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
      .then(() => fetchQueryData(setData));
  }, [data]);

  useEffect(() => {
    if (reflashStatus.current === 0) {
      return;
    }
    fetchDeleteData(reflashStatus.current)
      .then(() => (reflashStatus.current = 0))
      .then(() => fetchQueryData(setData));
  }, [data]);

  useEffect(() => {
    fetchQueryData(setData);
  }, []);

  return (
    <div className="app">
      <Add addData={setData} submittingStatus={submittingStatus} />
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
