import React from "react";
import { validate_setup_form } from "../../../utils/validation/validate_setup_form";
import { useExperimentStart } from "../hooks/useExperimentStart";
import Button from "./Button/Button";
import { CircularProgress } from "@mui/material";

type T_PROPS = {
    title: string
}

const ExperimentStartButton = (props:T_PROPS) => {
    const {start_experiment, experimentStarting} = useExperimentStart()

    const handleStart = async () => {
        const formValid = await validate_setup_form()
        
        if(formValid === false){
            window.alert("Experiment setup form is incorrect")
            return
        }

        await start_experiment()
    }

    return(
        <>
            {
                experimentStarting ? <CircularProgress variant="indeterminate" thickness={5} size={50}/> : 
                <Button 
                    text={props.title}
                    handleClick={() => {handleStart()}}
                />
            }
        </>
        
    )
}



export default ExperimentStartButton