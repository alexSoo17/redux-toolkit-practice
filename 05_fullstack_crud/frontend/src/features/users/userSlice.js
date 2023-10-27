import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const USERS_URL = "http://localhost:8000/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get(USERS_URL);
  return res.data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const allUsers = (state) => state.users;
export const getUserById = (state, userId) => {
  return state.users.find((user) => user.id === userId);
};
export default userSlice.reducer;
