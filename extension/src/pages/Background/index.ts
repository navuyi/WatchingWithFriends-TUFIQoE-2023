import {STORAGE_DEFAULT, STORAGE_KEYS} from "../../storage/chrome-storage";
import {CustomLogger} from "../../utils/CustomLogger"
import { Supervisor } from "./Supervisor"
import {chrome_storage_get_multiple, chrome_storage_get_single} from "../../storage/chrome-storage-get";



const logger = new CustomLogger("[BackgroundScript]")

chrome.action.onClicked.addListener(async () => {
    const tabs:Object = await chrome.tabs.query({active: true, currentWindow: true})
    await chrome.tabs.update(tabs[0].id, {
        url: "./setup.html"
    })
})

/**
 * Set default storage when extension is installed/reloaded 
*/
chrome.runtime.onInstalled.addListener(async (details) => {
    logger.log("Setting default storage")
    await chrome.storage.local.set(STORAGE_DEFAULT)
})





const supervisor = new Supervisor()
supervisor.init()

