import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const createCategory = createAsyncThunk(
  "category/create",
  async (
    {
      categoryValue: name,
      file: image,

      navigate,
      toast,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.createCategory({
        image,
        name,
      });

      toast.success("Category Created Succesfully");
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default createCategory;
