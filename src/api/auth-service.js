import axios from "axios";
import { config } from "../helpers/config"
import { getAuthHeader } from "./auth-header";

const baseUrl = config.api.baseUrl;

export const login = async (payload) => {
    const resp = await axios.post(`${baseUrl}/auth/login`, payload)
    const data = await resp.data;
    return data;
}

export const getUser = async () => { 
    const resp = await axios.get(`${baseUrl}/user/me`, {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}