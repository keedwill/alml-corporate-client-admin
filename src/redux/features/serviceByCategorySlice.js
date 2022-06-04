import { createSlice } from "@reduxjs/toolkit";

import getServicesByCategory from "../actions/getServicesByCategory";

const serviceByCategorySlice = createSlice({
  name: "servicesByCategory",
  initialState: {
    services: [],
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getServicesByCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [getServicesByCategory.fulfilled]: (state, action) => {
      state.loading = false;
    
      state.services = action.payload;
    },
    [getServicesByCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default serviceByCategorySlice.reducer;
