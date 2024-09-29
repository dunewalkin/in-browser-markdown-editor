import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import './document-info.scss';

import { setDocuments, setCurrentDoc, setDocName, setLocalText, setText } from '../../redux/features/docSlice';

import documentIcon from '../../assets/images/icon-document.svg';

function DocumentInfo({ }) {

   const dispatch = useDispatch();

   const [isEditing, setIsEditing] = useState(false);
   const {currentDoc, docName, localText, text } = useSelector((state) => state.documents);
   const { documents } = useSelector((state) => state.documents);

   const handleDocNameChange = (e) => {
      dispatch(setDocName(e.target.value));
   };

   const handleBlur = () => {
      if (docName.trim() === '') {
         dispatch(setDocName(currentDoc)); 
      } else {
         updateDocumentName(docName.trim()); 
      }
      setIsEditing(false); 
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleBlur(); 
      }
   };

   const changeDocName = () => {
      setIsEditing(true);
      setTimeout(() => {
         const extensionIndex = docName.lastIndexOf('.md'); 
         if (extensionIndex !== -1) {
            document.querySelector('.doc-name-input').setSelectionRange(0, extensionIndex); 
         }
      }, 0); 
   };

   const updateDocumentName = () => {
      const updatedDocuments = documents.map((doc) =>
         doc.name === currentDoc ? { ...doc, name: docName } : doc
      );
      
      dispatch(setDocuments(updatedDocuments));
      
      dispatch(setCurrentDoc(docName)); 

      dispatch(setLocalText(localText)); 
   };

   return (
      <div className='doc-info-wrapper header-doc-wrapper' onClick={changeDocName}>
         <img src={documentIcon} alt='Document' />
         <div className='header-doc-info'>
            <p className='header-doc-name body-m'>Document Name</p>
            {isEditing ? (
               <input
                  type="text"
                  className="doc-name-input"
                  value={docName}
                  onChange={handleDocNameChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  autoFocus
               />
            ) : (
               <span className='current-doc-name heading-m'>{currentDoc}</span>
            )}
         </div>
      </div>
   );
}

export default DocumentInfo;