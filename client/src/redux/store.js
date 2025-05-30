import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loadersSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    user: userReducer,
  },
});

export default store;
