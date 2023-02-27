import { useState } from "react"
import { T_EXPERIMENT_SETTINGS } from "../../../../config/storage.config"
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage"




export const useSelect = (key:keyof T_EXPERIMENT_SETTINGS) => {
    const [value, setValue] = useState("")


    const init = async () : Promise<void> => {
        const settings = await ChromeStorage.get_experiment_settings()
        setValue(settings[key] as string)
    }

    const handleChange = async (value:string) : Promise<void> => {
        setValue(value)
        await ChromeStorage.update_experiment_settings_property(key, value)
    }

    return{
        init,
        value,
        handleChange
    }
}