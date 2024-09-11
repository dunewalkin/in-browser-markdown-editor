import './confirm-delete.scss';

function ConfirmDelete({ currentDoc, confirmDeletion, setIsDeleting }) {
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