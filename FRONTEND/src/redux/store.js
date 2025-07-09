import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice";
import JobSlice from "./JobSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    job: JobSlice,
  },
});

export default store;
