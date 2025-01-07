import axios, { AxiosError } from "axios";
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
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response;
      } else {
        console.log("Unknown error", error);
      }
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
    } catch (error: unknown) {
          if (error instanceof AxiosError) {
            return error.response;
          } else {
            console.log("Unknown error", error);
          }
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
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response;
      } else {
        console.log("Unknown error", error);
      }
    }
  } 
}