import Joi from "joi"

export const validateExperimentAvailable = (config : any) : boolean => {
    const configSchema = Joi.object({
        title: Joi.string().allow("").required(),
        description: Joi.string().allow("").required(),
        assessment_interval: Joi.number().not(0).required(),
        bitrate_interval: Joi.number().greater(0).required(),
        videos: Joi.array().items(
            Joi.object({
                name: Joi.string().allow("").required(),
                description: Joi.string().allow("").required(),
                url: Joi.string().pattern(/https:\/\/www.netflix.com\/watch\/[0-9]+.+/m).required(),
                vmaf_template_scenario: Joi.array().min(1).items(Joi.number()).required(),
                bitrate_vmaf_map: Joi.array().items(Joi.object({
                    vmaf: Joi.number().required(),
                    bitrate: Joi.number().required()
                })).required(),
                scenario: Joi.array().items(Joi.object({
                    bitrate: Joi.number().required(),
                    vmaf: Joi.number().required(),
                    vmaf_diff: Joi.number().required(),
                    vmaf_template: Joi.number().required()
                })).required()
            })
        )
    })
    const {error} = configSchema.validate(config)
    if(error){
        return false
    }else{
        return true
    }
}