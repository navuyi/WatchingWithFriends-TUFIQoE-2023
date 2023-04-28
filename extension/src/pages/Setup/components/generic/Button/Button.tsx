import React from "react";
import style from "./style.module.scss"


type T_PROPS = {
    text: string,
    style? : object,
    attributes?: {
        disabled?: boolean
    },
    handleClick: Function,
    disabled?: boolean
}

const Button = (props : T_PROPS) => {
    
    return(
        <>
            <button disabled={props.disabled} onClick={(e) => {props.handleClick()}} className={style.button} style={props.style} {...props.attributes}>{props.text}</button>
        </>
    )
}

export default Button