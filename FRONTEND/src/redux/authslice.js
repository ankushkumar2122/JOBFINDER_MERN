import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    
     
  },
});
export const { setLoading, SetUser} = authSlice.actions;
export default authSlice.reducer;