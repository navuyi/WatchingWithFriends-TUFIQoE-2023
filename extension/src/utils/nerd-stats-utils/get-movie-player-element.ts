/**
 * This function returns HTML element with ID of "movie_player".
 * This function does not return until movie_player if found. <-- IMPORTANT
 * @returns {HTMLElement}
*/
export const get_movie_player_element = async () : Promise<HTMLElement> => {
    return new Promise(resolve => {
        const retry_interval = setInterval(() => {
            const movie_player = document.getElementById("movie_player")
            if(movie_player){
                console.log("Found movie_player element. Resolving...")
                clearInterval(retry_interval)
                resolve(movie_player)
            }
            else{
                console.log("movie_element not found. Retrying...")
            }
        }, 10)
    })
}