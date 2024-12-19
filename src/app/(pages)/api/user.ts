import axios from 'axios';
import BASE_URL from './base';
import { User } from '@/app/interfaces/user';

export async function getCurrentUser(): Promise<User | null> {
  
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}api/user/current`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const userData: User = response.data;
    return userData;
  } catch (error) {
    console.error('Error during request:', error);
    return null;
  }
  }  
}

export async function refreshToken(): Promise<{ token: string; refreshToken: string} | null> {
  
  const token = localStorage.getItem('refreshToken');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}api/auth/refresh/current`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
      const data: { token: string; refreshToken: string} = response.data;
    return data;
  } catch (error) {
    console.error('Error during request:', error);
    return null;
  }
  }  
}


export async function isLoginUser(): Promise<Boolean | null> {
  const user = await getCurrentUser();
  if (user) { 
    return true;
  } else {
     const tokens = await refreshToken();
  if (tokens) {
    localStorage.setItem('token', tokens.token);
    return true;
  } 
  }
  
  return false;
}
//