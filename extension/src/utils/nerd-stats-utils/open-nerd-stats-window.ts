/**
 * This function simulates click in context menu.
 * It results in opening nerd statistics window.
 */
export const open_nerd_stats_window = async () : Promise<void> => {
    return new Promise(resolve => {
        const retry_interval = setInterval(() => {
            const ytp_popup : Element | null = document.getElementsByClassName("ytp-popup ytp-contextmenu").item(0);
            if(ytp_popup != null){
                const ytp_panel = ytp_popup.children.item(0);
                if(ytp_panel != null){
                    const ytp_panel_menu = ytp_panel.children.item(0);
                    if(ytp_panel_menu != null){
                        const menu_list = ytp_panel_menu.children;
                        const nerd_stats_button = menu_list.item(menu_list.length - 1) as HTMLElement | null;
                        if(nerd_stats_button != null){
                            clearInterval(retry_interval)
                            console.log("Enabling nerd statistics window")
                            nerd_stats_button.click()
                            resolve()
                        }
                    }
                }
            }
            else{
                // retry
            }
        }, 10)
    })
}