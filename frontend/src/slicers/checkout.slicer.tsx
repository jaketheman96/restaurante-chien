import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Icheckout from '../interfaces/Icheckout';

const initialState: Icheckout = {
  userId: 0,
  deliveryAddress: '',
  foods: [],
  status: 'Pendente',
  totalPrice: 0,
  orderNotes: '',
};

const checkoutReducer = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    handleCheckoutInfos: (state, action: PayloadAction<Icheckout>) => {
      state.userId = action.payload.userId;
      state.deliveryAddress = '';
      state.foods = action.payload.foods;
      state.status = action.payload.status;
      state.totalPrice = action.payload.totalPrice;
      state.orderNotes = action.payload.orderNotes;
    },
    handleAddress: (state, action: PayloadAction<string>) => {
      state.deliveryAddress = action.payload;
    },
  },
});

export const { handleCheckoutInfos, handleAddress } = checkoutReducer.actions;

export default checkoutReducer.reducer;
