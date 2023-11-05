import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isUserLogged: false,
    user: null,
    appUsers: [],
  },
  reducers: {
    setIsUserLoggedIn(state, action) {
      state.isUserLogged = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
