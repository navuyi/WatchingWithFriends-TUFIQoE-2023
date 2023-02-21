/**
 * This function simulates right mouse button click on given element.
 * It should open YT player's context menu
 * @param {HTMLElement} movie_player
 */
export const open_player_context_menu = (movie_player) : void =>{
    const element = movie_player;
    const e = element.ownerDocument.createEvent('MouseEvents');
    e.initMouseEvent('contextmenu', true, true,
        element.ownerDocument.defaultView, 1, 0, 0, 0, 0, false,
        false, false, false, 2, null);
    console.log("Opening player context menu")
    !element.dispatchEvent(e);
}