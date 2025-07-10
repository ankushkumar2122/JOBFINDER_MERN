import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice";
import JobSlice from "./JobSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  job: JobSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
