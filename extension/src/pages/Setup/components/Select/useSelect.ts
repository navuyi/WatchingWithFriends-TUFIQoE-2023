import { useState } from "react"
import { T_EXPERIMENT_SETTINGS } from "../../../../config/storage.config"
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage"

import { useSelector } from "react-redux"
import { Dispatch } from "redux"

import { T_APP_STATE } from "../../redux/reducers"
import { T_SETUP_FORM_STATE } from "../../redux/reducers/setupFormReducer"
import { useDispatch } from "react-redux"
import { T_SETUP_FORM_ACTIONS } from "../../redux/actions/setupFormActions"

export const useSelect = (key:keyof T_EXPERIMENT_SETTINGS) => {
    const value = useSelector((state:T_APP_STATE) => state.setupForm[key as keyof T_SETUP_FORM_STATE])
    const dispatch = useDispatch<Dispatch<T_SETUP_FORM_ACTIONS>>()


    const init = async () : Promise<void> => {
        const settings = await ChromeStorage.get_experiment_settings()
        dispatch({
            type: "UPDATE_SETUP_FORM_ACTION",
            payload: {
                key: key,
                value: settings[key]
            }
        })
    }

    const handleChange = async (value:string) : Promise<void> => {
        await ChromeStorage.update_experiment_settings_property(key, value)
        dispatch({
            type: "UPDATE_SETUP_FORM_ACTION",
            payload: {
                key: key,
                value: value
            }
        })
    }

    return{
        init,
        value,
        handleChange
    }
}