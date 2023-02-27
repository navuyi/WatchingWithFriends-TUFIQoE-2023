import React, { ReactElement, useLayoutEffect } from "react";
import { T_EXPERIMENT_SETTINGS } from "../../../../config/storage.config";
import style from "./style.module.scss"
import { useSelect } from "./useSelect";

type T_PROPS = {
    key: keyof T_EXPERIMENT_SETTINGS
    label: string
    options: Array<{label:string, value:string|number|boolean}>
    style?: Object
}

/**
 * Experiment settings generic Select element
 * Automatically updates ChromeStorage
 * @param props - props to the Select
 * @returns {ReactElement}
*/
const Select = (props:T_PROPS) => {
    const {value, handleChange, init} = useSelect(props.key)

    useLayoutEffect(() => {
        // Init state value with settings saved in ChromeStorage
        init()
    }, [])

    return(
        <div className={style.select_container} style={props.style}>
            <span className={style.label}>{props.label}</span>
            <select className={style.select} onChange={(e) => handleChange(e.currentTarget.value)} value={value}>
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