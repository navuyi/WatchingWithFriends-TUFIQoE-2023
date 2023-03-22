import React, { useLayoutEffect, useState } from "react";
import style from "./style.module.scss"

import Button from "../Button/Button";
import ExperimentStartButton from "../ExperimentStartButton";
import { useScheduler } from "./useScheduler";
import { CircularProgress } from "@mui/material";





const Scheduler = () => {
    const {handle_time_change, handle_schedule, init, time, progress, scheduled} = useScheduler()

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
                <Button text="Schedule auto-start" handleClick={handle_schedule} />
                <ExperimentStartButton title="Start immediately" />
            </div>
            
        </div>
    )
}




export default Scheduler