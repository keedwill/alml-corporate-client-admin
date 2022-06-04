import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";


const createContract = createAsyncThunk(
  "contract/create",
  async (
    {
      data,

      navigate,
      toast,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.createContract(
        data,
      );

      
      toast.success("Contract Created Succesfully");
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default createContract;
