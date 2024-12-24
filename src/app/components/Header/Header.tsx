'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/Logo-1.svg';
import ButtonBlueLink from "@/app/UI/Buttons/ButtonBlueLink";
import { logout } from "@/app/utils/auth";
import { useUser } from '@/app/context/UserContext';

export default function Header() {
    const { user, setUser } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const avatar = user?.avatar;

    async function logoutFunction() {
        await logout();
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setUser(null);
        router.push('/');
    }

    return (
        <header className='w-[1249px] ml-auto mr-auto container py-6 flex justify-between items-center'>
            <Link href='/'><Image src={logo} alt="logo" width={164} height={50} quality={100} /></Link>
            {user ? (
                <>
                    <ul className='flex items-center gap-24'>
                        <li>
                            <Link className={`font-normal text-xl text-black hover:text-blue-30 focus:text-blue-30 ${pathname === '/prices' ? 'text-blue-30' : 'text-black'}`}
                                href="/prices">Прайс</Link>
                        </li>
                        <li>
                            <Link className={`font-normal text-xl text-black hover:text-blue-30 focus:text-blue-30 ${pathname === '/estimates' ? 'text-blue-30' : 'text-black'}`} href="/estimates">Кошториси</Link>
                        </li>
                        <li>
                            <Link className={`font-normal text-xl text-black hover:text-blue-30 focus:text-blue-30 ${pathname === '/profile' ? 'text-blue-30' : 'text-black'}`} href="/profile">Профіль</Link>
                        </li>
                    </ul>
                    <div onClick={logoutFunction} className="object-center w-[74px] h-[74px]">
                        <Image className='rounded-full overflow-hidden object-cover' src={avatar ? avatar : 'https://res.cloudinary.com/ddzcjknmj/image/upload/v1731220706/Group_427321632_xsewqc.png'} alt="avatar" width={74} height={74} quality={100} />
                    </div>
                </>
            ) : (
                <ButtonBlueLink title='Увійти' link='/authorization?param=true' />
            )}
        </header>
    );
}
