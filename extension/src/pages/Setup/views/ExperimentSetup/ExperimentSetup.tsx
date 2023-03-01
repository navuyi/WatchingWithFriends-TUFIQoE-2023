import React, { useEffect } from "react";
import style from "./style.module.scss"
import Select from "../../components/Select/Select";
import SubjectAgeInput from "../../components/SubjectDataInputs/SubjectAgeInput";
import SubjectIDInput from "../../components/SubjectDataInputs/SubjectIDInput";
import { useSelector } from "react-redux";
import { T_APP_STATE } from "../../redux/reducers";
import ConfigDetected from "../../components/ConfigDetected/ConfigDetected";
import Dropzone from "../../components/Dropzone/Dropzone";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { T_SETUP_FORM_ACTIONS } from "../../redux/actions/setupFormActions";
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage";

const ExperimentSetup = () => {
    const session_type = useSelector((state: T_APP_STATE) => state.setupForm.session_type)
    const {experiment_applicable, value:config} = useSelector((state:T_APP_STATE) => state.config)

    const dispatch = useDispatch<Dispatch<T_SETUP_FORM_ACTIONS>>()

    useEffect(() => {
        if(session_type === "together"){
            const update = async () : Promise<void> => {
                const settings = await ChromeStorage.get_experiment_settings()
                settings.subject_age = ""
                settings.subject_netflix_familiarity = ""
                settings.subject_sex = ""
                settings.subject_selected_content = ""

                await ChromeStorage.set_experiment_settings(settings)
            }
            update()
        } 
    }, [session_type])


    return(
        <div className={style.experiment_setup}>
            <div className={style.container}>
                <span className={style.header}>WatchingWithFriends Experiment</span>
                <span className={style.sub_header}>Experiment Setup</span>

                <div className={style.wrapper}>
                    <Select 
                        label="Device ID"
                        id="device_id"
                        options={[{label: "106", value: 106}, {label: "107", value: 107}]}
                    />
                    <div className={style.wrapper_row}>
                        <SubjectIDInput />
                        <Select 
                            label="Session type"
                            id="session_type"
                            options={[{label: "alone", value: "alone"}, {label: "together", value: "together"}]}
                            style={{width: "40%"}}
                        />
                    </div>

                    { 
                    session_type === "alone" ? 
                        <div className={style.wrapper}>
                            <SubjectAgeInput />
                            <Select 
                                label="Subject sex"
                                id="subject_sex"
                                options={[{label: "Male", value: "male"}, {label: "Female", value: "female"}, {label: "Prefer not to disclose", value: "undisclosed"}]}
                                style={{marginTop: "1em"}}
                            />
                            <Select 
                                label="Netflix familiarity"
                                id="subject_netflix_familiarity"
                                options={[{label: "Familiar", value: true}, {label: "Unfamiliar", value: false}]}
                                style={{marginTop: "1em"}}
                            />
                            <Select 
                                label="Who selected content"
                                id="subject_selected_content"
                                options={[{label: "Subject", value: true}, {label: "Administrator", value: "false"}]}
                                style={{marginTop: "1em"}}
                            />
                        </div> : null
                    }
                    <div className={style.wrapper}>
                        {
                            config != null ? <ConfigDetected /> : <Dropzone />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExperimentSetup