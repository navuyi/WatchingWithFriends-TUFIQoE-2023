import {get_local_datetime} from "./time_utils"


export class CustomLogger{
    private prefix: String
    private custom_logger: Function
    private original_logger: Function

    constructor(prefix){
        this.prefix = prefix
        this.original_logger = console.log
        
        this.custom_logger = (content) => {
            const info = `${this.prefix} | ${get_local_datetime(new Date())} |`
            this.original_logger(info, content)
        }
    }



    public log(content){
       this.custom_logger(content)
    }
}