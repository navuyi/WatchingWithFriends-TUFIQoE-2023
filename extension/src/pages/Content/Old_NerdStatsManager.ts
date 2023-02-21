import { CustomLogger } from "../../utils/CustomLogger"
import {DEFAULT_SUBJECT_ID} from "../../config/config"
import {STORAGE_KEYS} from "../../storage/chrome-storage";
import {chrome_storage_get_single} from "../../storage/chrome-storage-get";


export class Old_NerdStatsManager {
    private logger: CustomLogger
    private video_index : number | undefined
    private interval : ReturnType<typeof setInterval> | undefined
    private subject_id : number | string
    private nerd_stats : HTMLElement | undefined
    private nerd_content : HTMLElement | undefined

    constructor(subject_id=DEFAULT_SUBJECT_ID){
        this.subject_id = subject_id
        this.logger = new CustomLogger("Old_NerdStatsManager")
    }


    async init() : Promise<void>{
        this.logger.log("Initializing...")
        
        // Get current video index for later checking
        this.video_index = await chrome_storage_get_single(STORAGE_KEYS.VIDEO_INDEX)
        this.logger.log(this.video_index)


        
        // Start analyze interval
        //this.start_analyzing_nerd_stats(nerd_stats, nerd_content)
    }

    start_analyzing_nerd_stats(nerds_stats, nerd_content){
        // nerd_data is a html element, it consist multiple items
        const nerd_data = nerd_content.children;

        // Extract data from the html elements
        const videoId_sCPN = nerd_data.item(0);
        const viewport_frames = nerd_data.item(1);
        const current_optimalRes = nerd_data.item(2);
        const volume_normalized = nerd_data.item(3);
        const codecs = nerd_data.item(4);
        const color = nerd_data.item(6);
        const connectionSpeed = nerd_data.item(8);
        const networkActivity = nerd_data.item(9);
        const bufferHealth = nerd_data.item(10);
        const mysteryText = nerd_data.item(14);



        this.interval = setInterval(async () => {
            const global_video_index = await chrome_storage_get_single(STORAGE_KEYS.VIDEO_INDEX)
            this.logger.log(`My video_index is ${this.video_index}. Global is ${global_video_index}`)
            if(global_video_index !== this.video_index){
                this.interval ? clearInterval(this.interval) : null
                this.logger.log("Different video index detected. Clearing interval!!!")
                return
            }
            if(window.location.href.includes("https://www.youtube.com/watch?v=")){
                //TODO Finish analyzing nerd statistics according to requirements
                this.logger.log("Analyzing nerd statistics...#TODO")
                //this.logger.log(videoId_sCPN.querySelector("span").innerText)
                //this.logger.log(viewport_frames.querySelector("span").innerText)
            }
            else{
                this.logger.log("Outside of video player page")
            }
            
        }, 1000)
    }
}