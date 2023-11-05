import { createSlice } from "@reduxjs/toolkit";

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
  },
  reducers: {
    setClients(state, action) {
      state.clients = action.payload;
    },
  },
});

export const clientsActions = clientsSlice.actions;
export default clientsSlice;
