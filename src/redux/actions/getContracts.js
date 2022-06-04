import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const getContracts = createAsyncThunk(
  "contract/getContracts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getContracts();

      return response.data;
    } catch (error) {
     
      return rejectWithValue(error.response.data);
    }
  }
);

export default getContracts;
