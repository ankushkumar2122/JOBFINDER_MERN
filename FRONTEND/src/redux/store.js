import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice";
import JobSlice from "./JobSlice";
import companySlice from "./CompanySlice";

const rootReducer = combineReducers({
  auth: authSlice,
  job: JobSlice,
  company: companySlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
