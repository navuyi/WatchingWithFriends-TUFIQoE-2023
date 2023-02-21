export type T_CHROME_STORAGE = {
    video_index: number,
    subject_id: number | string,
    assessment_initialized: boolean,
    throttling_initialized: boolean,
    next_assessment_datetime: object | null,
    assessment_interval_seconds: number
}

export type T_STORAGE_KEYS = {
    VIDEO_INDEX: "video_index",
    SUBJECT_ID: "subject_id",
    ASSESSMENT_INITIALIZED: "assessment_initialized",
    THROTTLING_INITIALIZED: "throttling_initialized",
    NEXT_ASSESSMENT_DATETIME: "next_assessment_datetime",
    ASSESSMENT_INTERVAL_SECONDS: "assessment_interval_seconds"
}