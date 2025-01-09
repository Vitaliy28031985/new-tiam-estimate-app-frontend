'use client'
import { useEffect, useState } from "react";
import AuthorizationCheckbox from "@/app/UI/AuthorizationCheckbox";
import ButtonGoogle from "@/app/UI/Buttons/ButtonGoogle";
import RegisterForm from "../Register/RegisterForm";
import Login from "../Login/Login";
import Notification from "@/app/UI/Notifications/Notifications";


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
      />) : (<RegisterForm />)}

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