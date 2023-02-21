import { CustomLogger } from "../../utils/CustomLogger"
import { YOUTUBE_PLAYER_URL } from "../../config/config"
import {STORAGE_KEYS} from "../../storage/chrome-storage";



export class Supervisor{
    private logger: CustomLogger

    constructor(){
        this.logger = new CustomLogger("[Supervisor]")
    }


    init(){
        this.logger.log("Initializing...")
        this.activate_listeners()
    }

    /**
     * This method increments video index.
     * It uses chrome.storage to save the current video_index, not local variable.
    */
    async increment_video_index(){
        const video_index = (await chrome.storage.local.get([STORAGE_KEYS.VIDEO_INDEX]))[STORAGE_KEYS.VIDEO_INDEX]
        this.logger.log(`Incrementing video index to ${video_index+1}`)
        
        // Setting video index in chrome.storage
        await chrome.storage.local.set({
            [STORAGE_KEYS.VIDEO_INDEX]: video_index+1
        })
    }
    
    activate_listeners(){
        // onHistoryStateUpdated detects navigation within Netlifx player (next video button)
        chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
            if(details.frameId === 0 && details.url.includes(YOUTUBE_PLAYER_URL)) {
                chrome.tabs.get(details.tabId, async (tab) => {
                    if(tab.url === details.url) {
                        this.logger.log("onHistoryStateUpdated is executed")
                        await this.inject_script(details.tabId)
                    }
                });
            }
        });
        // onCompleted detects navigation using chrome.tabs.update
        chrome.webNavigation.onCompleted.addListener(details => {
            if(details.frameId === 0 && details.url.includes(YOUTUBE_PLAYER_URL)) {
                chrome.tabs.get(details.tabId, async (tab) => {
                    if(tab.url === details.url) {
                        this.logger.log("onCompleted is executed")
                        await this.inject_script(details.tabId)
                    }
                });
            }
        })
    }

    async clear_browser_history(){
        //await chrome.history.deleteAll()
        //this.logger.log("Browser's history deleted")
    }

    async inject_script(tabId){
        this.logger.log("Injecting ContentScript")
        // Incrementing video index first...
        await this.increment_video_index()

        // ...then inject new content script
        await chrome.scripting.executeScript({
            target: {
                 tabId: tabId
            },
             files: ["contentScript.bundle.js"]
         })
    }
}