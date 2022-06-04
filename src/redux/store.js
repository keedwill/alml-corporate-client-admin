import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import uiReducer from "./features/uiSlice";
import serviceReducer from "./features/serviceSlice";
import categoryReducer from "./features/categorySlice";
import companyReducer from "./features/companySlice";
import contractReducer from "./features/contractSlice";
import servicesByCategoryReducer from "./features/serviceByCategorySlice";
import cartSlice from "./features/cartSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    service: serviceReducer,
    category: categoryReducer,
    company: companyReducer,
    contract: contractReducer,
    servicesByCategory: servicesByCategoryReducer,
    cart: cartSlice
  },
});
