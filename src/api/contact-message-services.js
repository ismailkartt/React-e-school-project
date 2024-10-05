import axios from "axios"
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseUrl = config.api.baseUrl;

export const createMessage = async (payload) => {
    const resp = await axios.post(`${baseUrl}/contactMessages/save`, payload)
    const data = await resp.data;
    return data;
}

export const getContactMessageByPage = async (page=0, size=10, sort="name",type="ASC") => {
    const resp = await axios.get(`${baseUrl}/contactMessages/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {headers:getAuthHeader()}
    )
    const data = await resp.data;
    return data;
}

