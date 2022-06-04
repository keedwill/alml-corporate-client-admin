import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const getServices = createAsyncThunk(
  "service/getServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getServices();
      

      return response.data;
    } catch (error) {
    
    return rejectWithValue(error.response.data);
  }
  }
);

export default getServices;
