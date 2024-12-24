import axios from "axios";
import { Projects } from "../interfaces/projects";
import BASE_URL from "./base";

export async function getAllProjects(page: number, limit: number): Promise<Projects | null> {

    const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}api/projects?page=${page}&limit=${limit}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const priceData: Projects = response.data;
    return priceData;
  } catch (error) {
    console.error('Error during request:', error);
    return null;
  }
  } 
}