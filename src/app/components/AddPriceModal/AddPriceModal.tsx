'use client'
import { useActionState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
// import { getMiddlePrices, addPrice } from '@/app/utils/prices';
// import { Price } from '@/app/interfaces/PriceInterface';


interface AddPriceModalProps {
    submit?: (title: string, price: string) => void;
    toggle?: () => void;
    isShow?: () => void;
}

type State = {
  data: { title: string; price: string } | null;
  error: string | null;
};

const AddPriceModal: React.FC<AddPriceModalProps> = ({ submit, toggle }) => {
    //   const [data, setData] = useState<Price[] | null>(null);

  const [state, submitAction] = useActionState<State>(handlerSubmit, {
  data: null,
  error: null,
  });
    
    //  async function getPrices() {
    //         const prices = await getMiddlePrices();
    //         if (prices) {
    //         const enhancedData = prices.map(item => ({
    //         ...item,
    //         isShow: false,
    //         isDelete: false,
    //         }));
    //             await setData(enhancedData)
    //         }
    //     }
  
   async function sendData() {
       const title = state?.data?.title;
       const price = state?.data?.price
       if (title && price) {
           
           await submit(title, price);  
           
  }     
       
  if (toggle) {
    toggle(); 
  }

//   if (isShow) {
//     isShow(); 
//   }

  
}
    
    useEffect(() => {
         sendData();
    }, [state])

//        const normalizeFilter = state?.data?.title.toLowerCase();
//       const filteredPrices = data?.filter(item =>
//       item.title.toLowerCase().includes(normalizeFilter)) ?? [];

// console.log("state", filteredPrices)  

    // useEffect(() => {
    //     getPrices();
    // }, []);

 
    async function handlerSubmit(prevState: State, formData: FormData): Promise<State> { 
        const title = formData.get('title') as string | null;
        const price = formData.get('price') as string | null;
      
        try {
       const newState: State = {
          data: {
            title: title ? title : '', 
            price: price ? price : '',  
        },
           error: null,
           
            };

   
            
       return newState;
        } catch {
            
           return {...prevState}
        }

    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <section className="relative bg-white px-[71px] p-8 rounded-[24px] w-[611px] shadow-lg">
                <button type="button" onClick={toggle} className='absolute top-3 right-3'><XMarkIcon className='size-6 text-black'/></button>
                <h3 className="font-semibold text-2xl text-black text-center mb-6">Форма для створення роботи</h3>

                <form className='' action={submitAction} >
                    <div>
                    <label htmlFor='title' className='inline-block text-sm text-black font-normal mb-3'> Найменування роботи</label>
                    <input className='w-[480px] h-[48px] block px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center  mb-6 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none' type="text" name='title' id='title' />
                    </div>

                    <div>
                    <label htmlFor='price' className='inline-block text-sm text-black font-normal mb-3'> Ціна роботи</label>
                    <input className='w-[480px] h-[48px] block px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center mb-6 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none' type="number" name='price' id='price' />  
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

