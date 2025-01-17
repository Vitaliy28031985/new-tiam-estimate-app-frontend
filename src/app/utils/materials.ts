import axios, { AxiosError } from "axios";
import BASE_URL from "./base";
import { Material } from "../interfaces/projects";


export async function addMaterial(data: Material) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}api/materials/${data.projectId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
          title: data.title,
          order: data.order,
          date: data.date,
          sum: data.sum
        }
    });
   return response.data;
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
          return error.response;
        } else {
          console.log("Unknown error", error);
        }
      }
  } 
}


export async function updateMaterial(data: Material) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'patch',
      url: `${BASE_URL}api/materials/${data.projectId}/${data.id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
            title: data.title,
            order: data.order,
            date: data.date,
            sum: data.sum
        }
    });
   return response.data;
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
          return error.response;
        } else {
          console.log("Unknown error", error);
        }
      }
    }  
}

export async function deleteMaterial(data: Material) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'delete',
      url: `${BASE_URL}api/materials/${data.projectId}/${data.id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
   return response;
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
          return error.response;
        } else {
          console.log("Unknown error", error);
        }
      }
  } 
}
