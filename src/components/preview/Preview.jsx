import { useSelector, useDispatch } from 'react-redux';

import './preview.scss';

import { toggleMarkdown } from '../../redux/features/viewSlice';

function Preview() {

   const dispatch = useDispatch();
   const { theme } = useSelector((state) => state.theme);
   const { localText } = useSelector((state) => state.documents);
   const { isMarkdownVisible } = useSelector((state) => state.view);

   const handleToggleMarkdown = () => {
      dispatch(toggleMarkdown());
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
               {text}
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

   return (
      <div className="preview">
         <div className={`primary-padding header-section ${isMarkdownVisible ? '' :'header-section-wide' }`}>
            <h1 className="section-header">PREVIEW</h1>
            <button 
               className={`preview-btn ${theme === 'dark' ? 'preview-btn-dark' : 'preview-btn-light'}`}
               onClick={handleToggleMarkdown}
               aria-label="Toggle markdown"
            >
                  {isMarkdownVisible ? 
                  <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z" fill=""/></svg> : 
                  <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M1.38.027a.795.795 0 0 1 .769.206L14.815 12.9a.792.792 0 0 1 0 1.124.792.792 0 0 1-1.124 0L9.234 9.567a2.77 2.77 0 0 1-3.753-3.753L1.024 1.357a.795.795 0 0 1 .357-1.33Zm.998 3.832 1.156 1.116a10.846 10.846 0 0 0-1.773 2.153c.696 1.117 2.929 4.038 6.333 3.959a6.127 6.127 0 0 0 1.346-.198l1.25 1.25a7.505 7.505 0 0 1-2.556.53h-.198c-4.663 0-7.331-4.282-7.83-5.145a.792.792 0 0 1 0-.792A12.58 12.58 0 0 1 2.378 3.86Zm5.328-2.272c4.726-.143 7.52 4.267 8.028 5.145.15.24.163.542.031.792a12.58 12.58 0 0 1-2.304 2.874l-1.195-1.116a10.846 10.846 0 0 0 1.813-2.154c-.705-1.116-2.937-4.045-6.333-3.958a6.127 6.127 0 0 0-1.346.198L5.149 2.117a7.505 7.505 0 0 1 2.557-.53Zm-.974 5.486v.055c0 .656.532 1.188 1.188 1.188l.047-.008-1.235-1.235Z" fill=""/></svg>}
            </button>
         </div>
         <div className={`primary-padding ${isMarkdownVisible ? 'result' : 'result-wide'}`}>
            {renderMarkdown(localText)}
         </div>
      </div>
   );
}

export default Preview;
