import axios from "axios";
import { config } from "../helpers/config"
import { getAuthHeader } from "./auth-header";

const baseUrl = config.api.baseUrl  ;

export const deleteAdmin = async (id) => {
    const resp = await axios.delete(`${baseUrl}/admin/delete/${id}`)
    const data = await resp.data;
    return data;
}

export const getAdminsByPage = async (page=0, size=20, sort="name", type="ASC") => {
    const resp = await axios.get(`${baseUrl}/admin/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {headers: getAuthHeader()}
    )
    const data = await resp.data;
    return data;
} 

export const createAdmin = async (payload) => { 
    const resp = await axios.post(`${baseUrl}/admin/save`, payload,
        {headers: getAuthHeader()})
   const data = await resp.data;
   return data;
 }