'use client';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { ButtonBlueProps } from '../../interfaces/ButtonInterface';
import { PiFloppyDisk } from 'react-icons/pi';
export default function ButtonUpdate({isActive = false, click}: ButtonBlueProps) {
  return (
      <button type='button'
        className={isActive ? `w-12 h-12 bg-blue-5 rounded-full hover:bg-blue-15 focus:bg-blue-15` :
        `w-12 h-12 border border-blue-30 rounded-full hover:bg-blue-5 focus:bg-blue-5 hover:border-0 focus:border-0`                         }
          onClick={click} >
         {isActive ? (<PiFloppyDisk className='size-6 text-blue-30 mx-auto'/>) : (<PencilSquareIcon className='size-6 text-blue-30 mx-auto'/>)}
      </button>
  );
} 