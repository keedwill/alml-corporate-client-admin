import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const register = createAsyncThunk(
  "auth/register",
  async (
    {
      emailValue: email,
      passwordValue: password,
      password2Value: password2,
      navigate,
      toast,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.register({ email, password, password2 });

      toast.success("Registration Succesfull");
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default register;
