import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const getServicesByCategory = createAsyncThunk(
  "service/getServicesByCategory",
  async (id, { rejectWithValue }) => {
     
    try {
      const response = await api.getServicesByCategory(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default getServicesByCategory;
