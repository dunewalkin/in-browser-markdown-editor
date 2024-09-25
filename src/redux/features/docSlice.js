// import { createSlice } from '@reduxjs/toolkit';
// import data from '../../data.json'; 

// const welcomeDoc = {
//    createdAt: new Date().toISOString().split('T')[0],
//    name: "welcome.md",
//    content: data.find(file => file.name === "welcome.md")?.content || ''
// };

// const initialState = {
//    documents: [welcomeDoc],
//    currentDoc: "welcome.md",
//    docName: "welcome.md"
// };

// const docSlice = createSlice({
//    name: 'documents',
//    initialState,
//    reducers: {
//       setDocuments: (state, action) => {
//          state.documents = action.payload;
//       },
//       setCurrentDoc: (state, action) => {
//          state.currentDoc = action.payload;
//          state.docName = action.payload;
//       },
//       setDocName: (state, action) => {
//          state.docName = action.payload;
//       }
//    }
// });

// export const { setDocuments, setCurrentDoc, setDocName } = docSlice.actions;
// export default docSlice.reducer;

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
   text: welcomeDoc.content // Добавляем text сюда
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
         state.text = doc ? doc.content : '';
      },
      setDocName: (state, action) => {
         state.docName = action.payload;
      },
      setText: (state, action) => {
         state.text = action.payload;
         const docIndex = state.documents.findIndex(file => file.name === state.currentDoc);
         if (docIndex !== -1) {
            state.documents[docIndex].content = action.payload;
         }
      }
   }
});

export const { setDocuments, setCurrentDoc, setDocName, setText } = docSlice.actions;
export default docSlice.reducer;

