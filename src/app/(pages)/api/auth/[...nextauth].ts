// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       // Функція authorize, де credentials мають тип Record<string, string> або undefined
//       authorize: async (
//         credentials: Record<"username" | "password", string> | undefined,
//         req: { body: any; query: any; headers: any; method: string }
//       ): Promise<User | null> => {
//         if (credentials) {
//           // Логіка перевірки користувача
//           const user: User = { id: 1, name: 'User', email: 'user@example.com' }; // Приклад користувача
//           if (credentials.username === 'user' && credentials.password === 'pass') {
//             return user;
//           }
//         }
//         return null;
//       }
//     })
//   ],
//   pages: {
//     signIn: '/auth/signin', // Сторінка входу
//   },
// });
