// 'use client'
// import { useActionState, useEffect } from 'react';
// import { XMarkIcon } from '@heroicons/react/24/outline';
// // import { getMiddlePrices, addPrice } from '@/app/utils/prices';
// // import { Price } from '@/app/interfaces/PriceInterface';


// interface AddPriceModalProps {
//     submit?: (title: string, price: string) => void;
//     toggle?: () => void;
//     isShow?: () => void;
// }

// type State = {
//   data: { title: string; price: string } | null;
//   error: string | null;
// };

// const AddPriceModal: React.FC<AddPriceModalProps> = ({ submit, toggle }) => {
//     //   const [data, setData] = useState<Price[] | null>(null);
// // @ts-expect-error
//   const [state, submitAction] = useActionState<State>(handlerSubmit, {
//   data: null,
//   error: null,
//   });
    
//     //  async function getPrices() {
//     //         const prices = await getMiddlePrices();
//     //         if (prices) {
//     //         const enhancedData = prices.map(item => ({
//     //         ...item,
//     //         isShow: false,
//     //         isDelete: false,
//     //         }));
//     //             await setData(enhancedData)
//     //         }
//     //     }
  
//    async function sendData() {
//        const title = state?.data?.title;
//        const price = state?.data?.price
//        if (title && price) {
//            // @ts-expect-error
//            await submit(title, price);
           
//   }
       
//   if (toggle) {
//     toggle();
//   }

// //   if (isShow) {
// //     isShow();
// //   }

  
// }
    
//     useEffect(() => {
//          sendData();
//     }, [state])

// //        const normalizeFilter = state?.data?.title.toLowerCase();
// //       const filteredPrices = data?.filter(item =>
// //       item.title.toLowerCase().includes(normalizeFilter)) ?? [];

// // console.log("state", filteredPrices)

//     // useEffect(() => {
//     //     getPrices();
//     // }, []);

 
//     async function handlerSubmit(prevState: State, formData: FormData): Promise<State> {
//         const title = formData.get('title') as string | null;
//         const price = formData.get('price') as string | null;
      
//         try {
//        const newState: State = {
//           data: {
//             title: title ? title : '',
//             price: price ? price : '',
//         },
//            error: null,
           
//             };

   
            
//        return newState;
//         } catch {
            
//            return {...prevState}
//         }

//     }
    
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <section className="relative bg-white px-[71px] p-8 rounded-[24px] w-[611px] shadow-lg">
//                 <button type="button" onClick={toggle} className='absolute top-3 right-3'><XMarkIcon className='size-6 text-black'/></button>
//                 <h3 className="font-semibold text-2xl text-black text-center mb-6">Форма для створення роботи</h3>

//                 <form className='' action={submitAction} >
//                     <div>
//                     <label htmlFor='title' className='inline-block text-sm text-black font-normal mb-3'> Найменування роботи</label>
//                     <input className='w-[480px] h-[48px] block px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center  mb-6 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none' type="text" name='title' id='title' />
//                     </div>

//                     <div>
//                     <label htmlFor='price' className='inline-block text-sm text-black font-normal mb-3'> Ціна роботи</label>
//                     <input className='w-[480px] h-[48px] block px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center mb-6 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none' type="number" name='price' id='price' />
//                     </div>
                   
                    

//                     <button className='w-[480px] h-[48px] px-20 py-4 font-bold text-sm
//                      text-white rounded-full bg-blue-30 hover:bg-blue-20 focus:bg-blue-20
//                       disabled:text-gray-10' type='submit'>Зберегти зміни</button>

//                 </form>
//         </section>
//         </div>
//     )
// }
// export default AddPriceModal;


