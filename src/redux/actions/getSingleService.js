import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const getSingleService = createAsyncThunk(
  "service/getSingleService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getSingleService(id);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default getSingleService;
