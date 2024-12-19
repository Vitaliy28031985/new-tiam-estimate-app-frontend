import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from "next";
import fon from '../../assets/bg-img.png'; 
import Login from '@/app/components/Login/Login';
import ButtonGoogle from '../../UI/Buttons/ButtonGoogle';
export const metadata: Metadata = {
  title: "Увійти",
  description: "Сторінка реєстрації",
};

export default function Register() {
    return (
        <div className="w-full bg-gray-0 pt-[215px] relative overflow-hidden">
      <div className='w-[1249px] ml-auto mr-auto container pb-[215px]'>
                
                <div className='w-[501px] bg-white shadow-base px-6 py-10 rounded-[24px]'>
                    <p className='text-center font-bold text-4xl mb-6'>Вхід
                    <Link href='/register' className='text-3xl text-black font-normal  ml-6'>Реєстрація</Link></p>
                    
                    <ButtonGoogle />
                    <div className='flex items-center mb-6 gap-4'>
                    <div className='w-[199px] h-[1px] bg-gray-20 '></div>
                    <p className='text-xl text-gray-20 text-center font-normal'>або</p>
                    <div className='w-[199px] h-[1px] bg-gray-20 '></div>
                    </div>
                    <Login/>
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

