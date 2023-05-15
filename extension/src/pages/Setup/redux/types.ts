
interface I_EXPERIMENMT_SETUP {
    seeding: boolean
    subject_id: string
    urls: string[]
    experiment_available: boolean
    mapping_available: boolean
}
interface I_INDEX_SIGNATURE {
    [key: string]: any // <-- index signature
}




export type T_EXPERIMENT_SETUP = I_EXPERIMENMT_SETUP | I_INDEX_SIGNATURE