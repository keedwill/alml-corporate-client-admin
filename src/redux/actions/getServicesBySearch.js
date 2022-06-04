import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const getServicesBySearch = createAsyncThunk(
  "service/getServicesBySearch",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getServicesBySearch(searchQuery);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default getServicesBySearch;
