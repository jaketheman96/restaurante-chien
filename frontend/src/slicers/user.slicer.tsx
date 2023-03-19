import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Ilogged from "../interfaces/Ilogged";

const initialState: Ilogged = { 
  name: '',
  email: '',
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
      state.name = action.payload.name;
      state.email = action.payload.email;
    }
  },
})

export const { userInfos } = userReducer.actions;

export default userReducer.reducer;