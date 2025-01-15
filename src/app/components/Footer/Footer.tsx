import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/Logo-1.svg';
import ButtonBlueLink from '@/app/UI/Buttons/ButtonBlueLink';
export default function Footer() {
    return (
        <footer className='desktop:flex tabletBig:flex tablet:blok mobile:block mobile:mx-auto
        desktop:w-[1249px] tabletBig:w-[1000px] tablet:w-[760px] mobile:w-[370px]
      desktop:gap-28 tabletBig:gap-11 items-center justify-center  ml-auto mr-auto container py-10'>
            <Link className='mobile:flex mobile:justify-center mobile:mb-3' href="/"><Image src={logo} alt="logo" width={164} height={50} quality={100} /></Link>
            <a className='font-semibold text-xl text-black hover:text-blue-30 focus:text-blue-30 mobile:text-center mobile:block' href="mailto:estimateapp@ukr.net">estimateapp@ukr.net</a>
            <ul className='flex items-center desktop:gap-24 tabletBig:gap-12 mobile:gap-12 mobile:justify-center mobile:mb-3 mobile:mt-3'>
                <li>
                 <Link className='font-semibold text-xl text-black hover:text-blue-30 focus:text-blue-30' href="/#reviews">Відгуки</Link>   
                </li>
                <li>
                    <Link className='font-semibold text-xl text-black hover:text-blue-30 focus:text-blue-30' href="/#main">Про нас</Link>
                </li>
            </ul>
            <div className='mobile:flex mobile:justify-center'>
                <ButtonBlueLink title='Увійти' link='/authorization?param=true' />
            </div>
        </footer>
    )
}