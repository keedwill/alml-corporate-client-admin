import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const createCompany = createAsyncThunk(
  "company/create",
  async (
    {
      password2Value: password2,
      passwordValue: password,
      emailValue: email,
      companyValue: name,
      file: image,
      addressValue: address,
      phoneValue: phone,
      navigate,
      toast,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.createCompany({
        name,
        email,
        phone,
        address,
        password,
        password2,
        image,
      });

      toast.success("Company Created Succesfully");
      navigate("/dashboard");
      return response.data;
    } catch (error) {
       
      return rejectWithValue(error.response.data);
    }
  }
);

export default createCompany;
