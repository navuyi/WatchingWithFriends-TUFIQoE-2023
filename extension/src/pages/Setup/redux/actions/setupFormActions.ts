import { T_EXPERIMENT_SETTINGS } from "../../../../config/storage.config"
import { T_SETUP_FORM_STATE } from "../reducers/setupFormReducer"



export interface I_UPDATE_SETUP_FORM_ACTION {
    readonly type: "UPDATE_SETUP_FORM_ACTION",
    payload: {
        key : keyof T_EXPERIMENT_SETTINGS,
        value: any
    }
}

export interface I_SET_SETUP_FORM_ACTION {
    readonly type: "SET_SETUP_FORM_ACTION",
    payload: T_SETUP_FORM_STATE
}


export type T_SETUP_FORM_ACTIONS = I_UPDATE_SETUP_FORM_ACTION | I_SET_SETUP_FORM_ACTION