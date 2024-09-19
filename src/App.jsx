import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './assets/styles/fonts.scss';
import './assets/styles/typography.scss';
import './assets/styles/global.scss';
import './assets/styles/buttons.scss';

import { setSmallScreen } from './redux/features/viewSlice';

import Header from './components/header/Header';
import Editor from './components/editor/Editor';
import Preview from './components/preview/Preview';

function App() {
   const dispatch = useDispatch();
   const { theme } = useSelector((state) => state.theme);
   const { isMarkdownVisible, isPreviewVisible, isSmallScreen } = useSelector((state) => state.view);
   const { isNavVisible } = useSelector((state) => state.nav);

   useEffect(() => {
      const handleResize = () => {
         dispatch(setSmallScreen(window.innerWidth <= 800));
      };

      handleResize(); 
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
   }, [dispatch]);


   useEffect(() => {
      document.body.className = theme;
      localStorage.setItem('theme', theme);
   }, [theme]);

   return (
      <>
         <Header/>
         <div className={`markdown-wrapper ${isNavVisible ? 'phased-wrapper' : ''}`}>
            {isMarkdownVisible && <Editor />}
            {(isPreviewVisible || !isSmallScreen) && ( <Preview />)}
         </div>
      </>
      
  );
}

export default App;
