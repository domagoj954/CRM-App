import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    setData(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const fetchData =
  (viewAll = false) =>
  async (dispatch) => {
    try {
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("http://localhost:3001/tasks");
      const data = await response.json();
      if (!viewAll) {
        const userTasks = data.filter((item) => item.user_id === loggedUser.id);
        dispatch(tasksActions.setData(userTasks));
      } else {
        dispatch(tasksActions.setData(data));
      }
    } catch (error) {
      console.error("Fetch data error:", error);
    }
  };

export const tasksActions = tasksSlice.actions;
export default tasksSlice;
