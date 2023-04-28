import React from "react";
import { useSelector } from "react-redux";
import { T_APP_STATE } from "../../redux/reducers";
import Button from "../generic/Button/Button";
import { useMappingStartButton } from "./useMappingStartButton";

type T_PROPS = {
    
}

const MappingStartButton = (props : T_PROPS) => {
    const {mapping_available, experiment_available} = useSelector((state:T_APP_STATE) => state.experimentSetup)
    const {handleMappingStart} = useMappingStartButton()
    

    return(
        <Button
            text="Start mapping"
            style={{
                backgroundColor: "#02C39A"
            }}
            attributes={{disabled: !mapping_available}}
            handleClick={() => handleMappingStart()}
        />
    )
}

export default MappingStartButton