'use client'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
export default function PricesComponent() {
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
                    <div className='flex items-center gap-4 mb-3'>
                        <div className='w-96'>
                            <div className='border border-blue-20 pl-12 pr-4 py-3 rounded-full'>
                                <p className='font-normal text-base text-gray-35 text-start'>Штукатурка стін</p>
                            </div>
                        </div>
                        <div className='w-52'>
                            <div>
                                <p className='font-normal text-base text-gray-35 text-center'>300</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

