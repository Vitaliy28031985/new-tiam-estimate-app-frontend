import axios, { AxiosError } from "axios";
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

export async function updateAdvance(data: Advance) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'patch',
      url: `${BASE_URL}api/advances/${data.projectId}/${data.id}`,
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
  }  catch (error: unknown) {
        if (error instanceof AxiosError) {
            return error.response;
          } else {
            console.log("Unknown error", error);
          }
        }
      }   
}

export async function deleteAdvance(data: Advance) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'delete',
      url: `${BASE_URL}api/advances/${data.projectId}/${data.id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
   return response;
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}