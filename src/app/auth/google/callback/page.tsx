// app/auth/google/callback/page.tsx
import { redirect } from 'next/navigation';
import { handleGoogleRedirect } from '../../../actions/auth'; // Переконайтесь, що цей імпорт працює правильно

export default async function GoogleCallbackPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  try {
    // Створення екземпляра URLSearchParams з отриманих параметрів
    const searchParamsInstance = new URLSearchParams(searchParams as Record<string, string>);
    
    // Виклик вашої функції для обробки редіректу
    const user = await handleGoogleRedirect(searchParamsInstance);
    console.log("user", user);
    
    if (user) {
      // Якщо аутентифікація успішна, редіректимо користувача на панель приладів
      redirect('/dashboard');
    } else {
      // Якщо щось пішло не так, редіректимо на сторінку входу з повідомленням про помилку
      redirect('/login?error=auth_failed');
    }
  } catch (error) {
    console.error('Callback error:', error);
    // В разі помилки редіректимо на сторінку входу з помилкою
    redirect('/login?error=auth_failed');
  }
}

