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


function Header({isNavVisible, toggleNavVisible, theme, toggleTheme, saveDocument}) {

   return (
      <> 
         <div className={isNavVisible ? 'nav-wrapper' : 'nav-wrapper-hidden'}>
            <div>
               <h1 className='section-header'>
                  MY DOCUMENTS
               </h1>
               <button className='primary-btn create-btn'>
                  <span className='heading-m'>+ New Document</span>
               </button>
               <div className='doc-info-wrapper'>
                  <img src={documentIcon} alt="" />
                  <div className='header-doc-info'>
                     <p className='body-m'>01 April 2022</p>
                     <span className='heading-m'>welcome.md</span>
                  </div>
               </div>
            </div>
            <div className='toggle-wrapper'>  
               <div className='icon-moon-wrapper'>
                  <img src={theme === 'light' ? iconMoonDark : iconMoonLight} alt={`Icon Moon ${theme === 'light' ? 'Dark' : 'Light'}`} />
               </div>        
               <div 
                  className={`toggle-btn ${theme === 'dark' ? 'toggle-active' : ''}`}
                  onClick={toggleTheme}
                  role="button">

               </div>
               <div className='icon-sun-wrapper'>
                  <img src={theme === 'light' ? iconSunLight : iconSunDark} alt={`Icon Sun ${theme === 'light' ? 'Light' : 'Dark'}`}/>            
               </div>            
            </div>
         </div>
         <header className={`header-wrapper ${isNavVisible ? 'phased-wrapper' : ''}`}>
            <div className='header-main-group'>
               <button 
               onClick={toggleNavVisible}
               className='nav-btn'>
                  <img src={isNavVisible ? menuCloseIcon : menuOpenIcon} alt="" />
               </button>
               <div className='logo-doc-wrapper'>
                  <div className='logo-wrapper'>
                     <img src={logo} alt="Logo" />
                  </div>
                  <div className='doc-info-wrapper header-doc-wrapper'>
                     <img src={documentIcon} alt="" />
                     <div className='header-doc-info'>
                        <p className='body-m'>Document Name</p>
                        <span className='heading-m'>welcome.md</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className='header-btn-wrapper'>
               <button className='delete-btn'>
                  <svg width="18" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" fill=""/></svg>
               </button>
               <div className='primary-btn save-btn' onClick={saveDocument}>
                  <img src={saveIcon} alt="Save Icon" />
                  <span className='heading-m'>Save Changes</span>
               </div>
            </div>
         </header>
      </>
      
   )
}

export default Header