import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Features/auth/authSlice";
import productReducer from "./Features/productsSlice";
import filterReducer from "./Features/filterSlice";
import cartReducer from "./Features/cartslice";
import checkoutReducer from "./Features/CheckoutSlice";
import orderReducer from "./Features/OrderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;