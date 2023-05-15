import { T_EXPERIMENT_SETUP_ACTIONS } from "../actions/experimentSetupActions";
import { T_EXPERIMENT_SETUP } from "../types";

const initialState: T_EXPERIMENT_SETUP = {
    seeding: false,
    subject_id: "",
    device_id: "",
    
    urls: [],
    experiment_available: false,
    mapping_available: false
}


const experimentSetupReducer = (state:T_EXPERIMENT_SETUP = initialState, action: T_EXPERIMENT_SETUP_ACTIONS) => {
    switch(action.type){
        case 'SET_EXPERIMENT_SETUP':
            const tmp = {...state}
            tmp[action.key] = action.payload
            return tmp
        default:
            return state
    }
}

export default experimentSetupReducer