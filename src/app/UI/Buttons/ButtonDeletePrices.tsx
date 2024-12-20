'use client';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ButtonBlueProps } from '../../interfaces/ButtonInterface';
export default function ButtonDelete({isActive = false, click}: ButtonBlueProps) {
  return (
    <button type='button' className={isActive ? `w-12 h-12 bg-blue-5 rounded-full hover:bg-blue-15 focus:bg-blue-15` :
       `w-12 h-12 border border-blue-20 rounded-full hover:bg-blue-5 focus:bg-blue-5
     hover:border-0 focus:border-0`
    } onClick={click} >
        <TrashIcon className="size-4 text-gray-30 ml-auto mr-auto"/>
      </button>
  );
}   