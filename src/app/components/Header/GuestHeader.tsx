'use client'
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/Logo-1.svg';
import ButtonBlueLink from '@/app/UI/Buttons/ButtonBlueLink';

export default function GuestHeader() {
    
    return (

    <header className='w-[1249px] ml-auto mr-auto container py-6'>
        <div className='flex gap-[861px]'>
            <Link href="/"><Image src={logo} alt="logo" width={164} height={50} quality={100} /></Link>
            <ButtonBlueLink title='Увійти' link='/login'/>
        </div>
    </header>
     
    )
}