import { useState, useEffect } from 'react';
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

   const [localText, setLocalText] = useState('');

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
            {isMarkdownVisible && <Editor localText={localText} setLocalText={setLocalText}/>}
            {(isPreviewVisible || !isSmallScreen) && ( <Preview localText={localText} />)}
         </div>
      </>
      
  );
}

export default App;










// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import './assets/styles/fonts.scss';
// import './assets/styles/typography.scss';
// import './assets/styles/global.scss';
// import './assets/styles/buttons.scss';

// import { setSmallScreen } from './redux/features/viewSlice';

// import Editor from './components/editor/Editor';
// import Preview from './components/preview/Preview';

// function App() {
//    const dispatch = useDispatch();
//    const { isSmallScreen } = useSelector((state) => state.view);
//    const { isNavVisible } = useSelector((state) => state.nav);

//    useEffect(() => {
//       const handleResize = () => {
//          dispatch(setSmallScreen(window.innerWidth <= 800));
//       };

//       handleResize(); 
//       window.addEventListener('resize', handleResize);

//       return () => window.removeEventListener('resize', handleResize);
//    }, [dispatch]);

//    const [isMarkdownVisible, setIsMarkdownVisible] = useState(true);
//    const [isPreviewVisible, setisPreviewVisible] = useState(false);


//    const toggleMarkdown = () => {
//       if (isSmallScreen) {
//          setIsMarkdownVisible(true);
//          setisPreviewVisible(false);
//       } else {
//          setIsMarkdownVisible((prevState) => !prevState);
//       }
//    };

//    const togglePreview = () => {
//       if (isSmallScreen) {
//          setIsMarkdownVisible(false);
//          setisPreviewVisible(true);
//       } else {
//          setIsMarkdownVisible((prevState) => !prevState);
//       }
//    };

//    const [localText, setLocalText] = useState('');

//    const handleChange = (e) => {
//       setLocalText(e.target.value);
//    };

//    const renderMarkdown = (localText) => {
//       const lines = localText.split('\n');
//       const elements = [];
//       let listItems = [];

//       const flushList = (key) => {
//          if (listItems.length > 0) {
//          elements.push(<ul key={key}>{listItems}</ul>);
//          listItems = [];
//          }
//       };

//       lines.forEach((line, index) => {
//          const trimmedLine = line.trim();

//          if (trimmedLine === '') {
//          flushList(`list-${index}`);
//          elements.push(<p key={`empty-${index}`}>&nbsp;</p>);
//          } else if (line.startsWith('######')) {
//          const content = line.slice(6).trim();
//          flushList(`list-${index}`);
//          elements.push(<h6 key={index} className="heading-xxs">{content}</h6>);
//          } else if (line.startsWith('#####')) {
//          const content = line.slice(5).trim();
//          flushList(`list-${index}`);
//          elements.push(<h5 key={index} className="heading-xs">{content}</h5>);
//          } else if (line.startsWith('####')) {
//          const content = line.slice(4).trim();
//          flushList(`list-${index}`);
//          elements.push(<h4 key={index} className="heading-s">{content}</h4>);
//          } else if (line.startsWith('###')) {
//          const content = line.slice(3).trim();
//          flushList(`list-${index}`);
//          elements.push(<h3 key={index} className="heading-m">{content}</h3>);
//          } else if (line.startsWith('##')) {
//          const content = line.slice(2).trim();
//          flushList(`list-${index}`);
//          elements.push(<h2 key={index} className="heading-l">{content}</h2>);
//          } else if (line.startsWith('#')) {
//          const content = line.slice(1).trim();
//          flushList(`list-${index}`);
//          elements.push(<h1 key={index} className="heading-xl">{content}</h1>);
//          } else if (line.startsWith('-')) {
//          const content = line.slice(1).trim();
//          listItems.push(<li key={index} className="body">{content}</li>);
//          } else {
//          flushList(`list-${index}`);
//          elements.push(<p key={index} className="body">{line}</p>);
//          }
//       });

//       flushList('last-list'); 

//       return elements;
//    };

//    return (
//       <>
//          <div className={`markdown-wrapper ${isNavVisible ? 'phased-wrapper' : ''}`}>
//             {isMarkdownVisible && 
//             <Editor 
//             localText={localText}
//             handleChange={handleChange}
//             isMarkdownVisible={isMarkdownVisible}
//             togglePreview={togglePreview} />}
//             {(isPreviewVisible || !isSmallScreen) && ( 
//             <Preview 
//             localText={localText}
//             renderMarkdown={renderMarkdown} 
//             isMarkdownVisible={isMarkdownVisible}
//             toggleMarkdown={toggleMarkdown}/>)}
//          </div>
//       </>
      
//   );
// }

// export default App;
