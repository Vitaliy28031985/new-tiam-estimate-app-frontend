import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/Logo-1.svg';
import ButtonBlueLink from '@/app/UI/Buttons/ButtonBlueLink';
export default function Footer() {
    return (
        <footer className='flex gap-28 items-center justify-center w-[1249px] ml-auto mr-auto container py-10'>
            <Link href="/"><Image src={logo} alt="logo" width={164} height={50} quality={100} /></Link>
            <a className='font-semibold text-xl text-black hover:text-blue-30 focus:text-blue-30' href="mailto:estimateapp@ukr.net">estimateapp@ukr.net</a>
            <ul className='flex items-center gap-24'>
                <li>
                 <Link className='font-semibold text-xl text-black hover:text-blue-30 focus:text-blue-30' href="/#reviews">Відгуки</Link>   
                </li>
                <li>
                    <Link className='font-semibold text-xl text-black hover:text-blue-30 focus:text-blue-30' href="/#main">Про нас</Link>
                </li>
            </ul>
            <ButtonBlueLink title='Увійти' link='/login'/>
        </footer>
    )
}