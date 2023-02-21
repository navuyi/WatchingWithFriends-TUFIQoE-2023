import React from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";
import {STORAGE_KEYS} from "../../../storage/chrome-storage";
import '../Styles/SubjectID.scss';
import {remove_whitespaces} from "../../../utils/string_utils"
import { useEffect } from "react";



const SubjectID = (props) => {
    const [subjectId, setSubjectId] = useState("")

    useEffect(() => {
        const init = async () => {
            const subject_id = (await chrome.storage.local.get([STORAGE_KEYS.SUBJECT_ID]))[STORAGE_KEYS.SUBJECT_ID]
            setSubjectId(subject_id)
        }


        init()
    }, [])


    const handleChange = async (e) => {
        const txt = remove_whitespaces(e.target.value)
        setSubjectId(txt)
        await chrome.storage.local.set({
            [STORAGE_KEYS.SUBJECT_ID]: txt
        })
    }

    return(
        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
            <h3>Subject ID</h3>
            <input 
                value={subjectId}
                onChange={handleChange}
            />
        </div>
    )
}


export default SubjectID