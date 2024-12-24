'use client'
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { isLoginUser } from "./utils/user";
import "./globals.css";
import { UserProvider } from "./context/UserContext";
import Header from "./components/Header/Header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthorization = pathname?.startsWith('/authorization');


  const router = useRouter()

  const fetchUser = async () => {
    const isLogin = await isLoginUser();

    if (isLogin) {
      if (isAuthorization) {
        await router.push('/private');
      }
    }
  };

  useEffect(() => {

    fetchUser();

  }, []);


  return (
    <html lang="uk">
      <body>
        <UserProvider>
          {!isAuthorization && <Header />}

          {children}
        </UserProvider>
      </body>
    </html>
  );
}
