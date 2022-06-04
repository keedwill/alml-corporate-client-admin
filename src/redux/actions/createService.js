import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const createService = createAsyncThunk(
  "service/create",
  async (
    {
      descriptionValue: description,
      serviceValue: name,
      categoryValue: categoryId,
      feeValue: fee,
     
      navigate,
      toast,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.createService({
        description,
        name,
        categoryId,
        fee,
       
      });

      toast.success("Service Created Succesfully");
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default createService;
