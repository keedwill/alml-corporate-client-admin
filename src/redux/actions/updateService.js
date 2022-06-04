import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const updateService = createAsyncThunk(
  "service/update",
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
      const response = await api.updateService({
        description,
        name,
        categoryId,
        fee,
      });

      toast.success("Service Updated Succesfully");
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default updateService;
