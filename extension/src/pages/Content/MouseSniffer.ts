import {CustomLogger} from "../../utils/CustomLogger"
import axios from "axios"
import {get_local_datetime} from "../../utils/time_utils"
import {DEFAULT_SUBJECT_ID} from "../../config/config"
import {BACKEND_URLS} from "../../config/backend-url";


type T_MOUSE_EVENT_DATA = {
    type: string,
    path: Array<string>,
    timestamp: string,

    which: number,

    clientX: number,
    clientY: number,
    offsetX: number,
    offsetY: number,
    pageX: number,
    pageY: number,
    screenX: number,
    screenY: number,

    subject_id: number | string
}

export class MouseSniffer{
    private logger : CustomLogger
    private subject_id : number | string
    private mouse_clicked : boolean

    constructor(subject_id=DEFAULT_SUBJECT_ID){
        this.subject_id = subject_id
        this.mouse_clicked = false
        this.logger = new CustomLogger("[MouseSniffer]")
    }


    init(){
        this.logger.log("Initializing...")
        this.start_sniffing()
    }


    start_sniffing(){
        window.onmousedown = this.handle_mouse_event.bind(this)
        window.onclick = this.handle_mouse_event.bind(this)
        window.onmouseup = this.handle_mouse_event.bind(this)
        window.onmousemove = this.handle_mouse_move.bind(this)
    }


    /*
        #TODO ATTENTION
        #TODO ATTENTION
        #TODO REWRITE THIS MODULE FOR TYPESCRIPT
     */


    /**
     * This method keeps track of mouse dragging
     * If mousedown event occurred with no mouseup then it means that mouse button is still clicked.
     * After mouseup event dragging no longer occurs.
     * @param {MouseEvent} event 
    */
    private handle_mouse_clicked(event){
        if(event.type === "mousedown" && event.which === 1){
            this.mouse_clicked = true
        }
        else if(event.type === "mouseup" && event.which === 1){
            this.mouse_clicked = false
        }
    }


    /**
     * This method handles mouse move events
     * @param {MouseEvent} event
    */
    private async handle_mouse_move(event) : Promise<void>{
        if(this.mouse_clicked){
            const data = this.get_event_attributes(event)
            data.type = "drag" // <-- changing default type to custom
            //TODO data.path = this.fill_data_path(event)
            await this.send_data_to_server(data)
        }
    }

    /**
     * This method handles mouseup, mousedown, mouseclick events.
     * Prepares required data and submits event information to the backend server
     * @param {MouseEvent} event 
    */
    async handle_mouse_event(event : MouseEvent){
        if(event.type !== "mousedown" && event.type && "mouseclick" && event.type !== "mouseup"){
            return
        }

        // Track if user is mouse dragging
        this.handle_mouse_clicked(event)

        // Get required mouse event attributes
        const data = this.get_event_attributes(event)
        
        // Get the event path as JSON string
        //TODO data.path = this.fill_data_path(event)

        // Submit data
        //TODO await this.send_data_to_server(data)
    }
    
    /**
     * This method fetches required attributes from given event
     * @param {MouseEvent} event 
     * @returns {object}
    */
    get_event_attributes(event:MouseEvent) : T_MOUSE_EVENT_DATA{
       return {
            //target_class_name: event.target?.className,
            //target_class_list: JSON.stringify(event.target.classList),
            //target_id: event.target.id,
            //target_inner_text: event.target.innerText,
            //target_node_name: event.target.nodeName,
            type: event.type,
            path: [],
            timestamp: get_local_datetime(new Date()),

            which: event.which,

            clientX: event.clientX,
            clientY: event.clientY,
            offsetX: event.offsetX,
            offsetY: event.offsetY,
            pageX: event.pageX,
            pageY: event.pageY,
            screenX: event.screenX,
            screenY: event.screenY,

            subject_id: this.subject_id
        }
    }

    /**
     * This method analyzes the path attribute and extracts required information
     * Returns JSON string of array containing objects with key elements like nodeName and innerText
     * @param {MouseEvent} event 
     * @returns 
    */
    fill_data_path(event : any) : string{
        const data_path : Array<object> = [];
        for(const i in event.path){
            const element = event.path[i]
            const element_data = {
                node_name: element.nodeName,
                class_list: JSON.stringify(element.classList),
                inner_text: element.innerText,
                id: element.id
            }
            data_path.push(element_data)
        }
        return JSON.stringify(data_path)
    }


    /**
     * Submits given data to the server as JSON body in POST request 
     * @param {object} data 
    */
    async send_data_to_server(data){
        try{
            const response = await axios.post(BACKEND_URLS.mouse_event, data)
            this.logger.log(`${response.data.msg} ${response.status}`)
        }
        catch(err){
            this.logger.log(err)
        }
    }

}


