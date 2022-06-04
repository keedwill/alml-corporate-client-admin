import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const getCategorys = createAsyncThunk(
  "category/getCategorys",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getCategorys();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default getCategorys;
