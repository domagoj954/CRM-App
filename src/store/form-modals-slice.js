import { createSlice } from "@reduxjs/toolkit";

const formModalsSlice = createSlice({
  name: "formModals",
  initialState: {
    isTaskFormOpened: false,
    taskData: {},
    isReminderFormOpened: false,
    isMeetingFormOpened: false,
  },
  reducers: {
    setIsTaskFormOpened(state, action) {
      state.isTaskFormOpened = action.payload;
    },
    setSelectedTaskData(state, action) {
      state.taskData = action.payload;
    },
    setIsReminderFormOpened(state, action) {
      state.isReminderFormOpened = action.payload;
    },
    setIsMeetingFormOpened(state, action) {
      state.isMeetingFormOpened = action.payload;
    },
  },
});

export const formModalsActions = formModalsSlice.actions;
export default formModalsSlice;
