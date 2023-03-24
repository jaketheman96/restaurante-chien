import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Ipayment from '../interfaces/Ipayment';

const initialState: Ipayment = {
  paymentMethod: '',
};

export const paymentReducer = createSlice({
  name: 'payment-method',
  initialState,
  reducers: {
    selectPaymentMethod: (state, action: PayloadAction<Ipayment>) => {
      state.paymentMethod = action.payload.paymentMethod
    },
  }
})

export const { selectPaymentMethod } = paymentReducer.actions;

export default paymentReducer.reducer
