import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   text: '',
};

const textSlice = createSlice({
   name: 'text',
   initialState,
   reducers: {
      setText(state, action) {
         state.text = action.payload;
      },
   },
});

export const { setText } = textSlice.actions;
export default textSlice.reducer;
