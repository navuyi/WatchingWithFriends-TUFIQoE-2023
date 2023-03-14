import React from "react";
import { ChromeStorage } from "../../../utils/custom/ChromeStorage";
import { useExperimentStart } from "../hooks/useExperimentStart";
import Button from "./Button/Button";

type T_PROPS = {
    title: string
}

const ExperimentStartButton = (props:T_PROPS) => {
    const {validate_setup_form, start_immediately} = useExperimentStart()

    const handleStart = async () => {
        const formValid = await validate_setup_form()
        
        if(formValid === false){
            window.alert("Experiment setup form is incorrect")
            return
        }

        const settings = await ChromeStorage.get_experiment_settings()
        console.log(settings)

        await start_immediately()
    }

    return(
        <Button 
            text={props.title}
            handleClick={() => {handleStart()}}

            style={{
                marginTop: "5em"
            }}
        />
    )
}



export default ExperimentStartButton