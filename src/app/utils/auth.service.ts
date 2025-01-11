import axios from 'axios';
import BASE_URL from './base';



class AuthService {
  private static instance: AuthService;
  
  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async initiateGoogleAuth() {
    const data = window.location.href = `${BASE_URL}api/auth/google`;
    // console.log("data", data)
    // await axios.get(`${BASE_URL}api/auth/google`)
    //  await axios({
    //   method: 'get',
    //   url: `${BASE_URL}api/auth/google`,
    //   headers: {
    //     'Referrer-Policy': 'no-referrer-when-downgrade',
    //     // 'Referrer-Policy': 'origin',
    //    },
       
    //   withCredentials: true,
    // });
   

  }

  // async handleGoogleCallback() {
  //   try {
  //       const response = await axios.get(`${BASE_URL}api/auth/google/redirect`);
        
  //       console.log("response", response)
      
  //     if (response.data) {
  //       localStorage.setItem('token', response.data.token);
  //       localStorage.setItem('refreshToken', response.data.refreshToken);
  //       return response.data.user;
  //     }
  //   } catch (error) {
  //     console.error('Google authentication error:', error);
  //     throw error;
  //   }
  // }
  
async handleGoogleCallback() {
  // Отримуємо параметри з URL після редіректу
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');  // Отримуємо авторизаційний код

  if (code) {
    try {
      // Тут ви можете відправити код на сервер для отримання токенів
      const response = await axios.get(`${BASE_URL}api/auth/google/redirect`, {
        params: { code }  // Відправляємо код на сервер
      });
      
      if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return response.data.user;
      }
    } catch (error) {
      console.error('Google authentication error:', error);
      throw error;
    }
  }
}
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}

export default AuthService.getInstance();

