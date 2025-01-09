import axios, { AxiosError } from "axios";
import BASE_URL from "./base";
import Unit from "../interfaces/unitInterface";

export async function getUnits(): Promise<Unit[] | null> {
  
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}api/units`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const userData: Unit[] = response.data;
    return userData;
  } catch (error) {
    console.error('Error during request:', error);
    return null;
  }
  }  
}

export async function addUnit(title: string) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}api/units`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { title}
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

export async function deleteUnit(id: string | null) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'delete',
      url: `${BASE_URL}api/units/${id}`,
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