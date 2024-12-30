import axios from "axios";
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
  } catch (error) {
      console.error('Error during request:', error);
      return null;
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
  } catch (error) {
      console.error('Error during request:', error);
      return null;
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
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}
