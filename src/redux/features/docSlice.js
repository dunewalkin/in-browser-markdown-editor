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
//    docName: "welcome.md",
//    localText: welcomeDoc.content, 
//    text: '',
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
//          const doc = state.documents.find(file => file.name === action.payload);
//          state.text = doc ? doc.content : '';
//       },
//       setDocName: (state, action) => {
//          state.docName = action.payload;
//       },
//       setLocalText: (state, action) => {
//          state.localText = action.payload;
//          const docIndex = state.documents.findIndex(file => file.name === state.currentDoc);
//          if (docIndex !== -1) {
//             state.documents[docIndex].content = action.payload;  
//          }
//       },
//       setText: (state, action) => {
//          state.text = action.payload;
//       }
//    }
// });

// export const { setDocuments, setCurrentDoc, setDocName, setText, setLocalText } = docSlice.actions;
// export default docSlice.reducer;





import { createSlice } from '@reduxjs/toolkit';
import data from '../../data.json'; 

const welcomeDoc = {
   createdAt: new Date().toISOString().split('T')[0],
   name: "welcome.md",
   content: data.find(file => file.name === "welcome.md")?.content || ''
};

const initialState = {
   documents: [welcomeDoc],  // Все документы
   currentDoc: "welcome.md",  // Текущий выбранный документ
   docName: "welcome.md",     // Имя текущего документа
   localText: welcomeDoc.content, // Несохранённый текст
   text: '',  // Содержимое для редактора
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
         
         // Находим выбранный документ
         const doc = state.documents.find(file => file.name === action.payload);

         // Устанавливаем текст только из сохранённого контента
         if (doc) {
            state.localText = doc.content;  // Загружаем сохранённый контент
         }
      },
      setDocName: (state, action) => {
         state.docName = action.payload;
      },

      setLocalText: (state, action) => {
         // Обновляем только локальный текст (несохранённые изменения)
         state.localText = action.payload;
      },

      // setLocalText: (state, action) => {
      //    state.localText = action.payload;
      //    const docIndex = state.documents.findIndex(file => file.name === state.currentDoc);
      //    if (docIndex !== -1) {
      //       state.documents[docIndex].content = action.payload;  
      //    }
      // },

      setText: (state, action) => {
         // Устанавливаем текст в редакторе
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

export const { setDocuments, setCurrentDoc, setDocName, setText, setLocalText, saveDocuments, setEditorText } = docSlice.actions;
export default docSlice.reducer;
