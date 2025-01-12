'use client'
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import AuthorizationCheckbox from "@/app/UI/AuthorizationCheckbox";
import ButtonGoogle from "@/app/UI/Buttons/ButtonGoogle";
import RegisterForm from "../Register/RegisterForm";
import Login from "../Login/Login";
import Notification from "@/app/UI/Notifications/Notifications";
import fon from '../../assets/bg-img.png';
import logo from '../../assets/logo_mob.svg';



export default function Authorization() {

  const [valueRadio, setValue] = useState('login');

  const [message, setMessage] = useState('');
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [notificationTitle, setNotificationTitle] = useState<'Помилка' | 'Успіх' >('Успіх');

  function changeParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get('param');

    if (paramValue === 'true') {
      setValue('login');
    } else {
      setValue('register');
    }
  }

  useEffect(() => {
    changeParams()
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }

  return (
    
     <div className="w-screen h-screen pl-[203px] bg-gray-0 relative overflow-hidden">
            <Link href="/" className='absolute top-7 left-9'>
                <Image
                    src={logo}
                    alt="logo"
                    width={64}
                    height={64}
                    quality={100}
                    priority
                />
            </Link>
            <div className='w-[1249px] ml-auto mr-auto container pb-[115px]'>

     <div className='w-[501px] absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-20   bg-white shadow-base px-6 py-6 rounded-[24px]'>
       <AuthorizationCheckbox value={valueRadio} changeCheckbox={handleChange} />
       <ButtonGoogle />

       <div className='flex items-center gap-2'>
         <div className='w-[199px] h-[1px] bg-gray-20 '></div>
         <p className='text-xl text-gray-20 text-center font-normal'>або</p>
       <div className='w-[199px] h-[1px] bg-gray-20 '></div>
      </div>

      {valueRadio === 'login' ? (<Login
      setMessage={setMessage}
      setNotificationIsOpen={setNotificationIsOpen}
      setType={setType}
      setNotificationTitle={setNotificationTitle}
          />) : (<RegisterForm
      setMessage={setMessage}
      setNotificationIsOpen={setNotificationIsOpen}
      setType={setType}
      setNotificationTitle={setNotificationTitle}
          />)}

      
    </div>  

            </div>
            <div className='absolute right-0 top-0'>
                <Image
                    src={fon}
                    alt="fon"
                    width={609}
                    height={679}
                    quality={100}
                    priority
                />
      </div>
         {notificationIsOpen && (
          <Notification  
          type={type}
          title={notificationTitle}
          text={message}
          onClose={() => setNotificationIsOpen(false)}
        />
      )}
        </div>
  )
}