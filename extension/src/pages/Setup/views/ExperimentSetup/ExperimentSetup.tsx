import React from "react";
import style from "./style.module.scss"
import Select from "../../components/Select/Select";
import SubjectAgeInput from "../../components/SubjectDataInputs/SubjectAgeInput";

const ExperimentSetup = () => {
    return(
        <div className={style.experiment_setup}>
            <div className={style.container}>
                <span className={style.header}>WatchingWithFriends Experiment</span>
                <span className={style.sub_header}>WatchingWithFriends Experiment</span>

                <div className={style.wrapper}>
                    <Select 
                        label="Device ID"
                        key="device_id"
                        options={[{label: "106", value: 106}, {label: "107", value: 107}]}
                    />
                    <div className={style.wrapper_row}>
                        <SubjectAgeInput />
                        <Select 
                            label="Session type"
                            key="session_type"
                            options={[{label: "alone", value: "alone"}, {label: "together", value: "together"}]}
                            style={{width: "40%"}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExperimentSetup