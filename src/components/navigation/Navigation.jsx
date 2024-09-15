import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/features/themeSlice';
import './navigation.scss';
import documentIcon from '../../assets/images/icon-document.svg';
import iconSunLight from '../../assets/images/icon-sun-light.svg';
import iconSunDark from '../../assets/images/icon-sun-dark.svg';
import iconMoonLight from '../../assets/images/icon-moon-light.svg';
import iconMoonDark from '../../assets/images/icon-moon-dark.svg';
import logo from '../../assets/images/logo.svg';

function Navigation({ 
   // isNavVisible, 
   // documents, 
   // createNewDocument, 
   // handleDocumentSelection, 
   // formatDate, 
   // theme, 
   // toggleTheme 
}) {
   const dispatch = useDispatch();
   const theme = useSelector((state) => state.theme.theme);
   const isNavVisible = useSelector((state) => state.nav.isNavVisible);
   
   const handleToggleTheme = () => {
      dispatch(toggleTheme());
   };
   
   
   return (
      <div className={isNavVisible ? 'nav-wrapper' : 'nav-wrapper-hidden'}>
         <div>
            <div className='logo-wrapper-nav'>
               <img src={logo} alt="Logo" />
            </div>
            <h1 className='section-header'>MY DOCUMENTS</h1>
            {/* <button className='primary-btn create-btn' onClick={createNewDocument}>
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
            </div> */}
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
