import { T_EXPERIMENT_SETTINGS } from "../../../../config/storage.config"
import { T_SETUP_FORM_ACTIONS } from "../actions/setupFormActions"


export type T_SETUP_FORM_STATE = {
    device_id: T_EXPERIMENT_SETTINGS["device_id"]
    subject_id: T_EXPERIMENT_SETTINGS["subject_id"]
    subject_age: T_EXPERIMENT_SETTINGS["subject_age"]
    session_type: T_EXPERIMENT_SETTINGS["session_type"]
    subject_sex: T_EXPERIMENT_SETTINGS["subject_sex"]
    subject_netflix_familiarity: T_EXPERIMENT_SETTINGS["subject_netflix_familiarity"]
    subject_selected_content: T_EXPERIMENT_SETTINGS["subject_selected_content"]
}



const initialState : T_SETUP_FORM_STATE = {
    device_id: "",
    subject_id: "",
    session_type: "",
    subject_age: "",
    subject_sex: "",
    subject_netflix_familiarity: "",
    subject_selected_content: ""
}


const setupFormReducer = (state:T_SETUP_FORM_STATE=initialState, actions:T_SETUP_FORM_ACTIONS) => {
    switch(actions.type){
        case "UPDATE_SETUP_FORM_ACTION":
            return {
                ...state,
                [actions.payload.key]: actions.payload.value
            }
        case "SET_SETUP_FORM_ACTION":
            return actions.payload
        default:
            return state
    }
}


export default setupFormReducer