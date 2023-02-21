import {STORAGE_KEYS} from "../../storage/chrome-storage";
import { CustomLogger } from "../../utils/CustomLogger"
import {DEFAULT_SUBJECT_ID} from "../../config/config";

export class AssessmentManager {
    private logger : CustomLogger
    private subject_id : string | number
    private default_interval : number | undefined
    private interval : ReturnType<typeof setInterval> | undefined
    private video_index : number | undefined

    constructor(subject_id=DEFAULT_SUBJECT_ID){
        this.subject_id = subject_id
        this.logger = new CustomLogger(["AssessmentManager"])
    }


    async init(){
        this.logger.log("Initializing...")

        // Get current video index for later comparison
        this.video_index = (await chrome.storage.local.get([STORAGE_KEYS.VIDEO_INDEX]))[STORAGE_KEYS.VIDEO_INDEX]
        
        // Get info on if assessment had already started in this experiment
        const assessment_initialized = (await chrome.storage.local.get([STORAGE_KEYS.ASSESSMENT_INITIALIZED]))[STORAGE_KEYS.ASSESSMENT_INITIALIZED]

        // Get default interval from config
        this.default_interval = (await chrome.storage.local.get([STORAGE_KEYS.ASSESSMENT_INTERVAL_SECONDS]))[STORAGE_KEYS.ASSESSMENT_INTERVAL_SECONDS]

        // Check if assessment process was already started in the experiment
        if(assessment_initialized === false){
            await this.set_next_assessment_datetime(this.default_interval)
            await chrome.storage.local.set({
                [STORAGE_KEYS.ASSESSMENT_INITIALIZED]: true
            })
        }
        else{
            this.logger.log("Assessment process already initialized")
        }


        this.start_checking_assessment_interval()
    }


    async set_next_assessment_datetime(seconds){
        const now = new Date()
        const next = new Date(now.getTime() + seconds*1000)
        this.logger.log(`Setting next assessment_datetime to: ${next}`)
        await chrome.storage.local.set({
            [STORAGE_KEYS.NEXT_ASSESSMENT_DATETIME]: next.toJSON()
        })
    }



    start_checking_assessment_interval(){
        this.interval = setInterval(async () => {
            const global_video_index = (await chrome.storage.local.get([STORAGE_KEYS.VIDEO_INDEX]))[STORAGE_KEYS.VIDEO_INDEX]
            if(global_video_index !== this.video_index && this.interval != null){
                clearInterval(this.interval)
                return
            }
            const now : Date = new Date()
            const next_assessment_datetime : Date = new Date((await chrome.storage.local.get([STORAGE_KEYS.NEXT_ASSESSMENT_DATETIME]))[STORAGE_KEYS.NEXT_ASSESSMENT_DATETIME])
            if(now >= next_assessment_datetime){
                this.logger.log("It is time to show assessment panel")
                await this.set_next_assessment_datetime(this.default_interval)
            }
            else{
                this.logger.log(`No time for assessment yet.`)
            }
        }, 1000) // <-- checking every 1 second
    }
}