export const API_HOST = "http://localhost:8080";
export const GET_TODO_LIST = "/todo/index";
export const ADD_TASK = "/todo/add";
export const UPDATE_TASK = "/todo/update";
export const UPDATE_TASK_STATUS = "/todo/status/update";
export const DELETE_TASK = "/todo/delete";

export const PRIORITY_BTN_MAP = {
    Urgent: () => 3,
    High: () => 2,
    Medium: () => 1,
    Low: () => 0,
  };