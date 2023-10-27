import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";
import userReduer from "../features/users/userSlice";
const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReduer,
  },
});

export default store;
