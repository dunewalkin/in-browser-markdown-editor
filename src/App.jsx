import { useState, useEffect } from 'react';
import './assets/styles/fonts.scss';
import './assets/styles/typography.scss'
import './assets/styles/global.scss';
import './assets/styles/buttons.scss';
import Header from './components/header/Header';
import Editor from './components/editor/Editor';
import Preview from './components/preview/Preview';
import data from './data.json';

function App() {

   const [documents, setDocuments] = useState(() => {
      const welcomeDoc = {
         createdAt: new Date().toISOString().split('T')[0],
         name: "welcome.md",
         content: data.find(file => file.name === "welcome.md")?.content || ''
      };
      return [welcomeDoc];
   });

   const [currentDoc, setCurrentDoc] = useState("welcome.md");
   const currentDocument = documents.find(doc => doc.name === currentDoc);
   
   const [isDeleting, setIsDeleting] = useState(false);

   const [text, setText] = useState(() => {
      return currentDocument ? currentDocument.content : '';
   });
   const [isMarkdownVisible, setIsMarkdownVisible] = useState(true);
   const [isPreviewVisible, setisPreviewVisible] = useState(false);
   const [isSmallScreen, setIsSmallScreen] = useState(false);

   const [isNavVisible, setIsNavVisible] = useState(false);
   const [theme, setTheme] = useState(() => {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme : 'light';
   });

   const [docName, setDocName] = useState(currentDoc);

   useEffect(() => {
      console.log("Documents array:", documents);
   }, [documents]);

   const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
   };

   useEffect(() => {
      document.body.className = theme;
      localStorage.setItem('theme', theme);
   }, [theme]);


   const toggleNavVisible = () => {
      setIsNavVisible((navVisible) => !navVisible);
   }

   const handleChange = (e) => {
      setText(e.target.value);
   };

   const handleKeyDown = (e) => {
      if (e.key === "Tab") {
         e.preventDefault();

         const textarea = e.target;
         const start = textarea.selectionStart;
         const end = textarea.selectionEnd;

         const tabSize = 2;
         const tab = " ".repeat(tabSize);

         setText(text.substring(0, start) + tab + text.substring(end));

         setTimeout(() => {
         textarea.selectionStart = textarea.selectionEnd = start + tabSize;
         }, 0);
      }
   };

   useEffect(() => {
      const handleResize = () => {
         setIsSmallScreen(window.innerWidth <= 800);
      };

      handleResize(); 
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
   }, []);

   const toggleMarkdown = () => {

      if (isSmallScreen) {
         setIsMarkdownVisible(true);
         setisPreviewVisible(false);
      } else {
         setIsMarkdownVisible((prevState) => !prevState);
      }
   };

   const togglePreview = () => {

      if (isSmallScreen) {
         setIsMarkdownVisible(false);
         setisPreviewVisible(true);
      } else {
         setIsMarkdownVisible((prevState) => !prevState);
      }
   };

   const saveDocument = () => {
      setDocuments(docs => docs.map(doc => {
         if (doc.name === currentDoc) {
            return { ...doc, content: text };
         }
         return doc;
      }));
      console.log("Updated Documents:", documents);
   };

   const createNewDocument = () => {
      const newDocumentName = getUniqueName("untitled-document.md");
      const newDocument = {
         createdAt: new Date().toISOString().split('T')[0],
         name: newDocumentName,
         content: ''
      };
   
      const updatedData = [...documents, newDocument];
      setDocuments(updatedData);
   
      console.log("Updated Documents Array:", updatedData);
   
      setText(newDocument.content);
      setCurrentDoc(newDocument.name);
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

   const updateDocumentName = () => {
      setDocuments((prevDocuments) =>
         prevDocuments.map((doc) =>
            doc.name === currentDoc ? { ...doc, name: docName } : doc
         )
      );
      setCurrentDoc(docName); 
   };
   
   useEffect(() => {
      const doc = documents.find(file => file.name === currentDoc);
      setText(doc ? doc.content : '');
   }, [currentDoc, documents]);

   const handleDocumentClick = (docName) => {
      setCurrentDoc(docName);
   };

   const renderMarkdown = (text) => {
      const lines = text.split('\n');
      const elements = [];
      let unorderedListItems = [];
      let orderedListItems = [];
      let currentOrderIndex = 1;
      let isInCodeBlock = false;
      let codeBlockContent = [];

      const flushList = (key) => {
         if (unorderedListItems.length > 0) {
         elements.push(
            <ul key={`${key}-unordered`} className="unordered-list">
               {unorderedListItems}
            </ul>
         );
         unorderedListItems = [];
         }
         if (orderedListItems.length > 0) {
         elements.push(
            <ol key={`${key}-ordered`} className="ordered-list">
               {orderedListItems}
            </ol>
         );
         orderedListItems = [];
         currentOrderIndex = 1;
         }
      };

      const renderTextWithLinks = (text) => {
         const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
         const parts = [];
         let lastIndex = 0;
         let match;

         while ((match = linkRegex.exec(text)) !== null) {
         const [fullMatch, linkText, url] = match;
         const startIndex = match.index;
         if (startIndex > lastIndex) {
            parts.push(text.substring(lastIndex, startIndex));
         }
         parts.push(
            <span key={url} className="link">
               <a href={url} target="_blank" rel="noopener noreferrer">
               {linkText}
               </a>
            </span>
         );
         lastIndex = startIndex + fullMatch.length;
         }
         if (lastIndex < text.length) {
         parts.push(text.substring(lastIndex));
         }

         return parts;
      };

      const renderInlineSnippets = (text) => {
         const snippetRegex = /`([^`]+)`/g;
         const parts = [];
         let lastIndex = 0;
         let match;

         while ((match = snippetRegex.exec(text)) !== null) {
         const [fullMatch, snippetText] = match;
         const startIndex = match.index;

         if (startIndex > lastIndex) {
            parts.push(text.substring(lastIndex, startIndex));
         }

         parts.push(
            <span key={startIndex} className="inline-snippet">
               {snippetText}
            </span>
         );

         lastIndex = startIndex + fullMatch.length;
         }

         if (lastIndex < text.length) {
         parts.push(text.substring(lastIndex));
         }

         return parts;
      };

      lines.forEach((line, index) => {
         const trimmedLine = line.trim();

         if (trimmedLine.startsWith('```')) {
         if (isInCodeBlock) {
            elements.push(
               <div key={`codeblock-${index}`} className="snippet-wrapper">
               {codeBlockContent.map((codeLine, i) => (
                  <p key={`code-line-${i}`} className="snippet-text">
                     {codeLine}
                  </p>
               ))}
               </div>
            );
            codeBlockContent = [];
            isInCodeBlock = false;
         } else {
            isInCodeBlock = true;
         }
         return;
         }

         if (isInCodeBlock) {
         codeBlockContent.push(line);
         return;
         }

         if (trimmedLine === '') {
         flushList(`list-${index}`);
         elements.push(<p key={`empty-${index}`}>&nbsp;</p>);
         } else if (line.startsWith('######')) {
         const content = line.slice(6).trim();
         flushList(`list-${index}`);
         elements.push(<h6 key={index} className="preview-xxs">{content}</h6>);
         } else if (line.startsWith('#####')) {
         const content = line.slice(5).trim();
         flushList(`list-${index}`);
         elements.push(<h5 key={index} className="preview-xs">{content}</h5>);
         } else if (line.startsWith('####')) {
         const content = line.slice(4).trim();
         flushList(`list-${index}`);
         elements.push(<h4 key={index} className="preview-s">{content}</h4>);
         } else if (line.startsWith('###')) {
         const content = line.slice(3).trim();
         flushList(`list-${index}`);
         elements.push(<h3 key={index} className="preview-m">{content}</h3>);
         } else if (line.startsWith('##')) {
         const content = line.slice(2).trim();
         flushList(`list-${index}`);
         elements.push(<h2 key={index} className="preview-l">{content}</h2>);
         } else if (line.startsWith('#')) {
         const content = line.slice(1).trim();
         flushList(`list-${index}`);
         elements.push(<h1 key={index} className="preview-xl">{content}</h1>);
         } else if (line.startsWith('-')) {
         const content = line.slice(1).trim();
         unorderedListItems.push(
            <li key={index} className="body">
               {renderTextWithLinks(renderInlineSnippets(content).join(''))}
            </li>
         );
         } else if (/^\d+\.\s/.test(line)) {
         const lineNumber = parseInt(line.match(/^(\d+)\./)[1], 10);
         const content = line.replace(/^\d+\.\s/, '').trim();

         if (lineNumber === currentOrderIndex) {
            orderedListItems.push(
               <li key={index} className="body">
               {renderTextWithLinks(renderInlineSnippets(content).join(''))}
               </li>
            );
            currentOrderIndex += 1;
         } else {
            flushList(`list-${index}`);
            orderedListItems.push(
               <li key={index} className="body">
               {renderTextWithLinks(renderInlineSnippets(content).join(''))}
               </li>
            );
            currentOrderIndex = lineNumber + 1;
         }
         } else if (line.startsWith('>')) {
         const content = line.slice(1).trim();
         flushList(`list-${index}`);
         elements.push(
            <div key={`blockquote-${index}`} className="blockquote">
               <p className="body-bold">
               {renderTextWithLinks(renderInlineSnippets(content).join(''))}
               </p>
            </div>
         );
         } else {
         flushList(`list-${index}`);
         elements.push(
            <p key={index} className="body">
               {renderTextWithLinks(renderInlineSnippets(trimmedLine).join(''))}
            </p>
         );
         }
      });

      flushList('last-list');

      return elements;
   };

   const confirmDeletion = () => {
      const updatedDocuments = documents.filter(doc => doc.name !== currentDoc);
      
      setDocuments(updatedDocuments);

      if (updatedDocuments.length > 0) {
         setCurrentDoc(updatedDocuments[0].name);  
      } else {
         setCurrentDoc('');  
      }

      setIsDeleting(false);
   };

   return ( 
      <>
         <Header
            theme={theme}
            toggleTheme={toggleTheme}
            isNavVisible={isNavVisible}
            toggleNavVisible={toggleNavVisible}
            saveDocument={saveDocument}
            createNewDocument={createNewDocument}
            currentDoc={currentDoc}
            currentDocDate={currentDocument ? currentDocument.createdAt : ''}
            documents={documents}
            setCurrentDoc={setCurrentDoc}
            handleDocumentClick={handleDocumentClick}
            confirmDeletion={confirmDeletion}
            isDeleting={isDeleting}
            setIsDeleting={setIsDeleting}
            updateDocumentName={updateDocumentName}
            docName={docName}
            setDocName={setDocName}
            isSmallScreen={isSmallScreen}
         />
         <div className={`markdown-wrapper ${isNavVisible ? 'phased-wrapper' : ''}`}>
         {isMarkdownVisible && (
            <Editor
               text={text}
               theme={theme}
               handleChange={handleChange}
               handleKeyDown={handleKeyDown}
               isMarkdownVisible={isMarkdownVisible}
               isSmallScreen={isSmallScreen}
               togglePreview={togglePreview} 
            />
         )}
         {(isPreviewVisible || !isSmallScreen) && (
            <Preview 
               text={text} 
               theme={theme}
               renderMarkdown={renderMarkdown} 
               isMarkdownVisible={isMarkdownVisible}
               toggleMarkdown={toggleMarkdown}
            />
         )}
         </div>
      </>
      
   );
}

export default App;


