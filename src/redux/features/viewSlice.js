import { createSlice } from '@reduxjs/toolkit';

const viewSlice = createSlice({
   name: 'view',
   initialState: {
      isMarkdownVisible: true,
      isPreviewVisible: false,
      isSmallScreen: window.innerWidth <= 800
   },
   reducers: {
      toggleMarkdown: (state) => {
         if (state.isSmallScreen) {
            state.isMarkdownVisible = true;
            state.isPreviewVisible = false;
         } else {
            state.isMarkdownVisible = !state.isMarkdownVisible;
         }
      },
      togglePreview: (state) => {
         if(state.isSmallScreen) {
            state.isMarkdownVisible = false;
            state.isPreviewVisible = true;
         } else {
            state.isPreviewVisible = !state.isPreviewVisible;
         }
      },
      setSmallScreen: (state, action) => {
         state.isSmallScreen = action.payload;
      }
   }
});

export const { toggleMarkdown, togglePreview, setSmallScreen } = viewSlice.actions;
export default viewSlice.reducer;
