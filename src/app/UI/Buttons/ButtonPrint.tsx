import { PrinterIcon } from '@heroicons/react/24/solid'
import { ButtonBlueProps } from '../../interfaces/ButtonInterface';
export default function ButtonPrint({click}: ButtonBlueProps) {
  return (
      <button className='w-12 h-12 bg-blue-5 rounded-full hover:bg-blue-10 focus:bg-blue-10' onClick={click} >
        <PrinterIcon className="size-4 text-gray-30 ml-auto mr-auto"/>
      </button>
  );
} 