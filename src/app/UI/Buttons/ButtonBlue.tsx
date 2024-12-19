'use client';
import { ButtonBlueProps } from '../../interfaces/ButtonInterface';
export default function ButtonBlue({title, click}: ButtonBlueProps) {
  return (
      <button className={`bg-blue-30 pt-4 pb-4 pl-8 pr-8 font-semibold text-xl
       text-white rounded-3xl hover:bg-blue-20 focus:bg-blue-20 disabled:text-gray-10`} onClick={click}>
          {title}
      </button>
  );
}   