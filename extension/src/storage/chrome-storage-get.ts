


export const chrome_storage_get_single = async (key : string) : Promise <any> => {
    const res = await chrome.storage.local.get([key])
    return res[key]
}

export const chrome_storage_get_multiple = async (...keys : Array<string>) : Promise <object> => {
    return await chrome.storage.local.get([...keys])
}


