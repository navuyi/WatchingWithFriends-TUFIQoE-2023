import React, {useEffect, useState} from 'react';

const Popup = () => {
   
    const handleClick = async () => {
        const tabs = await chrome.tabs.query({active: true, currentWindow: true})
        chrome.tabs.update(tabs[0].id, {
            url: "./setup.html"
        })
    }
  
    return (
        <div className="App" >
           <button onClick={handleClick}>Setup</button>
        </div>
        );
    };

export default Popup;
