import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { T_EXPERIMENT_SETUP_ACTIONS } from "../../redux/actions/experimentSetupActions"
import { useSelector } from "react-redux"
import { T_APP_STATE } from "../../redux/reducers"


export const useConfigSeeding = () => {
    const dispatch = useDispatch<Dispatch<T_EXPERIMENT_SETUP_ACTIONS>>()
    const {mirroring} = useSelector((state:T_APP_STATE) => state.experimentSetup)

    const handleChange = (checked: boolean) => {
        dispatch({type:"SET_EXPERIMENT_SETUP", key: "mirroring", payload: checked})
    }

    return {
        mirroring,
        handleChange
    }
}   