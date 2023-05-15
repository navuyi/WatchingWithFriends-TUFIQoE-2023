import React, { ChangeEvent, useEffect, useState } from "react";
import { T_EXPERIMENT_SETTINGS } from "../../../../../config/storage.config";
import style from "./style.module.scss"
import { valid } from "joi";
import { ChromeStorage } from "../../../../../utils/custom/ChromeStorage";



type T_PROPS = {
    id: keyof T_EXPERIMENT_SETTINGS
    label?: string
    options: Array<{label:string, value:string|number|boolean}>
    style?: Object
}

const Select = (props:T_PROPS) => {
    const [value, setValue] = useState<any>("")
   
    const handleChange = async (e:ChangeEvent<HTMLSelectElement>) => {
        const _value = e.currentTarget.value
        setValue(_value)
        await ChromeStorage.update_experiment_settings_property(props.id, _value)
    }

    useEffect(() => {
        const init = async () => {
            const settings = await ChromeStorage.get_experiment_settings()
            setValue(settings[props.id])
        }
        init()
    }, [])

    return(
        <div className={style.select_container} style={props.style}>
            <span className={style.label}>{props.label}</span>
            <select className={style.select} onChange={handleChange} value={value}>
                <option disabled value="" >...</option>
                {
                    props.options.map((option,index) => {
                        return <option key={index} value={option.value.toString()}>{option.label}</option>
                    })
                }
            </select>
        </div>
    )
}


export default Select