import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage";
import { T_SETUP_FORM_ACTIONS } from "../../redux/actions/setupFormActions";
import { T_APP_STATE } from "../../redux/reducers";
import Input from "../Input/Input";



const SubjectIDInput = () => {
    const subject_id = useSelector((state:T_APP_STATE) => state.setupForm.subject_id)
    const dispatch = useDispatch<Dispatch<T_SETUP_FORM_ACTIONS>>()

    useLayoutEffect(() => {
        init()
    }, [])

    const init = async () : Promise<void> => {
        const {subject_id:id} = await ChromeStorage.get_experiment_settings()
        dispatch({
            type: "UPDATE_SETUP_FORM_ACTION",
            payload: {
                key: "subject_id",
                value: id
            }
        })
    }

    const handleChange = async (value : string) : Promise<void> => {
        if(isNaN(Number(value)) === true){
            return
        }

        // Allow only XXX - where X is a digit 
        if((/^$|^[0-9]{1,3}$/gm).test(value) === false){
            return
        }
        
        await ChromeStorage.update_experiment_settings_property("subject_id", Number(value))
        dispatch({
            type: "UPDATE_SETUP_FORM_ACTION",
            payload: {
                key: "subject_id",
                value: Number(value)
            }
        })
    }


    return(
        <Input 
                label="Subject ID"
                value={subject_id}
                handleChange={handleChange}
        />
    )
}



export default SubjectIDInput