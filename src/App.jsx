import { useDispatch, useSelector } from 'react-redux';
import { toggleMarkdown, togglePreview, setSmallScreen } from './redux/features/viewSlice';
import { useEffect } from 'react';
import Header from './components/header/Header';
import Editor from './components/editor/Editor';
import Preview from './components/preview/Preview';
import './assets/styles/fonts.scss';
import './assets/styles/typography.scss';
import './assets/styles/global.scss';
import './assets/styles/buttons.scss';

function App() {
   const dispatch = useDispatch();
   const { isMarkdownVisible, isPreviewVisible, isSmallScreen } = useSelector((state) => state.view);
   const isNavVisible = useSelector((state) => state.nav.isNavVisible);


   useEffect(() => {
      const handleResize = () => {
         dispatch(setSmallScreen(window.innerWidth <= 800));
      };

      handleResize(); 
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
   }, [dispatch]);

   return (
      <>
         <Header
            // theme={theme}
            // toggleTheme={toggleTheme}
            // isNavVisible={isNavVisible}
            // setIsNavVisible={setIsNavVisible}
            // toggleNavVisible={toggleNavVisible}
            // saveDocument={saveDocument}
            // createNewDocument={createNewDocument}
            // currentDoc={currentDoc}
            // currentDocDate={currentDocument ? currentDocument.createdAt : ''}
            // documents={documents}
            // setCurrentDoc={setCurrentDoc}
            // handleDocumentClick={handleDocumentClick}
            // confirmDeletion={confirmDeletion}
            // isDeleting={isDeleting}
            // setIsDeleting={setIsDeleting}
            // updateDocumentName={updateDocumentName}
            // docName={docName}
            // setDocName={setDocName}
            // isSmallScreen={isSmallScreen}
         />
         <div className={`markdown-wrapper ${isNavVisible ? 'phased-wrapper' : ''}`}>
            {isMarkdownVisible && <Editor />}
            {(isPreviewVisible || !isSmallScreen) && ( <Preview />)}
         </div>
      </>
      
  );
}

export default App;
