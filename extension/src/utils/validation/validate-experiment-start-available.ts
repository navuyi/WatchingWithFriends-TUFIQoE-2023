import Joi from "joi"
import { T_STARTUP_FORM } from "../../pages/Setup/redux/types"

export const validateExperimentStartAvailable =  (config:T_STARTUP_FORM) => {
    const configSchema = Joi.object({
        subject_id: Joi.string().required(),
        device_id: Joi.string().required(),
        session_type: Joi.string().valid("alone", "together").required(),
        subject_age: Joi.number().required(),
        subject_sex: Joi.string().valid("male", "female", "undisclosed").required(),
        subject_netflix_familiarity: Joi.string().required(),
        subject_selected_content: Joi.string().required(),
        content_continuation: Joi.string().required() 
    })
    
    const {error} = configSchema.validate(config)
    if(error){
        console.log(error)
        return false
    }else{
        return true
    }
}