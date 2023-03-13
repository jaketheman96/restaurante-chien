import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Ilogged from "../interfaces/Ilogged";

const initialState: Ilogged = { 
  token: '',
  role: '',
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userInfos: (state, action: PayloadAction<Ilogged>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
    }
  },
})

export const { userInfos } = userReducer.actions;

export default userReducer.reducer;