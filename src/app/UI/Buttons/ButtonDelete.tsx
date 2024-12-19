'use client';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ButtonBlueProps } from '../../interfaces/ButtonInterface';
export default function ButtonDelete({isActive = false, click}: ButtonBlueProps) {
  return (
    <button className={isActive ? `w-12 h-12 bg-red-10 rounded-full hover:bg-red-20 focus:bg-blue-15` :
       `w-12 h-12 border border-red-0 rounded-full hover:bg-red-10 focus:bg-red-10
     hover:border-0 focus:border-0`
    } onClick={click} >
        <TrashIcon className="size-4 text-red-0 ml-auto mr-auto"/>
      </button>
  );
}   