import axios, { AxiosError } from 'axios';
import BASE_URL from './base';
import { User, Passwords } from '@/app/interfaces/user';

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

export async function getUsers(): Promise<User | null> {
  
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}api/user`,
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


export async function isLoginUser(): Promise<boolean | null> {
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


export async function changeName(name: string | undefined) {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    return null;
  }

  try {
  const response = await axios({
      method: 'put',
      url: `${BASE_URL}api/user/name`,
      headers: {
        'Authorization': `Bearer ${token}`
     },
      data: {name}
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

export async function changeEmail(email: string | undefined) {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    return null;
  }

  try {
 const response =  await axios({
      method: 'put',
      url: `${BASE_URL}api/user/email`,
      headers: {
        'Authorization': `Bearer ${token}`
     },
      data: {email}
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

export async function changePhone(phone: string | undefined) {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    return null;
  }

  try {
   await axios({
      method: 'put',
      url: `${BASE_URL}api/user/phone`,
      headers: {
        'Authorization': `Bearer ${token}`
     },
      data: {phone}
    });
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response;
      } else {
        console.log("Unknown error", error);
      }
    }
}


export async function changeAvatar(avatar: File | undefined) {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    return null;
  }

  if (!avatar) {
    console.error('No avatar file selected');
    return null;
  }

  try {
    const formData = new FormData();
    formData.append('avatar', avatar);


   const response = await axios({
      method: 'put',
      url: `${BASE_URL}api/user/avatar`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: formData,
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


export async function changeRole(role: string | undefined) {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    return null;
  }

  try {
   await axios({
      method: 'put',
      url: `${BASE_URL}api/user/role`,
      headers: {
        'Authorization': `Bearer ${token}`
     },
      data: {role}
    });
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response;
      } else {
        console.log("Unknown error", error);
      }
    }
}

export async function changePassword(data: Passwords | undefined) {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    return null;
  }

  try {
   await axios({
      method: 'put',
      url: `${BASE_URL}api/user/password`,
      headers: {
        'Authorization': `Bearer ${token}`
     },
      data
    });
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response;
      } else {
        console.log("Unknown error", error);
      }
    }
}