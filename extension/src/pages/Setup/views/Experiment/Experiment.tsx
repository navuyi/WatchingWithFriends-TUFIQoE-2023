import React from "react";
import style from "./style.module.scss"
import Header from "../../components/Header/Header";
import ConfigurationStatus from "../../components/ConfigurationStatus/ConfigurationStatus";
import ConfigurationEraseButton from "../../components/ConfigurationEraseButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useEffect } from "react";
import { validateExperimentConfig } from "../../../../utils/validation/validate-experiment-config";
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage";
import { T_APP_STATE } from "../../redux/reducers";
import { T_EXPERIMENT_SETUP_ACTIONS } from "../../redux/actions/experimentSetupActions";
import Dropzone from "../../components/Dropzone/Dropzone";
import ExperimentSetupForm from "../../components/ExperimentSetupForm/ExperimentSetupForm";
import SubjectDataForm from "../../components/SubjectDataForm/SubjectDataForm";
import ExperimentStartButton from "../../components/ExperimentStartButton";
import { validateExperimentStartAvailable } from "../../../../utils/validation/validate-experiment-start-available";
import { useState } from "react";


const Experiment = () => {
    const experimentSetup = useSelector((state:T_APP_STATE) => state.experimentSetup)
    const startupForm = useSelector((state:T_APP_STATE) => state.startupForm)
    const dispatch = useDispatch<Dispatch<T_EXPERIMENT_SETUP_ACTIONS>>() 

    const [startAvailable, setStartAvailable] = useState(false)

    useEffect(() => {
        const init = async () => {
            const settings = await ChromeStorage.get_experiment_settings()
            const valid = validateExperimentConfig(settings.videos)
            dispatch({type:"SET_EXPERIMENT_SETUP", key: "experiment_available", payload: valid})
        }

        init()
    }, [])

    useEffect(() => {
        const valid = validateExperimentStartAvailable(startupForm)
        console.log(valid)
        setStartAvailable(valid)
    }, [startupForm])

    return(
        <div className={style.experiment}>
            <div className={style.container}>
                <div className={style.wrapper}>
                        <Header>WatchingWithFriends Experiment</Header>
                        <Header style={{fontSize: 20, opacity: 0.8}}>{"Experiment setup"}</Header>
                    </div>
                    <div className={style.wrapper}>
                        <ConfigurationStatus />
                        {
                            experimentSetup.experiment_available ? <ConfigurationEraseButton /> : <Dropzone />
                        }
                    </div>
                    <div className={style.wrapper}>
                       <ExperimentSetupForm />
                       {
                        startupForm.session_type === "alone" ? <SubjectDataForm /> : null
                       }
                    </div>
                    <div className={style.wrapper}>
                        {
                            startupForm.session_type !== "" && startAvailable ? <ExperimentStartButton /> : null
                        }
                    </div>
            </div>
        </div>
    )
}


export default Experiment