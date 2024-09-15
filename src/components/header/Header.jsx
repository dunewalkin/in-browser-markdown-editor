import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './header.scss';
import ConfirmDelete from '../confirm-delete/ConfirmDelete';
import DocumentInfo from '../document-info/DocumentInfo';
import Navigation from '../navigation/Navigation';
import { toggleNav } from '../../redux/features/navSlice';
import menuOpenIcon from '../../assets/images/icon-menu.svg';
import menuCloseIcon from '../../assets/images/icon-close.svg';
import logo from '../../assets/images/logo.svg';
import saveIcon from '../../assets/images/icon-save.svg';


function Header({ 
   // isNavVisible,
   // setIsNavVisible,
   // toggleNavVisible,
   // theme,
   // toggleTheme,
   // saveDocument,
   // currentDoc,
   // createNewDocument,
   // documents,
   // setCurrentDoc,
   // confirmDeletion,
   // isDeleting,
   // setIsDeleting,
   // updateDocumentName,
   // docName,
   // setDocName 
}) {

   const dispatch = useDispatch();
   const isNavVisible = useSelector((state) => state.nav.isNavVisible);

   const toggleNavVisible = () => {
      dispatch(toggleNav());
   }

   // const [isEditing, setIsEditing] = useState(false);

   // useEffect(() => {
      
   //    const handleClickOutside = (e) => {
   //       const navWrapper = document.querySelector('.nav-wrapper');
   //       if (navWrapper && !navWrapper.contains(e.target) && isNavVisible) {
   //          toggleNavVisible(); 
   //       }
   //    };

   //    document.addEventListener('mousedown', handleClickOutside);

   //    return () => {
   //       document.removeEventListener('mousedown', handleClickOutside);
   //    };
   // }, [isNavVisible, toggleNavVisible]);

   // const formatDate = (dateString) => {
   //    const options = { day: '2-digit', month: 'long', year: 'numeric' };
   //    return new Date(dateString).toLocaleDateString('en-GB', options);
   // };

   // useEffect(() => {
   //    setDocName(currentDoc);
   // }, [currentDoc]);

   // const handleDocNameChange = (e) => {
   //    setDocName(e.target.value);
   // };

   // const handleBlur = () => {
   //    if (docName.trim() === '') {
   //       setDocName(currentDoc); 
   //    } else {
   //       updateDocumentName(docName.trim()); 
   //    }
   //    setIsEditing(false); 
   // };

   // const handleKeyDown = (e) => {
   //    if (e.key === 'Enter') {
   //       handleBlur(); 
   //    }
   // };

   // const changeDocName = () => {
   //    setIsEditing(true);
   //    setTimeout(() => {
   //       const extensionIndex = docName.lastIndexOf('.md'); 
   //       if (extensionIndex !== -1) {
   //          document.querySelector('.doc-name-input').setSelectionRange(0, extensionIndex); 
   //       }
   //    }, 0); 
   // };

   // const handleDocumentSelection = (docName) => {
   //    setCurrentDoc(docName);
   //    setIsNavVisible(false);
   // };
   
   // const deleteDocument = () => {
   //    setIsDeleting(true);
   // }

   

   return (
      <> 
         <Navigation 
            // isNavVisible={isNavVisible} 
            // toggleNavVisible={toggleNavVisible} 
            // documents={documents} 
            // createNewDocument={createNewDocument} 
            // handleDocumentSelection={handleDocumentSelection} 
            // formatDate={formatDate} 
            // theme={theme} 
            // toggleTheme={toggleTheme}
         />
         <header className={`header-wrapper ${isNavVisible ? 'phased-wrapper' : ''}`}>
            <div className='header-main-group'>
               <button 
                  onClick={toggleNavVisible}
                  className='nav-btn'>
                     <img src={isNavVisible ? menuCloseIcon : menuOpenIcon} alt={isNavVisible ? 'Close menu' : 'Open menu'} />
               </button>
               {/* <div className='logo-doc-wrapper'>
                  <div className='logo-wrapper-header'>
                     <img src={logo} alt="Logo" />
                  </div>
                  <DocumentInfo 
                     isEditing={isEditing} 
                     docName={docName} 
                     currentDoc={currentDoc} 
                     handleDocNameChange={handleDocNameChange} 
                     handleBlur={handleBlur} 
                     handleKeyDown={handleKeyDown} 
                     changeDocName={changeDocName}
                  />
               </div> */}
            </div>
            {/* <div className='header-btn-wrapper'>
               <button className='delete-btn' 
               aria-label="Delete document"
               onClick={deleteDocument}
               >
                  <svg width="18" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" fill=""/></svg>
               </button>
               <div className='primary-btn save-btn' onClick={saveDocument}>
                  <img src={saveIcon} alt="Save" />
                  <span className='heading-m'>Save Changes</span>
               </div>
            </div> */}
         </header>
         {/* {isDeleting && (
            <ConfirmDelete 
               currentDoc={currentDoc} 
               confirmDeletion={confirmDeletion} 
               setIsDeleting={setIsDeleting} 
            />
         )} */}
      </>
   );
}

export default Header;






















