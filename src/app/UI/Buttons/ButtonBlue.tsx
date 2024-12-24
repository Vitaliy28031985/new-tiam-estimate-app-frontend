'use client';
import { ButtonBlueProps } from '../../interfaces/ButtonInterface';
export default function ButtonBlue({ title, click, type }: ButtonBlueProps) {
  return (
    <button className={`bg-blue-30  py-4 px-8 font-semibold text-xl
       text-white rounded-3xl hover:bg-blue-20 focus:bg-blue-20 disabled:text-gray-10`} onClick={click} type={type}>
      {title}
    </button>
  );
}   