import { createSlice } from '@reduxjs/toolkit';
import data from '../../data.json'; 

const welcomeDoc = {
   createdAt: new Date().toISOString().split('T')[0],
   name: "welcome.md",
   content: data.find(file => file.name === "welcome.md")?.content || ''
};

const initialState = {
   documents: [welcomeDoc],  
   currentDoc: "welcome.md",  
   docName: "welcome.md",   
   localText: welcomeDoc.content, 
   text: '',  
};

const docSlice = createSlice({
   name: 'documents',
   initialState,
   reducers: {
      setDocuments: (state, action) => {
         state.documents = action.payload;
      },
      setCurrentDoc: (state, action) => {
         state.currentDoc = action.payload;
         state.docName = action.payload;
         
         const doc = state.documents.find(file => file.name === action.payload);

         if (doc) {
            state.localText = doc.content;  
         }
      },
      setDocName: (state, action) => {
         state.docName = action.payload;
      },

      setLocalText: (state, action) => {
         state.localText = action.payload;
      },

      setText: (state, action) => {
         state.text = action.payload;
      },
   }
});

export const { setDocuments, setCurrentDoc, setDocName, setText, setLocalText } = docSlice.actions;
export default docSlice.reducer;
