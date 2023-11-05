import { configureStore } from "@reduxjs/toolkit";
import clientsSlice from "./clients-slice";
import formModalsSlice from "./form-modals-slice";
import tasksSlice from "./tasks-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    clients: clientsSlice.reducer,
    formModals: formModalsSlice.reducer,
    tasks: tasksSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
