import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseUrl = config.api.baseUrl;

export const getTeachersByPage = async (page=0, size=20, sort="name",type="ASC")=>{
    const resp = await axios.get(`${baseUrl}/teachers/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {headers:getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const createTeacher = async (payload) => {
    const resp = await axios.post(`${baseUrl}/teachers/save`,payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
} 

export const getAllTeachers = async () => {
    const resp = await axios.get(`${baseUrl}/teachers/getAll`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
} 

export const getTeacherById = async (id) => {
    const resp = await axios.get(`${baseUrl}/teachers/getSavedTeacherById/${id}`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
} 

export const deleteTeacher = async (id) => {
    const resp = await axios.delete(`${baseUrl}/teachers/delete/${id}`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const updateTeacher = async (id, payload) => {
    const resp = await axios.put(`${baseUrl}/teachers/update/${id}`, payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const chooseLesson = async (payload) => {
    const resp = await axios.post(`${baseUrl}/teachers/chooseLesson`, payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}