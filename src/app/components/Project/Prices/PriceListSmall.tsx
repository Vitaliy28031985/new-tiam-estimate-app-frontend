'use client'
import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { PiFloppyDisk } from "react-icons/pi";
import { Price } from '@/app/interfaces/PriceInterface';
import ButtonDelete from '@/app/UI/Buttons/ButtonDeletePrices';
import AddPriceModal from '../../Modal/AddPriceModal';
import DeleteModal from '../../Modal/DeleteModal/DeleteModal';
import ButtonBlue from '@/app/UI/Buttons/ButtonBlue';
import { getProject } from '@/app/utils/projects';
import { updateLowProjectPrice } from '@/app/utils/priceLow';


interface PriceSmallProps {
    projectId: string;
}

const PricesItemSmall: React.FC<PriceSmallProps> = ({projectId}) => {
    
    const [data, setData] = useState<Price[] | null>(null);
    const [currentData, setCurrentData] = useState<{projectId: string, id: string, title: string} | null>(null);
    const [isRender, setIsRender] = useState<boolean>(false);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
    const [filter, setFilter] = useState('')
   

    const filterChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);
    
     const normalizeFilter = filter.toLowerCase();

    const filteredPrices =  data?.filter(item =>
        item.title.toLowerCase().includes(normalizeFilter)) ?? [];
    
  
    async function getPrices() {
        const project = await getProject(projectId);
        
        if (project) {
        const enhancedData = project?.lowPrices?.map(item => ({
        ...item,
        isShow: false,
        isDelete: false,
        }));
            await setData(enhancedData || [])
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
        <section className='pt-9'>
            <div className='flex items-center gap-9 mb-12'>
            <div className='relative w-max'>
                <MagnifyingGlassIcon className='size-6 absolute left-2 top-3 text-gray-20'/>
                <input onChange={filterChange} value={filter} 
                    className='w-[589px] h-[49px] px-10  rounded-3xl border border-gray-20 
                     text-gray-20 text-base font-normal focus:border-blue-20 focus:outline-none'
                    placeholder='Пошук'
                    type="text" name="filter" />
                </div>
                <ButtonBlue click={isToggle} type="button" title="Додати роботу" />
            </div>

            <div className=''>
                <div className='w-[661px] mx-auto'>

                    <div className='flex items-center gap-3 mb-2'>
                        <div className='w-80'><p className='font-normal text-base text-black text-start'>Найменування роботи</p></div>
                        <div className='w-52'><p className='font-normal text-base text-black text-start'>Ціна за одиницю (грн)</p></div>
                    </div>

                    {data && filteredPrices?.map(({ id, title, price, isShow, isDelete  }) => (
                     <div className='flex items-center gap-4 mb-3' key={id}>
                       
                        <div className='w-80 relative'>
                            
                                {isShow ? (
                                    <input className='w-80 bg-blue-5 pl-4 pr-4 py-3 rounded-full font-normal
                                 text-base text-gray-35 shadow-pricesTablet' id={id} name='title' onChange={onChange} type='text' value={title} />
                                ): (
                              <div className='border border-blue-20 pl-4 pr-4 py-3 rounded-full'>
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

                              <button
                                    onClick={async () => {
                                        addIsToggle(id, !isShow, 'update')
                                        if (isShow) {
                                            await updateLowProjectPrice({ id: projectId, priceId: id, title, price });
                                            await toggleRender();  
                                        }
                                    }
                                    }
                                
                          
                                  className={isShow ? `w-12 h-12 bg-blue-5 rounded-full hover:bg-blue-15 focus:bg-blue-15` :
                                  `w-12 h-12 border border-blue-20 rounded-full hover:bg-blue-5 focus:bg-blue-5
                                  hover:border-0 focus:border-0`
                                   }
                                type='button'>
                                {isShow ? (<PiFloppyDisk className='size-6 text-gray-30 mx-auto'/>) : (<PencilSquareIcon className='size-6 text-gray-30 mx-auto'/>)}
                                 
                            </button>

                          <ButtonDelete
                            click={ () => {
                            addIsToggle(id, !isDelete, 'delete');
                            setCurrentData({projectId, id, title });
                            toggleDelete();        
                        }} isActive={isShow}/>

                    </div>   
                    ))}
                    </div>
                                        
            </div>
            
            
            
            {isShowModal && (<AddPriceModal toggle={isToggle} isShow={toggleRender} nameComponent='low-project-price' projectId={projectId} />)}
            
            {isShowDeleteModal && (<DeleteModal data={currentData} toggle={toggleDelete} nameComponent='low-project-price' toggleData={toggleRender}/>)}
            
         
        </section>
    )
}

export default PricesItemSmall