import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slicers/cart.slicer";
import loadingReducer from "../slicers/loading.slicer";
import userReducer from "../slicers/user.slicer";

const store = configureStore({
  reducer: { 
    user: userReducer,
    isLoading: loadingReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store;