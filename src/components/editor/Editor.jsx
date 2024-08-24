import React from 'react';
import './editor.scss';

function Editor({ text, handleChange, handleKeyDown, isMarkdownVisible }) {
   return ( 
      <>
         {isMarkdownVisible && (
            <div className="editor">
               <div className="header-section primary-padding">
                  <h1 className="section-header">MARKDOWN</h1>
               </div>
               <textarea
                  className="editor-text primary-padding"
                  value={text}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
               />
            </div>   
         )}
      </>    
   );
}

export default Editor;
