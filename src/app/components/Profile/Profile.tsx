'use client'

import { useEffect, useState } from "react";
import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import { PencilSquareIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { PiFloppyDisk } from "react-icons/pi";
import {getCurrentUser, changeAvatar, changeName,
changeEmail, changePhone, changeRole} from "@/app/utils/user";
import { User } from "@/app/interfaces/user";
import { formatPhoneNumber } from "@/app/utils/formatFunctions";
import LogoutModal from "../Modal/LogoutModal";
import Checkbox from "@/app/UI/Inputs/Checkbox";
import ChangePasswordModal from "../Modal/ChangePasswordModal";


export default function ProfileComponent() {
    const [data, setData] = useState<User | null>(null)
    const [toggle, setToggle] = useState<boolean | null>(false);
    const [toggleModal, setToggleModal] = useState<boolean | null>(false);

    const [changeNameState, setChangeName] = useState(true);
    const [changeEmailState, setChangeEmail] = useState(true);
    const [changePhoneState, setChangePhoneState] = useState(true);
    const [show, setShow] = useState(false);
    
    const [avatar, setAvatar] = useState<File | null>(null);
    const [name, setName] = useState(data?.name);
    const [email, setEmail] = useState(data?.email);
    const [phone, setPhone] = useState(data?.phone);
    const [role, setRole] = useState(data?.role);
    

const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
  const { files, name } = e.target; 

 
  if (files && files[0]) {
    switch (name) { 
      case 'avatar':  
      setAvatar(files[0]);    
        break;
      
      default:
        console.log('Unknown input name');
    }
  }
};
     
    
    const onChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      
            case 'name':
                setName(value);
                break;
            case 'email':
               setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'role':
               setRole(value);
               await changeRole(value);
                break;
           }
    }
    
    
    
    const changeToggle = () => setToggle(toggle => !toggle);

    const changeToggleModal = () => setToggleModal(toggle => !toggle);

    const renderAvatar = avatar !== null;

    async function getUser() {
        const user = await getCurrentUser();
        if (user) {
            setData(user);
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setRole(user.role);
        }
        
    }
    
    useEffect(() => {
        getUser();
    }, [changeNameState, changeEmailState, changePhoneState, renderAvatar, role])

   

   
    return (
        <section className="relative">
            <div className="">
                <div className="absolute right-0">
                    <button onClick={async () => {
                        if (avatar === null) {
                         setShow(true)   
                        } if(avatar !== null) {
                            setShow(false);
                            await changeAvatar(avatar);
                            setAvatar(null)
                            window.location.reload();
                        }
                        
                    }} type="button" className="block text-sm text-blue-30 text-center mb-6"><PencilSquareIcon className="size-6 text-blue-30 mx-auto" /> Змінити</button>
                    <button type="button" onClick={changeToggle} className="block text-sm text-blue-30 text-center ml-1"><ArrowLeftStartOnRectangleIcon className="size-6 text-blue-30 mx-auto"/>Вийти</button>
                </div>

                <div>
                    {!show ? (
                   <div className="w-[150px] h-[150px] mb-6 mx-auto">
                  <Image className='w-full h-full rounded-full overflow-hidden object-cover '
                    src={data?.avatar ? data?.avatar :
                        'https://res.cloudinary.com/ddzcjknmj/image/upload/v1731220706/Group_427321632_xsewqc.png'}
                            alt="avatar" width={150} height={150} quality={100} /> 
                    </div> 
                    ) : (
                            <div className="w-[150px] h-[150px] mb-6 mx-auto relative">
                                <Image className='w-full h-full rounded-full overflow-hidden object-cover '
                                    src={avatar && URL.createObjectURL(avatar) ? URL.createObjectURL(avatar) :'https://res.cloudinary.com/ddzcjknmj/image/upload/v1731220706/Group_427321632_xsewqc.png'}
                            alt="avatar" width={150} height={150} quality={100} /> 
                        <input className='w-full  h-full  absolute top-0 opacity-0' type="file" accept="image/*" name="avatar" onChange={onChangeAvatar} />
                    </div>      
                    )}
                

                    
                <ul>
                        <li className="mb-6">
                            <div className="px-4 mb-2"><p className="text-base font-normal">Ім’я</p></div>
                            {changeNameState ? (
                               <div className="w-[559px] flex items-center justify-between p-4 bg-blue-5 rounded-full shadow-pricesTablet">
                                <p className="text-base font-normal"> {data && data?.name }</p>
                                <button type="button" onClick={() => setChangeName(false)}><PencilSquareIcon className="size-5 text-blue-30" /></button>
                            </div>   
                            ) : 
                                (
                                    <div className="relative">
                                        <input className="w-[559px] flex items-center justify-between p-4 bg-white
                                         border border-gray-20 focus:border-blue-20 focus:outline-none rounded-full
                                         text-base font-normal text-gray-20"
                                            value={name} name="name" onChange={onChange} />
                                        <button className="absolute top-4 right-4 " type="button" onClick={async () => { setChangeName(true); await changeName(name) } }><PiFloppyDisk className="size-5 text-blue-30" /></button>
                                    </div>
                            )
                            }
                          
                       
                        </li>
                        
                         <li className="mb-6">
                            <div className="px-4 mb-2"><p className="text-base font-normal">E-mail</p></div>
                            {changeEmailState ? (
                              <div className="w-[559px] flex items-center justify-between p-4 bg-blue-5 rounded-full shadow-pricesTablet">
                                <p className="text-base font-normal"> {data && data?.email }</p>
                                <button type="button" onClick={() => setChangeEmail(false)}><PencilSquareIcon className="size-5 text-blue-30" /></button>
                            </div>   
                            ) : 
                              (
                                    <div className="relative">
                                        <input className="w-[559px] flex items-center justify-between p-4 bg-white
                                         border border-gray-20 focus:border-blue-20 focus:outline-none rounded-full
                                         text-base font-normal text-gray-20"
                                            value={email} name="email" onChange={onChange} />
                                        <button className="absolute top-4 right-4 " type="button" onClick={async () => { setChangeEmail(true); await changeEmail(email) } }><PiFloppyDisk className="size-5 text-blue-30" /></button>
                                    </div>
                            )
                            }
                           
                       
                        </li>
                        
                         <li className="mb-6">
                            <div className="px-4 mb-2"><p className="text-base font-normal">Hомер телефону</p></div>
                            {changePhoneState ? (
                             <div className="w-[559px] flex items-center justify-between p-4 bg-blue-5 rounded-full shadow-pricesTablet">
                                <p className="text-base font-normal"> {data && formatPhoneNumber(data?.phone) }</p>
                                <button onClick={() => setChangePhoneState(false)} type="button"><PencilSquareIcon className="size-5 text-blue-30" /></button>
                            </div>    
                            ) :
                             (
                                    <div className="relative">
                                        <input className="w-[559px] flex items-center justify-between p-4 bg-white
                                         border border-gray-20 focus:border-blue-20 focus:outline-none rounded-full
                                         text-base font-normal text-gray-20"
                                            value={phone} name="phone" onChange={onChange} />
                                        <button className="absolute top-4 right-4 " type="button" onClick={async () => { setChangePhoneState(true); await changePhone(phone) } }><PiFloppyDisk className="size-5 text-blue-30" /></button>
                                    </div>
                            )
                            }
                           
                       
                        </li>
                        <li className="flex items-center gap-2">
                            <h5 className="font-normal text-base">Роль:</h5>
                            <div className="flex items-center gap-2">
                                <Checkbox title="Замовник" type="radio" name="role" value="customer" data={role} changeCheckbox={onChange} />
                                <Checkbox title="Виконавець" type="radio" name="role" value="executor" data={role} changeCheckbox={onChange} />
                            </div>
                        </li>
                    </ul>
                    <button className="mt-6 text-blue-20 text-sx font-semibold hover:text-blue-15" onClick={changeToggleModal} type="button">Змінити пароль?</button>
               </div>
            </div>

            {toggle && (<LogoutModal toggle={changeToggle} />)}
            {toggleModal && (<ChangePasswordModal toggle={changeToggleModal}/>)}
           
       </section>
   ) 
}