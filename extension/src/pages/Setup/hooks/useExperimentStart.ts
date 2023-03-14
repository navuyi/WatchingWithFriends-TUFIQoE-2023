import { ChromeStorage } from "../../../utils/custom/ChromeStorage"
import Joi from "joi"
import { post_new_experiment } from "../../../utils/http_requests/post_new_experiment"
import { get_local_datetime } from "../../../utils/time_utils"
import { post_new_video } from "../../../utils/http_requests/post_new_video"

export const useExperimentStart = () => {

    const start_immediately = async () : Promise<void> => {
        const settings = await ChromeStorage.get_experiment_settings()
        const variables = await ChromeStorage.get_experiment_variables()

        const timestamp = get_local_datetime(new Date())

        // Create new experiment entry in database
        const database_experiment_id = await post_new_experiment({
            started: timestamp,
            subject_id: settings.subject_id,
            device_id: settings.device_id,
            session_type: settings.session_type,

            subject_age: settings.subject_age,
            subject_sex: settings.subject_sex,
            subject_netflix_familiarity: settings.subject_netflix_familiarity,
            subject_selected_content: settings.subject_selected_content,
            content_continuation: settings.content_continuation,

            urls: JSON.stringify(settings.config?.videos.map(video => video.url)),
            settings: JSON.stringify(settings)
        })

        // Update experiment id variable
        await ChromeStorage.update_experiment_variables_property("database_experiment_id", database_experiment_id)
        
        // Create new video entry in database
        const database_video_id = await post_new_video({
            started: timestamp,
            experiment_id: database_experiment_id as number,
            url: settings.config?.videos[variables.video_index].url as string
        })

        // Update video id variable
        await ChromeStorage.update_experiment_variables_property("database_video_id", database_video_id)

        // Start experiment
        await ChromeStorage.update_experiment_variables_property("extension_mode", "main")
        await ChromeStorage.update_experiment_variables_property("extension_running", true)
        window.location.href = settings.config?.videos[variables.video_index].url as string
    }

    const start_scheduled = () => {
        // Schedule start
    }

    const validate_setup_form = async () : Promise<boolean> => {
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




    return {
        validate_setup_form,
        start_immediately
    }


}