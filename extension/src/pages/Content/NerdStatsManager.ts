import {CustomLogger} from "../../utils/CustomLogger";
import {get_movie_player_element} from "../../utils/nerd-stats-utils/get-movie-player-element";
import {open_player_context_menu} from "../../utils/nerd-stats-utils/open-player-context-menu";
import {open_nerd_stats_window} from "../../utils/nerd-stats-utils/open-nerd-stats-window";
import {chrome_storage_get_single} from "../../storage/chrome-storage-get";
import {STORAGE_KEYS} from "../../storage/chrome-storage";


export class NerdStatsManager{
    public static nerd_stats_elements : Object
    private logger : CustomLogger
    private video_index : Number | undefined
    private interval : ReturnType<typeof setInterval> | undefined

    constructor() {
        this.logger = new CustomLogger("[NerdStatsManager]")
    }

    public init = async () : Promise<void> => {
        this.video_index = await chrome_storage_get_single(STORAGE_KEYS.VIDEO_INDEX)
        NerdStatsManager.nerd_stats_elements = await this.get_nerd_stats_elements()

        this.start_manager_cycle()
    }


    private get_nerd_stats_elements = async () : Promise<Object> => {
        return new Promise(resolve => {
            const retry_interval = setInterval(async () => {
                const video_info_panel = document.getElementsByClassName("html5-video-info-panel").item(0);
                const video_info_panel_content = document.getElementsByClassName("html5-video-info-panel-content").item(0);

                if(video_info_panel != null && video_info_panel_content != null){
                    clearInterval(retry_interval)
                    this.logger.log("Nerd Stats already enabled. Resolving...")
                    resolve({
                        video_info_panel: video_info_panel,
                        video_info_panel_content: video_info_panel_content
                    })
                }
                else{
                    this.logger.log("Nerd Stats not available. Invoking...")

                    // Get movie_player element
                    const movie_player = await get_movie_player_element() // <-- Keeps waiting for the element

                    // Simulate right click in order to open YT context menu
                    open_player_context_menu(movie_player)

                    // Enable nerd statistics window
                    await open_nerd_stats_window()

                    // Get the elements
                    const video_info_panel = document.getElementsByClassName("html5-video-info-panel").item(0);
                    const video_info_panel_content = document.getElementsByClassName("html5-video-info-panel-content").item(0);

                    if( video_info_panel != null && video_info_panel_content != null){
                        this.logger.log("Found elements. Resolving...")
                        resolve({
                            video_info_panel: video_info_panel,
                            video_info_panel_content: video_info_panel_content
                        })
                    }
                }
            }, 500)
        })
    }

    private is_video_index_matching = async () : Promise<boolean> => {
        const global_video_index = await chrome_storage_get_single(STORAGE_KEYS.VIDEO_INDEX)
        this.logger.log(`My video_index is ${this.video_index}. Global is ${global_video_index}`)

        if(global_video_index !== this.video_index){
            this.logger.log("Video index mismatch!")
            return false
        }
        else{
            return true
        }
    }

    private clear_interval = () : void => {
        this.logger.log("Clearing interval...")
        if(this.interval) clearInterval(this.interval)
    }

    private start_manager_cycle = () : void =>{
        this.interval = setInterval(async () => {
            if(!await this.is_video_index_matching() && this.interval){
                this.logger.log("Clearing interval...")
                clearInterval(this.interval)
                return
            }

            if(window.location.href.includes("https://www.youtube.com/watch?v=")){
                this.logger.log("Doing the logic here!!! - Analyzing nerd stats using external class!")
                this.logger.log(NerdStatsManager.nerd_stats_elements)
            }
            else{
                this.logger.log("Outside of video player. Clearing interval...")
                if(this.interval) clearInterval(this.interval)
            }
        }, 1000)
    }
}


