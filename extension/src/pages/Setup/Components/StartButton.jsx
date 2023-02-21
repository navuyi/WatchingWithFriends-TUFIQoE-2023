import React from "react";





const StartButton = props => {

    const handleClick = async () => {
        const tabs = await chrome.tabs.query({active: true, currentWindow: true})
        await chrome.tabs.update(tabs[0].id, {
            url: "https://youtube.com"
        })
    }

    return(
        <>
            <button className="start-button" onClick={handleClick}>Initialize</button>
        </>
    )
}


export default StartButton