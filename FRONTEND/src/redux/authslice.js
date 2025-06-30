import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    User: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    SetUser: (state, action) => {
      state.User = action.payload;
    },
  },
});
export const { setLoading, SetUser } = authSlice.actions;
export default authSlice.reducer;
