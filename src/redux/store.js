import { configureStore } from '@reduxjs/toolkit';
import viewReducer from './features/viewSlice';
import textReducer from './features/textSlice';
import navReducer from './features/navSlice';
import themeReducer from './features/themeSlice';

const store = configureStore({
  reducer: {
    view: viewReducer,
    text: textReducer, 
    nav: navReducer,
    theme: themeReducer,
  },
});

export default store;