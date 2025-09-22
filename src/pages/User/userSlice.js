import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    logoutUser: () => null,
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
