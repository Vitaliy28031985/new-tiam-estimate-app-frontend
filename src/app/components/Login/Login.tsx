"use client";
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import React, { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { loginApi } from '@/app/utils/auth';
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/context/UserContext';
import Notification from '@/app/UI/Notifications/Notifications';
import { AxiosError } from 'axios';
import Link from 'next/link';


type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[*!#&])[A-Za-z0-9*!#&]{6,}$/;




  if (!values.email) {
    return {
      values: {},
      errors: {
        email: {
          type: "required",
          message: "Це поле є обов'язковим."
        }
      }
    };
  }

  if (!values.password) {
    return {
      values: {},
      errors: {
        password: {
          type: "required",
          message: "Пароль є обов'язковим.",
        },
      },
    };
  }


  if (!emailRegex.test(values.email)) {
    return {
      values: {},
      errors: {
        email: {
          type: "pattern",
          message: "Потрібно ввести E-mail у наступному форматі: email@org.ua."
        }
      }
    };
  }

  if (!passwordRegex.test(values.password)) {
    return {
      values: {},
      errors: {
        password: {
          type: "pattern",
          message: "Пароль має містити хоча б одну літеру, одну цифру та бути не менше 8 символів.",
        },
      },
    };
  }

  return {
    values: values,
    errors: {}
  };
};


export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [notificationTitle, setNotificationTitle] = useState<'Помилка' | 'Успіх' >('Успіх');




  const { setUser } = useUser();
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: resolver
  });


  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginApi(data);
      setUser(response.data);
      if (response?.data?.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/prices');
      }
      if (response?.data?.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);

      }
      setMessage('Вхід в систему пройшов успшно!');
      setType('success');
      setNotificationTitle('Успіх');
      setNotificationIsOpen(true);
      reset();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
        setMessage('Помилка: ' + (error.response?.data?.message || 'Не вдалося увійти в систему'));
        setType('error');
        setNotificationTitle('Помилка');
        setNotificationIsOpen(true);
        } else {
          setMessage("No response from server");
        }
      
      } else {
        console.log("Unknown error", error);
      }
      console.error('Login failed:', error);
    }
  });



  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label className="block text-bas text-black font-normal mb-3">E-mail</label>
          <input
            className={
              errors?.email ? `
              desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
               h-[49px] px-4 py-3 rounded-3xl border border-red-0 justify-start items-center inline-flex mb-3 text-red-0 text-sm font-normal focus:border-red-0 focus:outline-none`
                : `desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
                 h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-3 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none`}
            {...register("email")} placeholder="email@org.ua" />
          {errors?.email &&
            (<div className='flex items-center'><ExclamationCircleIcon className='size-5 text-red-0 mr-3 mb-3' />
              <p className="text-red-500 text-xs font-normal">{errors.email.message}</p></div>)}
        </div>

        <div className='relative mb-14' >
          <label className="block text-bas text-black font-normal mb-3">Пароль</label>
          <input type={passwordVisible ? "text" : "password"} className={
            errors?.password ? `
             desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
            h-[49px] px-4 py-3 rounded-3xl border border-red-0 justify-start items-center inline-flex mb-3 text-red-0 text-sm font-normal focus:border-red-0 focus:outline-none`
              : `
               desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
              h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-3 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none`}
            {...register("password")} placeholder="Very#5" />
          {errors?.password && (<div className='flex items-center'><ExclamationCircleIcon className='size-5 text-red-0 mr-3 mb-3' />
            <p className="w-5/6 text-red-500 text-xs font-normal">{errors.password.message}</p></div>)}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-12 right-5"
          >
            {passwordVisible ? (
              <EyeSlashIcon className={errors?.password ? `size-6 text-red-0` : `size-6 text-blue-20`} />
            ) : (
              <EyeIcon className={errors?.password ? `size-6 text-red-0` : `size-6 text-blue-20`} />
            )}
          </button>
        </div>

        <Link href="authorization/recovery" className='text-blue-30 text-sm font-normal hover:text-blue-20 focus:text-blue-20 mb-6'>Забули пароль?</Link>

        <button type="submit" className={`desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px] bg-blue-30 pt-4 pb-4 pl-8 pr-8 font-semibold text-xl
       text-white rounded-3xl hover:bg-blue-20 mt-6 focus:bg-blue-20 disabled:text-gray-10` } >
          Увійти
        </button>

      </form>

       {notificationIsOpen && (
          <Notification  
          type={type}
          title={notificationTitle}
          text={message}
          onClose={() => setNotificationIsOpen(false)}
        />
      )}
    </div>
  );
}
