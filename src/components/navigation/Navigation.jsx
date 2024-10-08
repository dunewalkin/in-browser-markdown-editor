import { useSelector, useDispatch } from 'react-redux';

import './navigation.scss';

import { toggleTheme } from '../../redux/features/themeSlice';
import { setDocuments, setCurrentDoc, setText } from '../../redux/features/docSlice';
import { hideNav } from '../../redux/features/navSlice';
import { toggleMarkdown } from '../../redux/features/viewSlice';

import documentIcon from '../../assets/images/icon-document.svg';
import iconSunLight from '../../assets/images/icon-sun-light.svg';
import iconSunDark from '../../assets/images/icon-sun-dark.svg';
import iconMoonLight from '../../assets/images/icon-moon-light.svg';
import iconMoonDark from '../../assets/images/icon-moon-dark.svg';
import logo from '../../assets/images/logo.svg';

function Navigation({ }) {
   const dispatch = useDispatch();
   const { theme } = useSelector((state) => state.theme);
   const { isNavVisible } = useSelector((state) => state.nav);
   const { documents } = useSelector((state) => state.documents);

   const { isMarkdownVisible } = useSelector((state) => state.view);
   
   const handleToggleTheme = () => {
      dispatch(toggleTheme());
   };

   const getUniqueName = (baseName) => {
      let name = baseName;
      let counter = 1;
   
      if (documents.some(doc => doc.name === name)) {
         while (documents.some(doc => doc.name === name)) {
            name = `${baseName.slice(0, -3)}-${counter}.md`;
            counter++;
         }
      }
   
      return name;
   };

   const formatDate = (dateString) => {
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
   };
   
   const createNewDocument = () => {
      const newDocumentName = getUniqueName("untitled-document.md");
      const newDocument = {
         createdAt: new Date().toISOString().split('T')[0],
         name: newDocumentName,
         content: ''
      };
   
      const updatedData = [...documents, newDocument];
      dispatch(setDocuments(updatedData));
   
      // console.log("Updated Documents Array:", updatedData);
   
      dispatch(setText(newDocument.content));
      dispatch(setCurrentDoc(newDocument.name));

      dispatch(hideNav());

      if(!isMarkdownVisible) {
         dispatch(toggleMarkdown());
      }
   };

const handleDocumentSelection = (docName) => {
   dispatch(setCurrentDoc(docName));
   dispatch(hideNav());

   if(!isMarkdownVisible) {
      dispatch(toggleMarkdown());
   }
};



   return (
      <div className={isNavVisible ? 'nav-wrapper' : 'nav-wrapper-hidden'}>
         <div>
            <div className='logo-wrapper-nav'>
               <img src={logo} alt="Logo" />
            </div>
            <h1 className='section-header'>MY DOCUMENTS</h1>
            <button className='primary-btn create-btn' onClick={createNewDocument}>
               <span className='heading-m'>+ New Document</span>
            </button>
            <div className='documents-wrapper'>
               {documents.map((doc) => (
                  <div 
                     key={doc.name} 
                     className='nav-doc-btn doc-info-wrapper'
                     onClick={() => handleDocumentSelection(doc.name)} 
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
            <div className={`toggle-btn ${theme === 'dark' ? 'toggle-active' : ''}`} onClick={handleToggleTheme} role="button"></div>
            <div className='icon-sun-wrapper'>
               <img src={theme === 'light' ? iconSunLight : iconSunDark} alt={`Sun ${theme === 'light' ? 'light' : 'dark'}`}/>            
            </div>
         </div>
      </div>
   );
}

export default Navigation;
