import { useState, useEffect } from 'react';
import './header.scss';
import menuOpenIcon from '../../assets/images/icon-menu.svg';
import menuCloseIcon from '../../assets/images/icon-close.svg';
import logo from '../../assets/images/logo.svg';
import documentIcon from '../../assets/images/icon-document.svg';
import saveIcon from '../../assets/images/icon-save.svg';
import iconSunLight from '../../assets/images/icon-sun-light.svg';
import iconSunDark from '../../assets/images/icon-sun-dark.svg';
import iconMoonLight from '../../assets/images/icon-moon-light.svg';
import iconMoonDark from '../../assets/images/icon-moon-dark.svg';

function Header({ isNavVisible, toggleNavVisible, theme, toggleTheme, saveDocument, currentDoc, createNewDocument, currentDocDate, documents, setCurrentDoc, confirmDeletion, isDeleting, setIsDeleting, updateDocumentName, docName, setDocName }) {

   const [isEditing, setIsEditing] = useState(false);

   const formatDate = (dateString) => {
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
   };

   useEffect(() => {
      setDocName(currentDoc);
   }, [currentDoc]);

   const handleDocNameChange = (e) => {
      setDocName(e.target.value);
   };

   const handleBlur = () => {
      if (docName.trim() === '') {
      setDocName(currentDoc); 
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
   

   const deleteDocument = () => {
      setIsDeleting(true);
   }

   return (
      <> 
         <div className={isNavVisible ? 'nav-wrapper' : 'nav-wrapper-hidden'}>
            <div>
               <div className='logo-wrapper-nav'>
                  <img src={logo} alt="Logo" />
               </div>
               <h1 className='section-header'>
                  MY DOCUMENTS
               </h1>
               <button className='primary-btn create-btn' onClick={createNewDocument}>
                  <span className='heading-m'>+ New Document</span>
               </button>
               <div className='documents-wrapper'>
                  {documents.map((doc) => (
                     <div 
                        key={doc.name} 
                        className='nav-doc-btn doc-info-wrapper'
                        onClick={() => setCurrentDoc(doc.name)} 
                     >
                        <img src={documentIcon} alt='Document' />
                        <div className='header-doc-info'>
                           <p className='current-doc-date body-m'>{formatDate(doc.createdAt)}</p>
                           <span className='doc-name heading-m'>{doc.name}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className='toggle-wrapper'>  
               <div className='icon-moon-wrapper'>
                  <img src={theme === 'light' ? iconMoonDark : iconMoonLight} alt={`Moon ${theme === 'light' ? 'dark' : 'light'}`} />
               </div>        
               <div 
                  className={`toggle-btn ${theme === 'dark' ? 'toggle-active' : ''}`}
                  onClick={toggleTheme}
                  role="button">
               </div>
               <div className='icon-sun-wrapper'>
                  <img src={theme === 'light' ? iconSunLight : iconSunDark} alt={`Sun ${theme === 'light' ? 'light' : 'dark'}`}/>            
               </div>            
            </div>
         </div>
         <header className={`header-wrapper ${isNavVisible ? 'phased-wrapper' : ''}`}>
            <div className='header-main-group'>
               <button 
                  onClick={toggleNavVisible}
                  className='nav-btn'>
                     <img src={isNavVisible ? menuCloseIcon : menuOpenIcon} alt={isNavVisible ? 'Close menu' : 'Open menu'} />
               </button>
               <div className='logo-doc-wrapper'>
                  <div className='logo-wrapper-header'>
                     <img src={logo} alt="Logo" />
                  </div>
                  <div 
                     className='doc-info-wrapper header-doc-wrapper'
                     onClick={changeDocName} 
                  >
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
                              <span
                                 className='current-doc-name heading-m'
                                 >
                                    {currentDoc}
                              </span>
                           )} 
                     </div>
                  </div>
               </div>
            </div>
            <div className='header-btn-wrapper'>
               <button className='delete-btn' 
               onClick={deleteDocument}
               >
                  <svg width="18" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" fill=""/></svg>
               </button>
               <div className='primary-btn save-btn' onClick={saveDocument}>
                  <img src={saveIcon} alt="Save" />
                  <span className='heading-m'>Save Changes</span>
               </div>
            </div>
         </header>
         {isDeleting && (
            <div className='confirm-delete-wrapper'>
               <h1 className='preview-s'>
                  Delete this document?
               </h1>
               <p className='body'>
                  Are you sure you want to delete '{currentDoc}' document and its contents? This action cannot be reversed.
               </p>
               <button className='primary-btn' 
               onClick={confirmDeletion}
               >
                  <span className='heading-m'>Confirm & Delete</span>
               </button>
            </div>
         )}
         {isDeleting && (
            <div className='overlay' onClick={() => setIsDeleting(false)}></div>
         )}
      </>
   );
}

export default Header;

