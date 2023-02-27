import React from "react";
import Input from "../Input/Input";
import { useState } from "react";
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage";


const SubjectAgeInput = () => {
    const [value, setValue] = useState<"" | number>("")

    const handleChange = async (value:string) => {
        const new_value = Number(value) 
        if(isNaN(new_value) === true){
            return
        }

        //TODO add regex for XXX - three digit number

        setValue(new_value)
        await ChromeStorage.update_experiment_settings_property("subject_age", new_value)
    }

    return(
        <>
            <Input 
                label="Subject Age"
                value={value}
                handleChange={handleChange}
            />
        </>
    )
}


export default SubjectAgeInput