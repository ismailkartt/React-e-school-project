import { getFromLocalStorage } from "../helpers/functions/encrypted-store"

export const getAuthHeader = () => {
    const token = getFromLocalStorage("token");
    let header = {};
    if(token){
        header = {
            Authorization: token
        }
    }
    return header;
}