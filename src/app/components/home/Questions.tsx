'use client'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import questionsData from '../../../../data.json';  
import { useState } from 'react';

interface QuestionsInterface {
    _id: string;
    title: string;
    description: string;
    isShow?: boolean;
}

export default function Questions() {

    const [questionData, setQuestionData] = useState<QuestionsInterface[]>(questionsData);

   
    const addIsToggle = (_id: string, currentIsShow: boolean) => {
        setQuestionData(prevData => {
            return prevData.map(question => {
                if (question._id === _id) {
                    return { ...question, isShow: !currentIsShow };
                }
                return question; 
            });
        });
    };

    return (
        <section>
            <h3 className='text-5xl font-alternates font-bold text-gray-30 mb-16'>Найчастіші питання</h3>
            
            <ul>
                {questionData.map(({ _id, title, description, isShow = false }) => (
                    <li key={_id} className='mb-5 relative'>
                        <div className='w-[1251px] py-5 relative z-10 shadow-questionsSection rounded-tr-md rounded-l-lg bg-gray-0 font-semibold text-lg text-black'>
                            <div className='w-3 h-full bg-blue-20 absolute top-0 left-0 z-20 rounded-l-lg'></div>
                            <p className='ml-8'>{title}</p>
                            <button 
                                className='absolute right-5 top-5' 
                                onClick={() => addIsToggle(_id, isShow)} 
                            >
                                {isShow ?
                                    (<MinusIcon className='size-5 text-blue-20' />) :
                                    (<PlusIcon className='size-5 text-blue-20' />)}
                            </button>
                        </div>
                        {isShow && ( 
                            <div className='w-[1251px] relative py-5 px-8 shadow-questionSectionTwo bg-gray-0 font-normal text-sm text-black'>
                                {description}
                            </div>
                        )}
                    </li>     
                ))}
            </ul>
        </section>
    );
}
