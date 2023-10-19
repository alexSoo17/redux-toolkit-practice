import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../feature/count/countSlice";
const store = configureStore({
  reducer: { counter: counterReducer },
});

export default store;
