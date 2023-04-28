import { combineReducers } from "redux";
import experimentSetupReducer from "./experimentSetupReducer";

const rootReducer = combineReducers({
    experimentSetup: experimentSetupReducer
})


export type T_APP_STATE = ReturnType<typeof rootReducer>
export default rootReducer