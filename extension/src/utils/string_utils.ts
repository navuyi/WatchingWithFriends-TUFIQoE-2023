
/**
 * Function removes whitespaces from provided string
 * @param {string} text 
 * @returns {string}
*/
export const remove_whitespaces = (text) => {
    return text.replaceAll(/\s/g,'')
}