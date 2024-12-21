'use client'
import { useActionState, useEffect } from 'react';
import {XMarkIcon } from '@heroicons/react/24/outline';


interface AddPriceModalProps {
    submit?: (price: number, title: string ) => void;
    toggle?: () => void;
    isShow?: () => void;
}

type State = {
  data: any | null;
  error: any | null;
};

const AddPriceModal: React.FC<AddPriceModalProps> = ({ submit, toggle, isShow }) => {

  const [state, submitAction] = useActionState<State>(handlerSubmit, {
  data: null,
  error: null,
});
  
   async function sendData() {
 
  if (toggle) {
    toggle(); 
  }

  if (isShow) {
    isShow(); 
  }

  if (state?.data?.title || state?.data?.price) {
    await submit(state?.data?.title || '', state?.data?.price || '');  
  }
}
    
    useEffect(() => {
        sendData();
        
   
    }, [state.data])
    async function handlerSubmit(prevState: State, formData: FormData): Promise<State> { 
        const title = formData.get('title') as string | null;
        const price = formData.get('price') as string | null;
      
        try {
       const newState: State = {
        data: { title, price },
           error: null,
           
            };

   
            
       return newState;
        } catch (e) {
            
           return {...prevState}
        }

    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <section className="relative bg-[#DFDFDF] px-[71px] p-8 rounded-[24px] w-[611px] shadow-lg">
                <button type="button" onClick={toggle} className='absolute top-3 right-3'><XMarkIcon className='size-6 text-black'/></button>
                <h3 className="font-semibold text-2xl text-black text-center mb-6">Форма для створення роботи</h3>

                <form action={submitAction} >
                    <div>
                    <label htmlFor='title' className='inline-block text-bas text-black font-normal'> Назва</label>
                    <input className=' px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-3 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none' type="text" name='title' id='title' />
                    </div>

                    <div>
                    <label htmlFor='price' className='inline-block text-bas text-black font-normal'> Ціна</label>
                    <input className=' px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-3 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none' type="number" name='price' id='price' />  
                    </div>
                   
                    

                    <button className=' px-20 py-4 font-bold text-sm
                     text-white rounded-full bg-blue-30 hover:bg-blue-20 focus:bg-blue-20
                      disabled:text-gray-10' type='submit'>Зберегти зміни</button>

                </form>
        </section>
        </div>
    )
}
export default AddPriceModal;

