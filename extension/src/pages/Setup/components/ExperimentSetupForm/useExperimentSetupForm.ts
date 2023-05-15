import { useSelector } from "react-redux"
import { T_APP_STATE } from "../../redux/reducers"





export const useExperimentSetupForm = () => {
    const {subject_id} = useSelector((state:T_APP_STATE) => state.experimentSetup)

    const handleSubjectIDChange = () => {

    }

    const handleDeviceIDChange = () => {

    }

    const handleSessionTypeChange = () => {

    }


    return {
        handleSubjectIDChange,
        handleDeviceIDChange,
        handleSessionTypeChange,
        subject_id
    }
}