import React from "react";
import { T_EXPERIMENT_SETTINGS } from "../../../../../config/storage.config";
import style from "./style.module.scss"



type T_PROPS = {
    id: keyof T_EXPERIMENT_SETTINGS
    label: string
    options: Array<{label:string, value:string|number|boolean}>
    style?: Object
}

const Select = (props:T_PROPS) => {
   
    return(
        <div className={style.select_container} style={props.style}>
            <span className={style.label}>{props.label}</span>
            <select className={style.select} onChange={(e) => {}} value={""}>
            <option disabled value="">...</option>
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