'use client'
import { useEffect, useState } from "react";
import AuthorizationCheckbox from "@/app/UI/AuthorizationCheckbox";
import ButtonGoogle from "@/app/UI/Buttons/ButtonGoogle";
import RegisterForm from "../Register/RegisterForm";
import Login from "../Login/Login";


export default function Authorization() {

  const [valueRadio, setValue] = useState('login');
    const [isShowLogin, setIsShowLogin] = useState(true)
    
    const StartUrlParams = new URLSearchParams(window.location.search);
    const startParamValue = StartUrlParams.get('param'); 

    console.log(startParamValue)
    

    function chanceParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get('param'); 

    if (paramValue === 'true') {
      setIsShowLogin(true);
    } else  {
      setIsShowLogin(false); 
       } 
    }

   useEffect(() => {
   chanceParams()    
  }, [startParamValue]);
     
         const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const {name, value,} = e.currentTarget;
        switch (name) {            
            case 'authorization':
                setValue(value);
                value === 'login' ? setIsShowLogin(true) : setIsShowLogin(false);
                break;
            
           default:
           return;  
        } 
        
    } 
    
    return (
    <div>
            <AuthorizationCheckbox value={valueRadio} changeCheckbox={handleChange} />
            <ButtonGoogle />

            <div className='flex items-center mb-6 gap-4'>
                 <div className='w-[199px] h-[1px] bg-gray-20 '></div>
                 <p className='text-xl text-gray-20 text-center font-normal'>або</p>
                 <div className='w-[199px] h-[1px] bg-gray-20 '></div>
            </div>
            
        {isShowLogin ? (<Login/>) : (<RegisterForm/>)} 
         
    </div>
        

)
}