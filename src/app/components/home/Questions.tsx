import { PlusIcon } from '@heroicons/react/24/outline';
import questions from '../../../../data.json';

export default function Questions() {

    console.log(questions);

    return (
        <section className=''>
            <h3 className='text-5xl font-alternates font-bold text-gray-30 mb-16'>Найчастіші питання</h3>
            
            <ul>
                {questions.map(({ _id, title, description }) => (
               <li key={_id} className='mb-5 relative'>
                        <div className='w-[1251px]  py-5  relative z-10 shadow-questionsSection rounded-tr-md rounded-l-lg  bg-gray-0 font-semibold text-lg text-black'>
                            <div className='w-3 h-full bg-blue-20 absolute top-0 left-0 z-20 rounded-l-lg'></div>
                            <p className='ml-8'>{title}</p> 
                            <button className='absolute right-5 top-5'><PlusIcon className='size-5 text-blue-20' /></button> </div>
                        <div className='w-[1251px] relative py-5 px-8 shadow-questionSectionTwo bg-gray-0 font-normal text-sm text-black'>{description}</div>
                </li>     
                ))}
                
            </ul>
        </section>
    )
}

