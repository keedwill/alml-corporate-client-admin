import { createSlice } from "@reduxjs/toolkit";
import createContract from "../actions/createContract";

import getContracts from "../actions/getContracts";

const contractSlice = createSlice({
  name: "contract",
  initialState: {
    contract: {},
    contracts: [],
    error: "",
    loading: false,
  },
  reducers: {
    displaySingleContract: (state, action) => {
      state.contract = state.contracts.filter(
        (contract) => contract.id === action.payload
      );
    },
  },
  extraReducers: {
    [getContracts.pending]: (state, action) => {
      state.loading = true;
    },
    [getContracts.fulfilled]: (state, action) => {
      state.loading = false;
      state.contracts = action.payload;
    },
    [getContracts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [createContract.pending]: (state, action) => {
      state.loading = true;
    },
    [createContract.fulfilled]: (state, action) => {
      state.loading = false;
      state.contracts = [action.payload];
    },
    [createContract.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { displaySingleContract } = contractSlice.actions;

export default contractSlice.reducer;
