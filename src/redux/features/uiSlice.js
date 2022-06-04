import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showServiceForm: false,
    showCategoryForm: false,
    showSingleContract: false,
    showSingleCompany: false,
    showCompanyForm: false,
    showCart: false,
  },
  reducers: {
    showCart: (state, action) => {
      state.showCart = !state.showCart;
    },
    showServiceForm: (state, action) => {
      state.showServiceForm = !state.showServiceForm;
    },
    showCategoryForm: (state, action) => {
      state.showCategoryForm = !state.showCategoryForm;
    },
    showSingleContract: (state, action) => {
      state.showSingleContract = !state.showSingleContract;
    },
    showSingleCompany: (state, action) => {
      state.showSingleCompany = !state.showSingleCompany;
    },
    showCompanyForm: (state, action) => {
      state.showCompanyForm = !state.showCompanyForm;
    },
  },
});

export const {
  showServiceForm,
  showCategoryForm,
  showSingleContract,
  showCompanyForm,
  showSingleCompany,
  showCart
} = uiSlice.actions;

export default uiSlice.reducer;
