import React, { useLayoutEffect, useState } from "react";
import style from "./style.module.scss"

import Button from "../common/Button/Button";
import ExperimentStartButton from "../ExperimentStartButton";
import { useScheduleExperiment} from "../../hooks/useScheduleExperiment";
import { CircularProgress } from "@mui/material";





const Scheduler = () => {
    const {handle_time_change, handle_schedule, init, time, progress, scheduled} = useScheduleExperiment()

    useLayoutEffect(() => {
        init()
    }, [])

    return(
        <div className={style.scheduler}>
            {
                scheduled ? 
                <div className={style.shutter}>
                    <div className={style.shutter_inner}>
                        <CircularProgress value={progress} variant={"determinate"} size={60}/>
                    </div>
                </div> : null
            }
            <span className={style.header}>Schedule auto-start</span>
            <input className={style.input} type="time" onChange={handle_time_change} value={`${time.hours}:${time.minutes}`}/>

            <div className={style.wrapper}>
                <Button text="Schedule auto-start" handleClick={handle_schedule} style={{backgroundColor: "#00A896"}}/>
                <ExperimentStartButton />
            </div>
            
        </div>
    )
}




export default Scheduler