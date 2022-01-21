import React from 'react';

export const ScrollDemo = () => {
    const myRef = React.useRef(null)
 
    const executeScroll = () => myRef.current.scrollIntoView();    
 
    return (
       <> 
          <div ref={myRef}>Element to scroll to</div> 
          <button onClick={executeScroll}> Click to scroll </button> 
       </>
    )
 }
 