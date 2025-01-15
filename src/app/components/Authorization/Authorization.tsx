'use client'
import { useEffect, useState } from "react";
import AuthorizationCheckbox from "@/app/UI/AuthorizationCheckbox";
import ButtonGoogle from "@/app/UI/Buttons/ButtonGoogle";
import RegisterForm from "../Register/RegisterForm";
import Login from "../Login/Login";


export default function Authorization() {

  const [valueRadio, setValue] = useState('login');

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
    <div className='desktop:w-[501px] tabletBig:w-[501px] tablet:w-[501px] mobile:w-[360px]
    
    max-h-screen absolute top-1/2
    
    desktop:left-1/3 tabletBig:left-1/3 tablet:left-1/2
    mobile:left-1/2
     transform -translate-x-1/2 -translate-y-1/2
      z-20   bg-white shadow-base py-6
      desktop:px-6 tabletBig:px-6 tablet:px-6 mobile:px-2
      rounded-[24px] overflow-y-auto'>
      <AuthorizationCheckbox value={valueRadio} changeCheckbox={handleChange} />
      {/* <ButtonGoogle /> */}

      {/* <div className='flex items-center gap-2'>
        <div className='w-[199px] h-[1px] bg-gray-20 '></div>
        <p className='text-xl text-gray-20 text-center font-normal'>або</p>
        <div className='w-[199px] h-[1px] bg-gray-20 '></div>
      </div> */}

      {valueRadio === 'login' ? (<Login />) : (<RegisterForm />)}

    </div>
  )
}

//left-1/3