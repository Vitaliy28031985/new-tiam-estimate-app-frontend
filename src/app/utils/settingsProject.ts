import axios, { AxiosError } from "axios";
import BASE_URL from "./base";

interface Allow {
    projectId: string;
    email: string;
    allowLevel?: string;
    lookAt?: string;
    lookAtTotals?: string;
}


export async function addAllow(data: Allow) {
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
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
          return error.response;
        } else {
          console.log("Unknown error", error);
        }
      }
  } 
}

export async function updateAllow(data: Allow) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'patch',
      url: `${BASE_URL}api/setting/project/update/${data.projectId}`,
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
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
          return error.response;
        } else {
          console.log("Unknown error", error);
        }
      }
  } 
}

export async function deleteAllow(data: Allow) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'patch',
      url: `${BASE_URL}api/setting/project/delete/${data.projectId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
        email: data.email,
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
          discount: Number(data.discount),

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
  }catch (error: unknown) {
      if (error instanceof AxiosError) {
          return error.response;
        } else {
          console.log("Unknown error", error);
        }
      }
  } 
}