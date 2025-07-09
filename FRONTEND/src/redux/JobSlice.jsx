import { createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [], 
    singleJob:null,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload; 
    },
    setSingleJob:(state,action)=>{
      state.singleJob=action.payload
    }
  },
});

export const { setAllJobs ,setSingleJob} = JobSlice.actions;
export default JobSlice.reducer;
