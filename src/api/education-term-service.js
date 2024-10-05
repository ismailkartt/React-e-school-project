import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseUrl = config.api.baseUrl;

export const getEducationTermsByPage = async (page=0, size=20, sort="startDate",type="ASC")=>{
    const resp = await axios.get(`${baseUrl}/educationTerms/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {headers:getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const createEducationTerm = async (payload) => {
    const resp = await axios.post(`${baseUrl}/educationTerms`,payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
} 

export const getAllEducationTerm = async () => {
    const resp = await axios.get(`${baseUrl}/educationTerms/getAll`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
} 

export const deleteEducationTerm = async (id) => {
    const resp = await axios.delete(`${baseUrl}/educationTerms/${id}`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

