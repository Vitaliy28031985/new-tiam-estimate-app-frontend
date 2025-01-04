import axios, { AxiosError } from "axios";
import { UpdatePrice } from "../interfaces/PriceInterface";
import BASE_URL from "./base";


export async function addProjectPrice(data: UpdatePrice) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}api/project/prices/${data.projectId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
          price: Number(data.price),
          title: data.title,
        }
    });
   return response.data;
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
          console.log(error)
          return error.response;
        } else {
          console.log("Unknown error", error);
        }
      }
    }  
}


export async function updateProjectPrice(data: UpdatePrice) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'patch',
      url: `${BASE_URL}api/project/prices/${data.id}/${data.priceId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
          price: Number(data.price),
          title: data.title,
        }
    });
   return response.data;
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
          console.log(error)
          return error.response;
        } else {
          console.log("Unknown error", error);
        }
      }
    }  
}


export async function deleteProjectPrice(id: string | null, priceId: string | null) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'delete',
      url: `${BASE_URL}api/project/prices/${id}/${priceId}`,
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
