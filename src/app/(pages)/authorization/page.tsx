import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from "next";
import fon from '../../assets/bg-img.png'; 
import logo from '../../assets/logo_mob.svg';
import Authorization from '@/app/components/Authorization/Authorization';

export const metadata: Metadata = {
  title: "Реєстрація",
  description: "Сторінка входу",
};

export default function Register() {
    return (
        <div className="w-full bg-gray-0 pt-[215px] relative overflow-hidden">
            <Link href="/" className='absolute top-7 left-9'>
                <Image
                src={logo} 
                alt="logo" 
                width={64}                 
                height={64} 
                quality={100}
                priority      
                    /> 
            </Link>
      <div className='w-[1249px] ml-auto mr-auto container pb-[115px]'>
                
                <div className='w-[501px] relative z-20 bg-white shadow-base px-6 py-10 rounded-[24px]'>
                    <Authorization/>                    
                </div> 

               
            </div>
            <div className='absolute right-0 top-0'>
                 <Image
                src={fon} 
                alt="fon" 
                width={609}                 
                height={679} 
                quality={100}
                priority      
                    /> 
           </div>
        </div>
    )
}
