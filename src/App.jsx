import { useState, useEffect } from 'react';
import './assets/styles/fonts.scss';
import './assets/styles/global.scss';
import './assets/styles/buttons.scss';
import Header from './components/header/Header';
import Editor from './components/editor/Editor';
import Preview from './components/preview/Preview';
import data from './data.json';

function App() {
   const welcomeContent = data.find(file => file.name === "welcome.md")?.content || '';
   const [text, setText] = useState(welcomeContent); 
   const [isMarkdownVisible, setIsMarkdownVisible] = useState(true);
   const [isNavVisible, setIsNavVisible] = useState(false);
   const [theme, setTheme] = useState(() => {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme : 'light';
    });
  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
  
    useEffect(() => {
      // Устанавливаем класс темы на элемент body
      document.body.className = theme;
      // Сохраняем текущую тему в localStorage
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

   const togglePreview = () => {
      setIsMarkdownVisible((markVisible) => !markVisible);
   };

   const saveDocument = () => {
      const updatedData = data.map(file => {
         if (file.name === "welcome.md") {
            return { ...file, content: text }; // обновляем контент файла
         }
         return file;
      });
      console.log("Updated Data:", updatedData);
      // Здесь вы можете реализовать логику для сохранения `updatedData` в файл `data.json`.
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

         // Handling code blocks with ```
         if (trimmedLine.startsWith('```')) {
         if (isInCodeBlock) {
            // Closing code block
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
            // Starting new code block
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

   return ( 
      <>
         <Header
            theme={theme}
            toggleTheme={toggleTheme}
            isNavVisible={isNavVisible}
            toggleNavVisible={toggleNavVisible}
            saveDocument={saveDocument}
         />
         <div className={`markdown-wrapper ${isNavVisible ? 'phased-wrapper' : ''}`}>
            <Editor
               text={text}
               handleChange={handleChange}
               handleKeyDown={handleKeyDown}
               isMarkdownVisible={isMarkdownVisible}
            />
            <Preview 
               text={text} 
               theme={theme}
               renderMarkdown={renderMarkdown} 
               isMarkdownVisible={isMarkdownVisible}
               togglePreview={togglePreview}
            />
         </div>
      </>
      
   );
}

export default App;





// # Welcome to Markdown

// Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

// ## How to use this?

// 1. Write markdown in the markdown editor window
// 2. See the rendered markdown in the preview window

// ### Features

// - Create previews, paragraphs, links, blockquotes, inline-code, code blocks, and lists
// - Name and save the document to access again later
// - Choose between Light or Dark mode depending on your preference

// > This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).

// #### previews

// To create a preview, add the hash sign (#) before the preview. The number of number signs you use should correspond to the preview level. You'll see in this guide that we've used all six preview levels (not necessarily in the correct way you should use previews!) to illustrate how they should look.

// ##### Lists

// You can see examples of ordered and unordered lists above.

// ###### Code Blocks

// This markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:

// ```
// <main>
//   <h1>This is a larger code block</h1>
// </main>
// ```

