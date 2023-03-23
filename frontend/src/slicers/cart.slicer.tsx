import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Icart from '../interfaces/Icart';
import Iorder from '../interfaces/Iorder';

const initialState: Icart = {
  orderCart: [],
  totalPrice: 0,
};


export const cartReducer = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Iorder[]>) => {
      state.orderCart = action.payload
      // if (state.orderCart.length === 0) {
      //   state.orderCart.push(action.payload);
      //   return;
      // }
      // if (
      //   state.orderCart.some((item: Iorder) => item.id === action.payload.id)
      // ) {
      //   state.orderCart.map((item: Iorder) => {
      //     if (
      //       item.id === action.payload.id &&
      //       item.quantity &&
      //       action.payload.quantity
      //     ) {
      //       item.quantity += action.payload.quantity;
      //     }
      //     return item;
      //   });
      // } else {
      //   state.orderCart.push(action.payload);
      //   return;
      // }
    },
    removeFromCart: (state, action: PayloadAction<Iorder>) => {
      if (
        state.orderCart.some((item: Iorder) => item.id === action.payload.id)
      ) {
        state.orderCart.map((item: Iorder) => {
          if (
            item.id === action.payload.id &&
            item.quantity &&
            action.payload.quantity
          ) {
            if (item.quantity === 1) {
              return state.orderCart.filter(
                (item: Iorder) => item.id !== action.payload.id
              );
            } else {
              item.quantity -= action.payload.quantity;
            }
          }
          return item;
        });
      }
      return;
    },
    handleTotal: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
  },
});

export const { addToCart, handleTotal, removeFromCart } = cartReducer.actions;

export default cartReducer.reducer;
