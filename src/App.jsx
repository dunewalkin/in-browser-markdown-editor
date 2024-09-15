// import { useDispatch, useSelector } from 'react-redux';
// import { toggleMarkdown, togglePreview, setSmallScreen } from './redux/features/viewSlice';
// import { useEffect } from 'react';
// import Editor from './components/editor/Editor';
// import Preview from './components/preview/Preview';
// import './assets/styles/fonts.scss';
// import './assets/styles/typography.scss';
// import './assets/styles/global.scss';
// import './assets/styles/buttons.scss';

// function App() {
//   const dispatch = useDispatch();
//   const { isMarkdownVisible, isPreviewVisible, isSmallScreen } = useSelector((state) => state.view);

//   useEffect(() => {
//    const handleResize = () => {
//      dispatch(setSmallScreen(window.innerWidth <= 800));
//    };

//    handleResize(); 
//    window.addEventListener('resize', handleResize);

//    return () => window.removeEventListener('resize', handleResize);
//  }, [dispatch]);

//   return (
//     <div className='markdown-wrapper'>
//       {isMarkdownVisible && <Editor/>}
//       {(isPreviewVisible || !isSmallScreen) && ( <Preview/> )}
//     </div>
//   );
// }

// export default App;

import { useDispatch, useSelector } from 'react-redux';
import { toggleMarkdown, togglePreview, setSmallScreen } from './redux/features/viewSlice';
import { useEffect } from 'react';
import Editor from './components/editor/Editor';
import Preview from './components/preview/Preview';
import './assets/styles/fonts.scss';
import './assets/styles/typography.scss';
import './assets/styles/global.scss';
import './assets/styles/buttons.scss';

function App() {
  const dispatch = useDispatch();
  const { isMarkdownVisible, isPreviewVisible, isSmallScreen } = useSelector((state) => state.view);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setSmallScreen(window.innerWidth <= 800));
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <div className='markdown-wrapper'>
      {isMarkdownVisible && <Editor />}
      {(isPreviewVisible || !isSmallScreen) && ( <Preview />)}
    </div>
  );
}

export default App;
