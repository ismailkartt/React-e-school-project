import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseUrl = config.api.baseUrl;

export const getLessonProgramsByPage = async (page=0, size=20, sort="day",type="ASC")=>{
    const resp = await axios.get(`${baseUrl}/lessonPrograms/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {headers:getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const getUnassignedPrograms = async () => {
    const resp = await axios.get(`${baseUrl}/lessonPrograms/getAllUnassigned`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const getAllLessonPrograms = async () => {
    const resp = await axios.get(`${baseUrl}/lessonPrograms/getAll`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const getAllUnassignedLessonPrograms = async () => {
    const resp = await axios.get(`${baseUrl}/lessonPrograms/getAllUnassigned`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const getAllLessonProgramsByTeacher = async () => {
    const resp = await axios.get(`${baseUrl}/lessonPrograms/getAllLessonProgramByTeacher`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const getAllLessonProgramsByStudent = async () => { 
    const resp = await axios.get(`${baseUrl}/lessonPrograms/getAllLessonProgramByStudent`, {
      headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
   }

export const createLessonProgram = async (payload) => {
    const resp = await axios.post(`${baseUrl}/lessonPrograms/save`,payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
} 

export const deleteLessonProgram = async (id) => {
    const resp = await axios.delete(`${baseUrl}/lessonPrograms/delete/${id}`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

 