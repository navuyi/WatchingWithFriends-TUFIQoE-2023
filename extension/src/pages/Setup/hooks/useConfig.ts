import { ChromeStorage } from "../../../utils/custom/ChromeStorage"
import { T_CONFIG } from "../../../config/types/data-structures.type"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { T_CONFIG_ACTIONS } from "../redux/actions/configActions"
import { is_config_experiment_applicable } from "../../../utils/validation/validate_config"
import { is_config_mapping_applicable } from "../../../utils/validation/validate_config"



export const useConfig = () => {
    const configDispatch = useDispatch<Dispatch<T_CONFIG_ACTIONS>>()
    
    const save_config = async (config : T_CONFIG) => {
        // Update storage
        const settings = await ChromeStorage.get_experiment_settings()
        settings.config = config
        await ChromeStorage.set_experiment_settings(settings)
        // Update state
        const experiment_applicable = await is_config_experiment_applicable(config)
        const mapping_applicable = await is_config_mapping_applicable(config)
        configDispatch({
            type: "SET_EXPERIMENT_APPLICABLE",
            payload: experiment_applicable
        })
        configDispatch({
            type: "SET_MAPPING_APPLICABLE",
            payload: mapping_applicable
        })
        configDispatch({
            type: "SET_VALUE",
            payload: config
        })
    }

    return {
        save_config  
    }
}