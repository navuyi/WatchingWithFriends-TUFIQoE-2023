import Joi from "joi"
import { ChromeStorage } from "../custom/ChromeStorage"

export const validate_setup_form = async () : Promise<boolean> => {
    const {subject_age, subject_id, subject_sex, 
        subject_netflix_familiarity, subject_selected_content, device_id, 
        session_type} = await ChromeStorage.get_experiment_settings()

    // Essential fields
    const schema = Joi.object({
        device_id: Joi.number().valid(106, 107).required(),
        subject_id: Joi.number().min(100).max(999).required(),
        session_type: Joi.string().valid("alone", "together").required()
    })
    const {error} = schema.validate({device_id, subject_id, session_type})
    if(error){
        console.log(error)
        return false
    }
    
    // Fields in alone session
    if(session_type === "alone"){
        // Validate all
        const schema = Joi.object({
            subject_age: Joi.number().greater(0).required(),
            subject_sex: Joi.string().valid("male", "female", "undisclosed").required(),
            subject_netflix_familiarity: Joi.boolean().required(),
            subject_selected_content: Joi.boolean().required()
        })
        const {error} = schema.validate({subject_age, subject_sex, subject_netflix_familiarity, subject_selected_content})
        if(error){
            console.log(error)
            return false
        }
    }
    // Fields in together session
    else if(session_type === "together"){
        const schema = Joi.object({
            subject_age: Joi.equal("").required(),
            subject_sex: Joi.equal("").required(),
            subject_netflix_familiarity: Joi.equal("").required(),
            subject_selected_content: Joi.equal("").required()
        })
        const {error} = schema.validate({subject_age, subject_sex, subject_netflix_familiarity, subject_selected_content})
        if(error){
            console.log(error)
            return false
        }
    }

    // Validated
    return true
}