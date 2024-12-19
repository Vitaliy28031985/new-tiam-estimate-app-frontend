'use client'
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { isLoginUser } from "../api/user";
import Header from "@/app/components/Header/Header";
import "../../globals.css";



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
    <>
      <Header />
        {children}
    </>
  )      
     
}