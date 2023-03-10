import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface test {
  name: string,
}

const initialState: test = { 
  name: '',
};

export const handleChangeName = createSlice({
  name: 'name',
  initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  },
})

export const { changeName } = handleChangeName.actions;

export default handleChangeName.reducer;