import { combineReducers } from "redux";
import configReducer from "./configReducer";
import setupFormReducer from "./setupFormReducer";

const rootReducer = combineReducers({
    config: configReducer,
    setupForm: setupFormReducer
})


export type T_APP_STATE = ReturnType<typeof rootReducer>
export default rootReducer