import axios from "axios";
import BASE_URL from "./base";
import { Position } from "../interfaces/positions";

export async function addPosition(data: Position) {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}api/positions/${data.projectId}/${data.estimateId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
            title: data.title,
            unit: data.unit,
            number: Number(data.number),
            price: Number(data.price)

        }
    });
   return response.data;
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}

export async function updatePosition(data: Position) {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'patch',
      url: `${BASE_URL}api/positions/${data.projectId}/${data.estimateId}/${data.positionId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
            title: data.title,
            unit: data.unit,
            number: Number(data.number),
            price: Number(data.price)

        }
    });
   return response.data;
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}