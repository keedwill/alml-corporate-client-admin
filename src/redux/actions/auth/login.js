import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const login = createAsyncThunk(
  "auth/login",
  async (
    { emailValue: email, passwordValue: password, navigate, toast },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.login({ email, password });

      toast.success("Login Succesfull");
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default login;
