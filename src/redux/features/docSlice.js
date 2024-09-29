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
      saveDocuments: (state) => {
         const updatedDocuments = state.documents.map(doc => {
            if (doc.name === state.currentDoc) {
               return { ...doc, content: state.localText };  // Сохраняем текущий текст в content документа
            }
            return doc;
         });
         state.documents = updatedDocuments;
      }
   }
});

export const { setDocuments, setCurrentDoc, setDocName, setText, setLocalText, saveDocuments } = docSlice.actions;
export default docSlice.reducer;
