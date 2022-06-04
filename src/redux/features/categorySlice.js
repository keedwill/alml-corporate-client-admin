import { createSlice } from "@reduxjs/toolkit";
import createCategory from "../actions/createCategory";
import getCategorys from "../actions/getCategorys";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: {},
    categorys: [],
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [createCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.categorys = [action.payload];
    },
    [createCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCategorys.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategorys.fulfilled]: (state, action) => {
      state.loading = false;
      state.categorys = action.payload;
    },
    [getCategorys.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default categorySlice.reducer;
