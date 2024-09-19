import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isNavVisible: false,
};

const navSlice = createSlice({
   name: 'nav',
   initialState,
   reducers: {
      toggleNav: (state) => {
         state.isNavVisible = !state.isNavVisible;
      },
      hideNav: (state) => {
         state.isNavVisible = false;
      },
   },
});

export const { toggleNav, hideNav } = navSlice.actions;

export default navSlice.reducer;
