'use server'
// utils/auth.service.ts

// utils/auth.service.ts

import axios from 'axios';
import { redirect } from 'next/navigation'; // Потрібно для редіректу в Next.js
import BASE_URL from '../utils/base'; // Ваш BASE_URL для бекенду

// 1. Функція для ініціалізації Google авторизації
export async function authenticateWithGoogle() {
  // Перевіряємо, чи ми на клієнті
  if (typeof window !== 'undefined') {
    try {
      // Використовуємо правильний URL для вашого бекенду
      const backendUrl = `${BASE_URL}/api/auth/google`;
      
      // Перенаправляємо користувача на бекенд тільки на клієнтській стороні
      window.location.href = backendUrl;
    } catch (error) {
      console.error('Error initiating Google login:', error);
      throw error;
    }
  } else {
    console.error('Window is not defined: Google auth should only be called on the client side.');
  }
}

// 2. Функція для обробки редіректу після авторизації в Google
export const handleGoogleRedirect = async (searchParams: URLSearchParams) => {
  const code = searchParams.get('code'); // Отримуємо авторизаційний код з URL

  if (code) {
    try {
      // Надсилаємо код на сервер для отримання токенів
      const response = await axios.post(`${BASE_URL}/api/auth/google/redirect`, { code });

      // Перевіряємо, чи отримали дані, і зберігаємо токени у localStorage
      if (response.data) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('refreshToken', response.data.refresh_token); // Якщо ви отримуєте refresh токен
        return response.data.user; // Повертає користувача після авторизації
      }
    } catch (error) {
      console.error('Error during Google OAuth redirect handling:', error);
      throw error;
    }
  } else {
    throw new Error('No authorization code found.');
  }
};
