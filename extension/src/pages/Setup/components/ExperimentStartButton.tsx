import React, { useEffect, useLayoutEffect, useState } from "react";
import { ChromeStorage } from "../../../utils/custom/ChromeStorage";
import { post_new_experiment } from "../../../utils/http_requests/post_new_experiment";
import { post_new_video } from "../../../utils/http_requests/post_new_video";
import { get_local_datetime } from "../../../utils/time_utils";
import Button from "./common/Button/Button";
import { useExperimentStart } from "../hooks/useExperimentStart";

const ExperimentStartButton = () => {

    const {start_experiment} = useExperimentStart()

    return(
        <Button 
            text="Run extension in experiment mode"
           
            //attributes={{disabled: !setup.experimentAvailable || !subjectID}}
            handleClick={start_experiment}
        />
    )
}

export default ExperimentStartButton