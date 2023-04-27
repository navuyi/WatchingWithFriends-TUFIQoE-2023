import React from "react";
import style from "./style.module.scss"
import Header from "../../components/Header/Header";
import ConfigurationStatus from "../../components/ConfigurationStatus/ConfigurationStatus";
import ConfigurationEraseButton from "../../components/ConfigurationEraseButton";
import { useSelector } from "react-redux";
import { T_APP_STATE } from "../../redux/reducers";


const Configuration = () => {
    const setup = useSelector((state:T_APP_STATE) => state.experimentSetupReducer)

    return(
        <div className={style.configuration}>
            <div className={style.container}>
                <div className={style.wrapper}>
                    <Header>WatchingWithFriends Experiment</Header>
                    <Header style={{fontSize: 20, opacity: 0.8}}>{"Bitrate <-> VMAF mapping"}</Header>
                </div>
                <div className={style.wrapper}>
                    <ConfigurationStatus />
                    {
                        setup.experiment_available ? <ConfigurationEraseButton /> : null
                    }
                </div>
                
            </div>
            
        </div>
    )
}


export default Configuration