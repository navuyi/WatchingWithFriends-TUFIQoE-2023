import React, { useEffect, useLayoutEffect } from "react";
import Input from "../Input/Input";
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage";
import { useSelector } from "react-redux";
import { T_APP_STATE } from "../../redux/reducers";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { T_SETUP_FORM_ACTIONS } from "../../redux/actions/setupFormActions";

const SubjectAgeInput = () => {
    const subject_age = useSelector((state:T_APP_STATE) => state.setupForm.subject_age)
    const dispatch = useDispatch<Dispatch<T_SETUP_FORM_ACTIONS>>()

    useLayoutEffect(() => {
        init()
    }, [])

    const init = async () : Promise<void> => {
        const {subject_age} = await ChromeStorage.get_experiment_settings()
        dispatch({
            type: "UPDATE_SETUP_FORM_ACTION",
            payload: {
                key: "subject_age",
                value: subject_age
            }
        })
    }

    const handleChange = async (value:string) => {
        const new_value = Number(value) 
        if(isNaN(new_value) === true){
            return
        }

        await ChromeStorage.update_experiment_settings_property("subject_age", new_value)
        dispatch({
            type: "UPDATE_SETUP_FORM_ACTION",
            payload: {
                key: "subject_age",
                value: new_value
            }
        })
    }

    return(
        <>
            <Input 
                label="Subject Age"
                value={subject_age}
                handleChange={handleChange}
            />
        </>
    )
}


export default SubjectAgeInput