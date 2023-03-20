import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Icart from '../interfaces/Icart';
import Iorder from '../interfaces/Iorder';

const initialState: Icart = {
  cart: [],
  totalPrice: 0,
};

export const cartReducer = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    handleCart: (state, action: PayloadAction<Iorder>) => {
      if (state.cart.length === 0) {
        state.cart.push(action.payload);
      }
      if (!state.cart.some((item) => item.id === action.payload.id)) {
        state.cart.push(action.payload);
      } else {
        state.cart.map((item: Iorder) => {
          if (item.id === action.payload.id && item.quantity) {
            item.quantity += 1;
          }
          return item;
        });
      }
    },
    handleTotal: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
  },
});

export const { handleCart, handleTotal } = cartReducer.actions;

export default cartReducer.reducer;
