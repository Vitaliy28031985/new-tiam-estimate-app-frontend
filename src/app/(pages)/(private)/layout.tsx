'use client'
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { isLoginUser } from "@/app/utils/user";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const isLogin = await isLoginUser();
      if (!isLogin) {
        router.push('/');
      }
    };
    fetchUser();

  }, []);

  return (
    <div>
      {children}
    </div>
  )

}