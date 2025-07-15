import { createSlice } from "@reduxjs/toolkit";
const CompanySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    searchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});
export const { setSingleCompany, setCompanies ,searchCompanyByText} = CompanySlice.actions;
export default CompanySlice.reducer;
