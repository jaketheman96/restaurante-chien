import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../slicers/loading.slicer';
import checkoutReducer from '../slicers/checkout.slicer';
import paymentReducer from '../slicers/payment.slicer';
import userReducer from '../slicers/user.slicer';

const store = configureStore({
  reducer: {
    user: userReducer,
    isLoading: loadingReducer,
    payment: paymentReducer,
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
