'use client'
import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/Logo-1.svg';
import { User } from "@/app/interfaces/user";
import { getCurrentUser } from "@/app/(pages)/api/user";
import { logout } from "@/app/(pages)/api/auth";


export default function Header() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const pathname = usePathname()

      useEffect(() => {
    const fetchUser = async () => {
        try {
            const userData = await getCurrentUser();
            setUser(userData);
        } 
        catch (error) {
            console.error('Token not found in localStorage', error)
              throw new Error('Token not found in localStorage');
     
        }
    };
        fetchUser();
    
      }, []);
    const avatar = user?.avatar;

    async function logoutFunction() {
        await logout();
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        router.push('/');
        
    }
      return (

          <header className='w-[1249px] ml-auto mr-auto container py-6 flex gap-[236px]'>
              
              <Link href='/private'><Image src={logo} alt="logo" width={164} height={50} quality={100} /></Link>
              <ul className='flex items-center gap-24'>
                  <li>
                      <Link className={`font-normal text-xl text-black hover:text-blue-30 focus:text-blue-30 ${pathname === '/private' ? 'text-blue-30' : 'text-black'}`}
                          href="/private">Прайс</Link>
                  </li>
                  <li>
                      <Link className= {`font-normal text-xl text-black hover:text-blue-30 focus:text-blue-30 ${pathname === '/private/estimates' ? 'text-blue-30' : 'text-black'}`} href="/private/estimates">Кошториси</Link>
                  </li>
                  <li>
                      <Link className={`font-normal text-xl text-black hover:text-blue-30 focus:text-blue-30 ${pathname === '/private/profile' ? 'text-blue-30' : 'text-black'}`} href="/private/profile">Профіль</Link>
                  </li>
              </ul> 
              <div onClick={logoutFunction} className="object-center w-[74px] h-[74px]">
                  <Image className='rounded-full overflow-hidden object-cover' src={avatar ? avatar : 'https://res.cloudinary.com/ddzcjknmj/image/upload/v1731220706/Group_427321632_xsewqc.png'} alt="avatar" width={74} height={74} quality={100} />
              </div>
    </header>
      )    
}