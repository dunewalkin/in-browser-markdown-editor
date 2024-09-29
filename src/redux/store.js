import { configureStore } from '@reduxjs/toolkit';
import viewReducer from './features/viewSlice';
import navReducer from './features/navSlice';
import themeReducer from './features/themeSlice';
import docReducer from './features/docSlice';

const store = configureStore({
   reducer: {
      view: viewReducer,
      nav: navReducer,
      theme: themeReducer,
      documents: docReducer,
   },
});

export default store;