import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseUrl = config.api.baseUrl;

export const getAllAdvisorTeachers = async () => {
    const resp = await axios.get(`${baseUrl}/advisorTeacher/getAll`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
} 
