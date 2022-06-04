import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const getCompanys = createAsyncThunk(
  "company/getCompanys",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getCompanys();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default getCompanys;
