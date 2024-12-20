'use client'
import { PlusIcon, MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/outline';
import { getAllPrices } from '@/app/utils/prices';
import { Price } from '@/app/interfaces/PriceInterface';
import ButtonDelete from '@/app/UI/Buttons/ButtonDeletePrices';
import { useEffect, useState } from 'react';
export default function PricesComponent() {
    const [data, setData] = useState<Price[] | null>(null);
   
    async function getPrices() {
        const prices = await getAllPrices();
        if (prices) {
            await setData(prices)
        }
    }

    useEffect( () => {
             getPrices();
             }, [])


    return (
        <section>
          
             <div className='flex items-center justify-center gap-1 mb-2'>
                <h3 className="font-bold font-alternates text-5xl">Прайс робіт</h3>
                <button className=''>
                 <PlusIcon className='size-10 text-black'/>   
                </button>
            </div>

            <p className='font-normal text-lg text-center text-black mb-12'>Порахуйте вартість капітального ремонту</p>
            
            <div className=' mb-12'>
            <div className='relative w-max'>
                <MagnifyingGlassIcon className='size-6 absolute left-2 top-3 text-gray-20'/>
                <input
                    className='w-[589px] h-[49px] px-10  rounded-3xl border border-gray-20 
                     text-gray-20 text-base font-normal focus:border-blue-20 focus:outline-none'
                    placeholder='Пошук'
                    type="text" name="filter" />
                </div>
            </div>

            <div className=''>
                <div className='w-[661px] '>

                    <div className='flex items-center gap-4 mb-2'>
                        <div className='w-96'><p className='font-normal text-base text-black text-start'>Найменування роботи</p></div>
                        <div className='w-52'><p className='font-normal text-base text-black text-start'>Ціна за одиницю (грн)</p></div>
                    </div>

                    {data && data.map(({ id, title, price }) => (
                     <div className='flex items-center gap-4 mb-3' key={id}>
                       
                        <div className='w-96 relative'>
                            <button className='absolute top-3 left-4' type='button'>
                              <PencilIcon className='size-6 text-gray-30'/>   
                            </button>
                           
                            <div className='border border-blue-20 pl-12 pr-4 py-3 rounded-full'>
                                    <p className='font-normal text-base text-gray-35 text-start'>{title}</p>
                            </div>

                        </div>

                        <div className='w-52'>

                            <div className='border border-blue-20 px-5 py-3 rounded-full'>
                                    <p className='font-normal text-base text-gray-35 text-center'>{price}</p>
                            </div>
                            
                        </div>
                        <ButtonDelete />
                    </div>   
                    ))}
                    
                </div>
            </div>

        </section>
    )
}

