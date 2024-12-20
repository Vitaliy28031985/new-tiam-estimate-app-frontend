'use client'
import {XMarkIcon } from '@heroicons/react/24/outline';

interface AddPriceModalProps {
    submit?: (price: number, title: string) => { price: number, title: string };
    toggle?: () => void;
    isShow?: () => void;
}
const AddPriceModal: React.FC<AddPriceModalProps> = ({ submit, toggle, isShow }) => {
     
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-[#DFDFDF] px-[71px] p-8 rounded-[24px] w-[611px] shadow-lg">
                <button type="button" onClick={toggle} className='absolute top-3 right-3'><XMarkIcon className='size-6 text-black'/></button>
                <h3 className="font-semibold text-2xl text-black text-center mb-6">Форма для створення роботи</h3>
        </div>
        </div>
    )
}
export default AddPriceModal;

