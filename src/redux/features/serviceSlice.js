import { createSlice } from "@reduxjs/toolkit";
import createService from '../actions/createService'
import getServices from "../actions/getServices";
import getServicesBySearch from "../actions/getServicesBySearch";
import getSingleService from "../actions/getSingleService";
import updateService from "../actions/updateService";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    service: {},
    services: [],
    error: "",
    loading: false,
  },
  reducers: {
    displaySingleService: (state, action) => {
      state.service = state.services.filter(
        (service) => service.id === action.payload
      );
    },
  },
  extraReducers: {
    [createService.pending]: (state, action) => {
      state.loading = true;
    },
    [createService.fulfilled]: (state, action) => {
      state.loading = false;
      state.services = [action.payload];
    },
    [createService.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateService.pending]: (state, action) => {
      state.loading = true;
    },
    [updateService.fulfilled]: (state, action) => {
      state.loading = false;
      state.services = [action.payload];
    },
    [updateService.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSingleService.pending]: (state, action) => {
      state.loading = true;
    },
    [getSingleService.fulfilled]: (state, action) => {
      state.loading = false;

      state.service = [action.payload];
    },
    [getSingleService.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getServices.pending]: (state, action) => {
      state.loading = true;
    },
    [getServices.fulfilled]: (state, action) => {
      state.loading = false;
      state.services = action.payload;
    },
    [getServices.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getServicesBySearch.pending]: (state, action) => {
      state.loading = true;
    },
    [getServicesBySearch.fulfilled]: (state, action) => {
      state.loading = false;
      state.services = action.payload;
    },
    [getServicesBySearch.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export const { displaySingleService } = serviceSlice.actions;

export default serviceSlice.reducer