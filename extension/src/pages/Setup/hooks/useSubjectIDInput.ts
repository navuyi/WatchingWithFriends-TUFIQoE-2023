import { useEffect } from "react"
import { useSelector } from "react-redux"
import { T_APP_STATE } from "../redux/reducers"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { T_EXPERIMENT_SETUP_ACTIONS } from "../redux/actions/experimentSetupActions"
import { ChromeStorage } from "../../../utils/custom/ChromeStorage"
import { remove_whitespaces } from "../../../utils/string_utils"




export const useSubjectIDInput = () => {
    const setup = useSelector((state:T_APP_STATE) => state.experimentSetup)
    const dispatch = useDispatch<Dispatch<T_EXPERIMENT_SETUP_ACTIONS>>()

    useEffect(() => {
        const init = async () => {
            const settings = await ChromeStorage.get_experiment_settings()
            dispatch({type:"SET_EXPERIMENT_SETUP", key:"subject_id", payload: settings.subject_id})
        }
        init()
    }, [])


    const handleChange = async (value:string) => {
        const id = remove_whitespaces(value)
        dispatch({type:"SET_EXPERIMENT_SETUP", key:"subject_id", payload: id})
        await ChromeStorage.update_experiment_settings_property("subject_id", id)
    }


    return {
        subject_id: setup.subject_id,
        handleChange
    }
}