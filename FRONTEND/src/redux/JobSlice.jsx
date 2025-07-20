import { createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText:"",
    allAppliedJobs:[],
    searchTitle:"",
    // searchLocation:"",
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
    setAllAppliedJobs:(state,action)=>{
      state.allAppliedJobs=action.payload
    },
    setSerchTitle:(state,action)=>{
      state.searchTitle=action.payload;
    },
    //  setSerchLocation:(state,action)=>{
    //   state.searchLocation=action.payload;
    // }
  },
});

export const { setAllJobs, setSingleJob, setAllAdminJobs ,setSearchJobByText,setAllAppliedJobs,setSerchTitle} = JobSlice.actions;
export default JobSlice.reducer;
