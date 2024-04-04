// store.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers/index";

const store = configureStore({
  reducer: rootReducer,
  // Add any additional configuration options here if needed
});

export default store;
