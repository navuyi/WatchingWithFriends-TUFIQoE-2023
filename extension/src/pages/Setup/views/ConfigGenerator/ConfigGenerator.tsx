import React from "react";
import style from "./style.module.scss"
import { useSelector } from "react-redux";
import { T_APP_STATE } from "../../redux/reducers";
import Dropzone from "../../components/Dropzone/Dropzone";
import ConfigDetected from "../../components/ConfigDetected/ConfigDetected";
import NavButton from "../../components/NavButton";
import MappingStartButton from "../../components/MappingStartButton";

const ConfigGenerator = () => {
    const {experiment_applicable, mapping_applicable, value:config} = useSelector((state:T_APP_STATE) => state.config)

    return(
        <div className={style.config_generator}>
            <div className={style.container}>
                <span className={style.header}>WatchingWithFriends Experiment</span>
                <span className={style.sub_header}>{"Bitrate <-> VMAF mapping and config generation"}</span>

                
                    <div className={style.inner_container}>
                        {
                            config === null ? 
                            <>
                                <span className={style.sub_header}>Provide initial config file in order to proceed with bitrate to VMAF mapping.</span>
                                <span className={style.sub_header}>Complete configuration file will be generated as a result.</span>

                                <Dropzone />
                            </> : 
                            <>
                                <ConfigDetected />
                            </>
                        }
                    </div>
                
                <div className={style.action_buttons_container}>
                    <NavButton to="/" text="Return"/>
                    <MappingStartButton />
                </div>
            </div>
        </div>
    )
}

export default ConfigGenerator