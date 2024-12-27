import axios from "axios";
import BASE_URL from "./base";
import { EstimateCreate } from "../interfaces/estimateInterfaces";

export async function addEstimate(data: EstimateCreate) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}api/estimates/${data.projectId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
          title: data.title,

        }
    });
   return response.data;
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}

export async function updateEstimate(data: EstimateCreate) {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'patch',
      url: `${BASE_URL}api/estimates/${data.projectId}/${data.estimateId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
          title: data.title,
        }
    });
   return response.data;
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}

export async function deleteEstimate(data: EstimateCreate) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'delete',
      url: `${BASE_URL}api/estimates/${data.projectId}/${data.estimateId}`,
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