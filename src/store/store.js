import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./ProductSlice"
import cartReducer from "./cartSlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
})

