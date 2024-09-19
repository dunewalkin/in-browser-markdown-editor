import './confirm-delete.scss';

import { useSelector, useDispatch } from 'react-redux';
import { setDocuments, setCurrentDoc } from '../../redux/features/docSlice';


function ConfirmDelete({ 
   setIsDeleting
 }) {

   const dispatch = useDispatch();
   const { currentDoc, documents } = useSelector((state) => state.documents);


   const confirmDeletion = () => {
      const updatedDocuments = documents.filter(doc => doc.name !== currentDoc);
      
      dispatch(setDocuments(updatedDocuments));

      if (updatedDocuments.length > 0) {
         dispatch(setCurrentDoc(updatedDocuments[0].name));  
      } else {
         dispatch(setCurrentDoc(''));  
      }

      setIsDeleting(false);
   };

   return (
      <>
         <div className='confirm-delete-wrapper'>
            <h1 className='preview-s'>Delete this document?</h1>
            <p className='body'>Are you sure you want to delete '{currentDoc}' document and its contents? This action cannot be reversed.</p>
            <button className='primary-btn' onClick={confirmDeletion}>
               <span className='heading-m'>Confirm & Delete</span>
            </button>
         </div>
         <div className='overlay' onClick={() => setIsDeleting(false)}></div>
      </>
   );
}

export default ConfirmDelete;