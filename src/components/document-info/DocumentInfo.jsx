import './document-info.scss';
import documentIcon from '../../assets/images/icon-document.svg';

function DocumentInfo({ 
   isEditing, 
   docName, 
   currentDoc, 
   handleDocNameChange, 
   handleBlur, 
   handleKeyDown, 
   changeDocName 
}) {

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