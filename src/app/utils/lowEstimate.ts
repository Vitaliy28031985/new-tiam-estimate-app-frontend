import axios, { AxiosError } from "axios";
import { EstimateCreate } from "../interfaces/estimateInterfaces";
import BASE_URL from "./base";

export async function addLowEstimate(data: EstimateCreate) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}api/low/estimate/${data.projectId}`,
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

export async function updateLowEstimate(data: EstimateCreate) {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'patch',
      url: `${BASE_URL}api/low/estimate/${data.projectId}/${data.estimateId}`,
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

export async function deleteLowEstimate(data: EstimateCreate) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'delete',
      url: `${BASE_URL}api/low/estimate/${data.projectId}/${data.estimateId}`,
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