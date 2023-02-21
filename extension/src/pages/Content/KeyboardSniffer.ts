import { DEFAULT_SUBJECT_ID } from "../../config/config"
import {BACKEND_URLS} from "../../config/backend-url";
import { CustomLogger } from "../../utils/CustomLogger"
import { get_local_datetime } from "../../utils/time_utils"
import axios from "axios"


export class KeyboardSniffer{
    private logger : CustomLogger
    private subject_id : number | string
    constructor(subject_id= DEFAULT_SUBJECT_ID){
        this.subject_id = subject_id
        this.logger = new CustomLogger(["KeyboardSniffer"])
    }


    init(){
        this.logger.log("Initializing...")
        this.start_sniffing()
    }


    private start_sniffing(){
        window.onkeydown = this.handle_keyboard_event.bind(this)
        window.onkeyup = this.handle_keyboard_event.bind(this)
        window.onkeypress = this.handle_keyboard_event.bind(this)
    }

    private async handle_keyboard_event(event){
        const data = {
            code: event.code,
            key: event.key,
            alt_key: event.altKey,
            ctrl_key: event.ctrlKey,
            shift_key: event.shiftKey,
            key_code: event.keyCode,
            repeat: event.repeat,
            type: event.type,
            which: event.which,
            timestamp: get_local_datetime(new Date()),

            subject_id: this.subject_id
        }
        await this.send_data_to_server(data)
    }


    private async send_data_to_server(data){
        try{
            const response = await axios.post(BACKEND_URLS.keyboard_event, data)
            this.logger.log(`${response.data} ${response.status}`)
        }
        catch(err){
            this.logger.log(err)
        }
    }
    
}