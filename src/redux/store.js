import { configureStore } from '@reduxjs/toolkit';
import viewReducer from './features/viewSlice';

const store = configureStore({
  reducer: {
    view: viewReducer
  }
});

export default store;