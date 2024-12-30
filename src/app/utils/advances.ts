import axios from "axios";
import { Advance } from "../interfaces/projects";
import BASE_URL from "./base";


export async function addAdvance(data: Advance) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}api/advances/${data.projectId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
          comment: data.comment,
          date: data.date,
          sum: data.sum
        }
    });
   return response.data;
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}