import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Icart from '../interfaces/Icart';

const initialState: Icart = {
  cart: [],
  totalPrice: 0,
};

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    handleCart: (state, action: PayloadAction<Icart>) => {
      state.cart = action.payload.cart
      state.totalPrice = action.payload.totalPrice
    },
  },
});

export const { handleCart } = cartReducer.actions;

export default cartReducer.reducer;
