import {DEFAULT_SUBJECT_ID} from "../config/config";
import {T_STORAGE_KEYS} from "./chrome-storage.type";
import {T_CHROME_STORAGE} from "./chrome-storage.type";




export const STORAGE_KEYS : T_STORAGE_KEYS= {
    VIDEO_INDEX: "video_index",
    SUBJECT_ID: "subject_id",
    ASSESSMENT_INITIALIZED: "assessment_initialized",
    THROTTLING_INITIALIZED: "throttling_initialized",
    NEXT_ASSESSMENT_DATETIME: "next_assessment_datetime",
    ASSESSMENT_INTERVAL_SECONDS: "assessment_interval_seconds",
}

export const STORAGE_DEFAULT: T_CHROME_STORAGE = {
    video_index: 0,
    subject_id: DEFAULT_SUBJECT_ID,
    assessment_initialized: false,
    throttling_initialized: false,
    next_assessment_datetime: null,
    assessment_interval_seconds: 10
}
