'use client'
import { useEffect, useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { PiFloppyDisk } from "react-icons/pi";
import { getAllPrices, updatePrice } from '@/app/utils/prices';
import { Price } from '@/app/interfaces/PriceInterface';
import ButtonDelete from '@/app/UI/Buttons/ButtonDeletePrices';
import ButtonPrint from '@/app/UI/Buttons/ButtonPrint';
import AddPriceModal from '../Modal/AddPriceModal';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';
import ViberPdfShare from './ViberPdfShare';
import Notification from '@/app/UI/Notifications/Notifications';


export default function PricesComponent() {
    
  const [data, setData] = useState<Price[] | null>(null);
  const [currentData, setCurrentData] = useState<{id: string, title: string} | null>(null);
  const [isRender, setIsRender] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [filter, setFilter] = useState('');
  

  const [message, setMessage] = useState('');
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [notificationTitle, setNotificationTitle] = useState<'Помилка' | 'Оновлення' | 'Додавання' | 'Видалення' | 'Знижка' | 'Доступ' | 'Знижений кошторис'>('Оновлення');

 
   

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
          <h3 className="font-bold font-alternates 
                desktop:text-5xl tabletBig:text-5xl tablet:text-5xl mobile:text-2xl
                ">Прайс робіт</h3>
                <button className='' onClick={isToggle}>
                 <PlusIcon className='size-10 text-black'/>   
                </button>
            </div>
            
            <p className='font-normal text-lg text-center text-black mb-12'>Порахуйте вартість капітального ремонту</p>
            
            <div className=' mb-12'>
            <div className='relative w-max'>
                <MagnifyingGlassIcon className='size-6 absolute left-2 top-3 text-gray-20'/>
                <input onChange={filterChange} value={filter} 
                    className='desktop:w-[589px] tabletBig:w-[589px] tablet:w-[589px] mobile:w-[300px] h-[49px] px-10  rounded-3xl border border-gray-20 
                     text-gray-20 text-base font-normal focus:border-blue-20 focus:outline-none'
                    placeholder='Пошук'
                    type="text" name="filter" />
                </div>
            </div>

            <div className=''>
                <div className='desktop:w-[661px] tabletBig:w-[661px] tablet:w-[601px]'>

                    <div className='flex items-center desktop:gap-3 tabletBig:gap-3 tablet:gap-3 mobile:gap-14 mb-2'>
                        <div className='desktop:w-80 tabletBig:w-80 tablet:w-80 mobile:w-32'><p className='font-normal text-base text-black text-start'>Найменування роботи</p></div>
                        <div className='desktop:w-52 tabletBig:w-52 tablet:w-40 mobile:w-20'><p className='font-normal text-base text-black text-start tablet:text-center'>Ціна за одиницю (грн)</p></div>
                    </div>

                    {data && filteredPrices?.map(({ id, title, price, isShow, isDelete  }) => (
                     <div className='flex items-center desktop:gap-4 tabletBig:gap-4 tablet:gap-4 mobile:gap-2 mb-3' key={id}>
                       
                        <div className='desktop:w-80 tabletBig:w-80 tablet:w-80 mobile:w-40 relative'>
                            
                                {isShow ? (
                                    <input className='desktop:w-80 tabletBig:w-80 tablet:w-72 mobile:w-40 bg-blue-5 pl-4 pr-4 py-3 rounded-full font-normal
                                 text-base text-gray-35 shadow-pricesTablet' id={id} name='title' onChange={onChange} type='text' value={title} />
                                ): (
                              <div className='border border-blue-20 pl-4 pr-4 py-3 rounded-full'>
                                    <p className='font-normal text-base text-gray-35 text-start'>{title}</p>
                            </div>       
                           )}
                           

                        </div>

                            <div className='desktop:w-52 tabletBig:w-52 tablet:w-40 mobile:w-24'>
                                
                                {isShow ? (
                                <input className='desktop:w-48 tabletBig:w-48 tablet:w-32 mobile:w-20 bg-blue-5 desktop:pl-20 tabletBig:pl-20 tablet:pl-12 mobile:pl-5 pr-4 py-3 rounded-full font-normal
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
                                       const data = await updatePrice({ id, title, price })
                                       
                                       if(!data.status) {
                                         await toggleRender();
                                          setMessage('Роботу успішно оновлено!');
                                         setType('info');
                                         setNotificationTitle('Оновлення');
                                         setNotificationIsOpen(true);  
                                       } else {
                                          setMessage('Помилка: ' + (data.data?.message || 'Не вдалося змінити роботу!'));
                                          setType('error');
                                          setNotificationTitle('Помилка');
                                          setNotificationIsOpen(true);
                                       }                                       
                                       
                                       }
                                       
                                    }
                                    }
                                
                          
                                  className={isShow ?
                                    `w-12 h-12
                                   bg-blue-5 rounded-full hover:bg-blue-15 focus:bg-blue-15` :
                                  `w-12 h-12 border
                                   border-blue-20 rounded-full hover:bg-blue-5 focus:bg-blue-5
                                  hover:border-0 focus:border-0`
                                   }
                                type='button'>
                          {isShow ? (
                            <PiFloppyDisk className='size-6  text-gray-30 mx-auto' />) :
                            (<PencilSquareIcon className='size-6  text-gray-30 mx-auto' />)}
                                 
                            </button>

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
                          {/* <button type='button' className={`bg-blue-30  py-3 px-8 font-bold text-base
                            text-white rounded-full hover:bg-blue-20 focus:bg-blue-20 disabled:text-gray-10`} >
                             Відправити
                    </button> */}
                    <ViberPdfShare data={data}/>
                    </div>
                    
            </div>
            
            
             
        {notificationIsOpen && (

          <Notification
            
          type={type}
          title={notificationTitle}
          text={message}
          onClose={() => setNotificationIsOpen(false)}
        />

      )}

        {isShowModal && (<AddPriceModal
          toggle={isToggle}
          isShow={toggleRender}
          nameComponent='price'
          setMessage={setMessage}
          setNotificationIsOpen={setNotificationIsOpen}
          setType={setType}
          setNotificationTitle={setNotificationTitle}
        />)}
            
        {isShowDeleteModal && (<DeleteModal
          data={currentData}
          toggle={toggleDelete}
          nameComponent='price'
          toggleData={toggleRender}
          setMessage={setMessage}
          setNotificationIsOpen={setNotificationIsOpen}
          setType={setType}
          setNotificationTitle={setNotificationTitle}
        />)}
            
         
        </section>
    )
}

