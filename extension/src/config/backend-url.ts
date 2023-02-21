
type T_BACKEND_URLS = {
    mouse_event: string,
    keyboard_event: string
}

export const BASE_URL : string = "http://127.0.0.1:5000"
export const BACKEND_URLS : T_BACKEND_URLS = {
    mouse_event: `${BASE_URL}/mouse_event/`,
    keyboard_event: `${BASE_URL}/keyboard_event/`
}