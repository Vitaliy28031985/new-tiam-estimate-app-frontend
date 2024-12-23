'use client'

import { useEffect, useState } from "react";
import Image from 'next/image';
import {  PencilSquareIcon, ArrowLeftStartOnRectangleIcon, CheckIcon } from '@heroicons/react/24/outline';
import { getCurrentUser } from "@/app/utils/user";
import { User } from "@/app/interfaces/user";
import { formatPhoneNumber } from "@/app/utils/formatFunctions";


export default function ProfileComponent() {
    const [data, setData] = useState<User | null>(null)
    async function getUser() {
        const user = await getCurrentUser();
        if (user) {
            setData(user);
        }
        
    }
    useEffect(() => {
        getUser();
    }, [])

    console.log(data);
    return (
        <section className="">
            <div className="">
                <div>
                    <button className="text-sm "><PencilSquareIcon className="size-6 text-blue-30" />Змінити</button>
                    <button className="text-sm "><ArrowLeftStartOnRectangleIcon className="size-5 text-blue-30"/>Вийти</button>
                </div>
                <div>
                <div className="w-[150px] h-[150px] mb-6 mx-auto">
                  <Image className='w-full h-full rounded-full overflow-hidden object-cover '
                    src={data?.avatar ? data?.avatar :
                        'https://res.cloudinary.com/ddzcjknmj/image/upload/v1731220706/Group_427321632_xsewqc.png'}
                        alt="avatar" width={150} height={150} quality={100} />   
                </div>
               
                <ul>
                        <li className="mb-6">
                             <div className="px-4 mb-2"><p className="text-base font-normal">Ім’я</p></div>
                            <div className="w-[559px] flex items-center justify-between p-4 bg-blue-5 rounded-full shadow-pricesTablet">
                                <p className="text-base font-normal"> {data && data?.name }</p>
                                <button type="button"><PencilSquareIcon className="size-5 text-blue-30" /></button>
                            </div>
                       
                        </li>
                        
                         <li className="mb-6">
                             <div className="px-4 mb-2"><p className="text-base font-normal">E-mail</p></div>
                            <div className="w-[559px] flex items-center justify-between p-4 bg-blue-5 rounded-full shadow-pricesTablet">
                                <p className="text-base font-normal"> {data && data?.email }</p>
                                <button type="button"><PencilSquareIcon className="size-5 text-blue-30" /></button>
                            </div>
                       
                        </li>
                        
                         <li className="mb-6">
                             <div className="px-4 mb-2"><p className="text-base font-normal">Hомер телефону</p></div>
                            <div className="w-[559px] flex items-center justify-between p-4 bg-blue-5 rounded-full shadow-pricesTablet">
                                <p className="text-base font-normal"> {data && formatPhoneNumber(data?.phone) }</p>
                                <button type="button"><PencilSquareIcon className="size-5 text-blue-30" /></button>
                            </div>
                       
                    </li>
               </ul>
               </div>
            </div>
           
       </section>
   ) 
}