import axios from 'axios';
import BASE_URL from './base';
import { RegisterDataInterface, LoginDataInterface } from '../../interfaces/registerData';


export async function registerApi(data: RegisterDataInterface) {
  try {
    const response = await axios.post(`${BASE_URL}api/auth/register`, data);
    return response; 
  } catch (error) {
    console.error('Error during registration:', error); 
    throw error;
  }
}



export async function loginApi(data: LoginDataInterface) {
    try {
    const response = await axios.post(`${BASE_URL}api/auth/login`, data); 
    return response; 
  } catch (error) {
    console.error('Error during login:', error); 
    throw error;
  }
}

export async function logout() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    return null;
  }

  try {
   await axios({
      method: 'post',
      url: `${BASE_URL}api/auth/logout`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error during logout request:', error);
    
  }
}
//

