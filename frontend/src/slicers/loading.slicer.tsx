import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Iloading from '../interfaces/Iloading';

const initialState: Iloading = {
  isLoading: false,
};

export const loadingReducer = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state: any, action: PayloadAction<boolean>): any => {
      state.isLoading = action.payload
      return;
    },
  },
});

export const { setIsLoading } = loadingReducer.actions

export default loadingReducer.reducer