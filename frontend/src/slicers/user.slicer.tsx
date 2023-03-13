import { createSlice } from "@reduxjs/toolkit";
import Ilogged from "../interfaces/Ilogged";

const initialState: Ilogged = { 
  token: '',
  role: '',
};

export const handleChangeName = createSlice({
  name: 'name',
  initialState,
  reducers: {
    // changeName: (state, action: PayloadAction<string>) => {
    //   state.name = action.payload;
    // }
  },
})

// export const { changeName } = handleChangeName.actions;

export default handleChangeName.reducer;