'use client'
import { useEffect, useRef, useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/outline';
import { getAllPrices, updatePrice } from '@/app/utils/prices';
import { Price } from '@/app/interfaces/PriceInterface';
import ButtonDelete from '@/app/UI/Buttons/ButtonDeletePrices';
import ButtonPrint from '@/app/UI/Buttons/ButtonPrint';
import AddPriceModal from '../AddPriceModal/AddPriceModal';
import DeleteModal from '../DeleteModal/DeleteModal';

export default function PricesComponent() {
    
    const [data, setData] = useState<Price[] | null>(null);
    const [currentData, setCurrentData] = useState<{id: string, title: string} | null>(null);
    const [isRender, setIsRender] = useState<boolean>(false);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
    const [filter, setFilter] = useState('')
   

    const filterChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);
    
     const normalizeFilter = filter.toLowerCase();

    const filteredPrices =  data?.filter(item =>
        item.title.toLowerCase().includes(normalizeFilter)) ?? [];
    

const handlePrint = () => {
  const printContent = `
    <div class="print-content">
       <h3 class="title">Прайс робіт</h3>

      <div class='flex items-center gap-4 mb-2'>
        <div class='w-96'><p class='font-normal text-base text-black text-center'>Найменування роботи</p></div>
        <div class='w-52'><p class='font-normal text-base text-black text-start'>Ціна за одиницю (грн)</p></div>
     </div>
                
      ${data && data?.map(({ title, price }) => `
        <div class='flex items-center gap-4 mb-3' key={id}>
          <div class='w-96 relative'>
            <div class='border border-blue-20 pl-12 pr-4 py-3 rounded-full'>
              <p class='font-normal text-base text-gray-35 text-start'>${title}</p>
            </div>       
          </div>
          <div class='w-52'>
            <div class='border border-blue-20 px-5 py-3 rounded-full'>
              <p class='font-normal text-base text-gray-35 text-center'>${price}</p>
            </div>      
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const printWindow = window.open('', '', 'width=800,height=600');
  if (printWindow) {
    const styles = `
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css" rel="stylesheet">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .print-content {
          margin-left: auto;
          margin-right: auto;
        }

        button {
          display: none;
        }

        .title {
          font-weight: 700; 
          font-size: 3rem;
          line-height: 1;
          text-align: center;
          margin-bottom: 20px;
          margin-top: 10px;
        }
      </style>
    `;
      
    printWindow.document.write('<html><head><title>Print</title>' + styles + '</head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
};





    async function getPrices() {
        const prices = await getAllPrices();
        if (prices) {
        const enhancedData = prices.map(item => ({
        ...item,
        isShow: false,
        isDelete: false,
        }));
            await setData(enhancedData)
        }
    }

    const toggleDelete = () => {
    setIsShowDeleteModal(prev => !prev);
    };

    const toggleRender = (): void | undefined => {
    setIsRender(prev => !prev);
    }; 

     const isToggle = (): void | undefined => {
    setIsShowModal(prev => !prev);
    }; 

    useEffect( () => {
        getPrices();
        console.log("update")
             }, [isRender])

     const addIsToggle = (id: string, currentIsShow: boolean, name: 'update' | 'delete'): void => {
         setData(prevData => {
            if (prevData === null) return []; 
            const newData = prevData.map(item => {
                if (item.id === id) {
                    if (name === 'update') {
                        return { ...item, isShow: currentIsShow };
                    }
                    if (name === 'delete') {
                        return { ...item, isDelete: currentIsShow };
                    }
                }
                return item;
            });
            return newData;
        });
    };

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, id } = e.currentTarget;
            setData(prevData => {
             if (prevData === null) return []; 
            const newData = prevData.map(price => {
                if (price.id === id) {
                    switch (name) {
                        case name:
                            return  {...price, [name]: value};
                        default:
                          return price;
                      }
                }
                return price; 
            });
        
            return newData; 
        });
    }
    
  
    return (
        <section>
          
             <div className='flex items-center justify-center gap-1 mb-2'>
                <h3 className="font-bold font-alternates text-5xl">Прайс робіт</h3>
                <button className='' onClick={isToggle}>
                 <PlusIcon className='size-10 text-black'/>   
                </button>
            </div>
            
            <p className='font-normal text-lg text-center text-black mb-12'>Порахуйте вартість капітального ремонту</p>
            
            <div className=' mb-12'>
            <div className='relative w-max'>
                <MagnifyingGlassIcon className='size-6 absolute left-2 top-3 text-gray-20'/>
                <input onChange={filterChange} value={filter} 
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

                    {data && filteredPrices?.map(({ id, title, price, isShow, isDelete  }) => (
                     <div className='flex items-center gap-4 mb-3' key={id}>
                       
                        <div className='w-96 relative'>
                            <button
                                    onClick={async () => {
                                        addIsToggle(id, !isShow, 'update')
                                        if (isShow) {
                                            await updatePrice({id, title, price})
                                            await toggleRender();  
                                        }
                                    }
                                    }
                                className='absolute top-3 left-4' type='button'>
                                {isShow ? (<CheckIcon className='size-6 text-gray-30'/>) : (<PencilIcon className='size-6 text-gray-30'/>)}
                                 
                            </button>
                                {isShow ? (
                                    <input className='w-96 bg-blue-5 pl-12 pr-4 py-3 rounded-full font-normal
                                 text-base text-gray-35 shadow-pricesTablet' id={id} name='title' onChange={onChange} type='text' value={title} />
                                ): (
                              <div className='border border-blue-20 pl-12 pr-4 py-3 rounded-full'>
                                    <p className='font-normal text-base text-gray-35 text-start'>{title}</p>
                            </div>       
                           )}
                           

                        </div>

                            <div className='w-52'>
                                
                                {isShow ? (
                                <input className='w-48 bg-blue-5 pl-20 pr-4 py-3 rounded-full font-normal
                                 text-base text-gray-35 shadow-pricesTablet' id={id} name='price' onChange={onChange} type='number' value={price} />
                                ): (
                                 <div className='border border-blue-20 px-5 py-3 rounded-full'>
                                    <p className='font-normal text-base text-gray-35 text-center'>{price}</p>
                                 </div>   
                                )}  
                            
                        </div>
                          <ButtonDelete
                            click={ () => {
                            addIsToggle(id, !isDelete, 'delete');
                            setCurrentData({ id, title });
                            toggleDelete();        
                        }} isActive={isShow}/>

                    </div>   
                    ))}
</div>
                    <div className='flex justify-end gap-4 items-center'>
                        <ButtonPrint click={handlePrint} />
                          <button type='button' className={`bg-blue-30  py-3 px-8 font-bold text-base
                            text-white rounded-full hover:bg-blue-20 focus:bg-blue-20 disabled:text-gray-10`} >
                             Відправити
                            </button>
                    </div>
                    
                </div>
            
            {isShowModal && (<AddPriceModal toggle={isToggle} isShow={toggleRender} />)}
            
            {isShowDeleteModal && (<DeleteModal data={currentData} toggle={toggleDelete} nameComponent='price' toggleData={toggleRender}/>)}
            
         
        </section>
    )
}

