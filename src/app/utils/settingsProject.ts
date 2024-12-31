import axios from "axios";
import BASE_URL from "./base";

interface addAllow {
    projectId: string;
    email: string;
    allowLevel: string;
    lookAt: string;
    lookAtTotals: string;
}


export async function addAllow(data: addAllow) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'patch',
      url: `${BASE_URL}api/setting/project/add/${data.projectId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
        email: data.email,
        allowLevel: data.allowLevel,
        lookAt: data.lookAt,
        lookAtTotals: data.lookAtTotals
        }
    });
   return response.data;
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}


export async function addDiscount(data: { discount: number;  projectId: string}) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}api/setting/project/discount/${data.projectId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
          discount: data.discount,

        }
    });
   return response.data;
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}

export async function addLow(data: { discount: number;  projectId: string}) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}api/setting/project/lowEstimates/${data.projectId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
          discount: data.discount,

        }
    });
   return response.data;
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}