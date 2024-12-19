'use client';
import { ButtonBlueProps } from '@/app/interfaces/ButtonInterface';
import Google from '../Icons/Google';
export default function ButtonGoogle({click}: ButtonBlueProps) {
    return (
        <button
            className="w-[453px] h-12 mb-6 px-6 py-2.5 bg-white rounded-3xl shadow-base border border-sky-100 
            justify-center items-center gap-2.5 inline-flex mx-auto hover:bg-gray-5 focus:bg-gray-5"
            onClick={click}
        >
  <Google />
  <p className="text-center text-zinc-950 text-sm font-semibold font-['Montserrat'] leading-[17px]">Продовжити з Google</p>
</button>
    )
}