'use client'
import { FormEvent, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {  MicrophoneIcon } from '@heroicons/react/24/solid';
import { Price } from '@/app/interfaces/PriceInterface';
import { getMiddlePrices, addPrice } from '@/app/utils/prices';
import { addProjectPrice } from '@/app/utils/projectPrice';
import { addLowProjectPrice } from '@/app/utils/priceLow';


interface AddPriceModalProps {
    projectId?: string;
    nameComponent?: string;
    toggle?: () => void;
    isShow?: () => void;
}


const AddPriceModal: React.FC<AddPriceModalProps> = ({ toggle, isShow, nameComponent, projectId }) => {
const [data, setData] = useState<Price[] | null>(null);
const [title, setTitle] = useState<string>('');
const [price, setPrice] = useState<string>('');
const [middle, setMiddle] = useState(false);

    
     async function getPrices() {
            const prices = await getMiddlePrices();
            if (prices) {
            const enhancedData = prices.map(item => ({
            ...item,
            isShow: false,
            isDelete: false,
            }));
                await setData(enhancedData)
            }
    }

    // фільтрація середнього прайсу
       const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { name, value } = e.currentTarget;
        
        switch (name) {
           case 'title':
            setTitle(value);
            if (value !== '') {
            setMiddle(true); 
            setPrice('');   
            } else {
            setMiddle(false); 
            }
             break;
            case 'price':
            setPrice(value);
            break;
               default:
               return;  
        }
    }
  
   const normalizeFilter = title.toLowerCase();

    const filteredPrices = data?.filter(item =>
        item.title.toLowerCase().includes(normalizeFilter)) ?? [];
    
     const showMiddleList = middle && filteredPrices.length !== 0;


// відправлення форми

   async function sendData(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
       if (title && price) {
           const newData = { title, price };
           if (nameComponent === 'price') {
             await addPrice(newData);  
           }

           if (nameComponent === 'project-price') {
               await addProjectPrice({ projectId, title, price });
           }

             if (nameComponent === 'low-project-price') {
               await addLowProjectPrice({ projectId, title, price });
           }

           
        if (isShow) {
          isShow();
        }
          
                  
  }     
       
  if (toggle) {
    toggle(); 
  }

  
}
    
    useEffect(() => {
        getPrices();
    }, [])
 
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <section className="relative bg-white px-[71px] p-8 rounded-[24px] w-[611px] shadow-lg">
                <button type="button" onClick={toggle} className='absolute top-3 right-3'><XMarkIcon className='size-6 text-black'/></button>
                <h3 className="font-semibold text-2xl text-black text-center mb-6">Форма для створення роботи</h3>

                <form className='' onSubmit={sendData} >
                    <div className='relative '>
                        <button className='absolute right-2 top-11 text-gray-20' type='button'><MicrophoneIcon className='size-6 '/></button>
                    <label htmlFor='title' className='inline-block text-sm text-black font-normal mb-3'> Найменування роботи</label>
                    <input className='w-[480px] h-[48px] block px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center  mb-6 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none' type="text" name='title' id='title' value={title} onChange={handleChange} />
                        {showMiddleList && (
                       <ul className='w-[480px] absolute top-24 py-3  left-1 z-40 bg-white shadow-middlePrices rounded-b-3xl'>
                            { filteredPrices && filteredPrices.map(({ _id, title, price }) => (
                                <li className='border border-b-gray-25 border-x-white border-t-white 
                                py-4 px-3 text-sx font-normal hover:bg-gray-5 focus:bg-gray-5 cursor-default'
                                    onClick={() => { setTitle(title); setPrice(price.toString()); setMiddle(false)}} key={_id}>{title}</li>      
                            ))}     
                    </ul>     
                       )}
                        
                    </div>

                    <div>
                    <label htmlFor='price' className='inline-block text-sm text-black font-normal mb-3'> Ціна роботи</label>
                    <input className='w-[480px] h-[48px] block px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center mb-6 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none' type="number" name='price' id='price' value={price} onChange={handleChange} />  
                    </div>
                   
                    <button className='w-[480px] h-[48px] px-20 py-4 font-bold text-sm
                     text-white rounded-full bg-blue-30 hover:bg-blue-20 focus:bg-blue-20
                      disabled:text-gray-10' type='submit'>Зберегти зміни</button>

                </form>
        </section>
        </div>
    )
}
export default AddPriceModal;


