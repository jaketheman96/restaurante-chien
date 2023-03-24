import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../slicers/loading.slicer";
import paymentReducer from "../slicers/payment.slicer";
import userReducer from "../slicers/user.slicer";

const store = configureStore({
  reducer: { 
    user: userReducer,
    isLoading: loadingReducer,
    payment: paymentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store;