import { createSlice } from "@reduxjs/toolkit";
import createCompany from "../actions/createCompany";

import getCompanys from "../actions/getCompanys";

const companySlice = createSlice({
  name: "service",
  initialState: {
    company: {},
    companys: [],
    error: "",
    loading: false,
  },
  reducers: {
    displaySingleCompany: (state, action) => {
      state.company = state.companys.filter(
        (company) => company.id === action.payload
      );
    },
  },
  extraReducers: {
    [getCompanys.pending]: (state, action) => {
      state.loading = true;
    },
    [getCompanys.fulfilled]: (state, action) => {
      state.loading = false;
      state.companys = action.payload;
    },
    [getCompanys.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createCompany.pending]: (state, action) => {
      state.loading = true;
    },
    [createCompany.fulfilled]: (state, action) => {
      state.loading = false;
      state.companys = [action.payload];
    },
    [createCompany.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});



export const { displaySingleCompany } = companySlice.actions;
export default companySlice.reducer;
