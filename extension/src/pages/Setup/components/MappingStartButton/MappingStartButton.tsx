import React from "react";
import { useSelector } from "react-redux";
import { T_APP_STATE } from "../../redux/reducers";
import Button from "../common/Button/Button";
import { useMappingStartButton } from "./useMappingStartButton";
import { remove_whitespaces } from "../../../../utils/string_utils";

type T_PROPS = {
    
}

const MappingStartButton = (props : T_PROPS) => {
    const {mapping_available, experiment_available, subject_id, seeding} = useSelector((state:T_APP_STATE) => state.experimentSetup)
    const {handleMappingStart} = useMappingStartButton()
    

    return(
        <Button
            text="Start mapping"
            style={{
                backgroundColor: "#02C39A"
            }}
            attributes={{disabled: !mapping_available || (seeding && remove_whitespaces(subject_id)==="") || experiment_available}}
            handleClick={() => handleMappingStart()}
        />
    )
}

export default MappingStartButton