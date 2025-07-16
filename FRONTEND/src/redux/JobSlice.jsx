import { createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText:"",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText:(state, action) => {
      state.searchJobByText = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob, setAllAdminJobs ,setSearchJobByText} = JobSlice.actions;
export default JobSlice.reducer;
