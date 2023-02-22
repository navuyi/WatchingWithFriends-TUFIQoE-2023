import React from "react";
import Button from "./Button/Button";
import { useNavigate } from "react-router";

type T_PROPS = {
    text: string
    to: string
}

const NavButton = (props : T_PROPS) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(props.to)
    }

    return(
        <Button handleClick={handleClick} text={props.text} 
            style={{backgroundColor: "#00A896"}}
        />
    )
}

export default NavButton