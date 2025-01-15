'use client';

import { usePathname } from 'next/navigation';
import { XMarkIcon, Bars3Icon } from "@heroicons/react/16/solid";
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/Logo-1.svg';
import ButtonBlueLink from "@/app/UI/Buttons/ButtonBlueLink";
import { useUser } from '@/app/context/UserContext';
import { useState } from 'react';
import MobileMenu from './MobileManu';

export default function Header() {
    const { user } = useUser();
    const pathname = usePathname();
    const avatar = user?.avatar;

    const [isShowMenu, setIsShowMenu] = useState(false);
    const toggleMenu = () => setIsShowMenu(toggle => !toggle);

  

    return (
        <header className='relative desktop:w-[1249px] tabletBig:w-[1020px] tablet:w-[765px] mobile:w-[370px] 
        ml-auto mr-auto container
        desktop:py-6 tabletBig:py-6 tablet:py-6 mobile:py-3
        px-3 flex justify-between items-center'>
            <Link  href='/'><Image className='
            desktop:w-[164px] tabletBig:w-[164px] tablet:w-[164px] mobile:w-[100px]
            desktop:h-[50px] tabletBig:h-[50px] tablet:h-[50px] mobile:h-[30px]' src={logo} alt="logo" width={164} height={50} quality={100} /></Link>
            {user ? (
                <>
                    <ul className='items-center desktop:gap-24 tabletBig:gap-24 tablet:gap-12 
                    desktop:flex tabletBig:flex tablet:flex
                    mobile:hidden'>
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
                    <div className='flex items-center gap-3'>
                    <div className="
                    object-center 
                    desktop:w-[74px] tabletBig:w-[74px] tablet:w-[74px] mobile:w-[32px]
                    desktop:h-[74px] tabletBig:h-[74px] tablet:h-[74px] mobile:h-[32px]
                   ">
                        <Image className='w-full h-full rounded-full overflow-hidden object-cover' src={avatar ? avatar : 'https://res.cloudinary.com/ddzcjknmj/image/upload/v1731220706/Group_427321632_xsewqc.png'} alt="avatar" width={74} height={74} quality={100} />
                    </div>
                        <button
                            onClick={toggleMenu}
                            className='desktop:hidden tabletBig:hidden tablet:hidden mobile:block'
                            type='button'>
                            {!isShowMenu ? (<Bars3Icon className='size-8 text-gray-30' />) : (<XMarkIcon className='size-8 text-gray-30' />)}
                            
                        </button>
                    </div>
                </>
            ) : (
                <ButtonBlueLink title='Увійти' link='/authorization?param=true' />
            )}
            {isShowMenu && (<MobileMenu toggle={toggleMenu}/>)}
        </header>
    );
}
