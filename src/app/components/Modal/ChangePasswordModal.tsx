"use client";
import { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { changePassword } from "@/app/utils/user";

interface AddPriceModalProps {
  toggle?: () => void;
  setMessage?: React.Dispatch<React.SetStateAction<string>>;
  setNotificationIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setType?: React.Dispatch<React.SetStateAction<'success' | 'error' | 'warning' | 'info'>>;
  setNotificationTitle?: React.Dispatch<React.SetStateAction<'Помилка' | 'Оновлення'>>;
}
type FormValues = {
  oldPassword: string;
    newPassword: string;
};


const resolver: Resolver<FormValues> = async (values) => {

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[*!#&])[A-Za-z0-9*!#&]{6,}$/;




  if (!values.oldPassword) {
    return {
      values: {},
      errors: {
        oldPassword: {
          type: "required",
          message: "Це поле є обов'язковим."
        }
      }
    };
  }

  if (!values.newPassword) {
    return {
      values: {},
      errors: {
        newPassword: {
          type: "required",
          message: "Пароль є обов'язковим.",
        },
      },
    };
  }


  if (!passwordRegex.test(values.oldPassword)) {
    return {
      values: {},
      errors: {
        oldPassword: {
          type: "pattern",
          message: "Пароль має містити хоча б одну літеру, одну цифру та бути не менше 8 символів."
        }
      }
    };
  }

  if (!passwordRegex.test(values.newPassword)) {
    return {
      values: {},
      errors: {
        newPassword: {
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

const ChangePasswordModal: React.FC<AddPriceModalProps> = ({
  toggle,
  setMessage,
  setNotificationIsOpen,
  setType,
  setNotificationTitle
}) => {
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
    const toggleOldPasswordVisibility = () => setOldPasswordVisible((prev) => !prev);
    
  //Закрити модaлку
       useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
      window.removeEventListener('keydown', handleKeyDown);
      } 
      }, []);
    
  
    const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === 'Escape') {
      if(toggle) toggle();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
  if (e.currentTarget === e.target) {
     if(toggle) toggle();
  }
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
            const passwordsData = await changePassword(data);
            console.log(passwordsData);
            if (!passwordsData.status) {
               if(setMessage)
                setMessage('Пароль користувача успішно оновлено!');
                if(setType)
                setType('info');
                if(setNotificationTitle)
                setNotificationTitle('Оновлення');
                if (setNotificationIsOpen)
                setNotificationIsOpen(true);
                                              
            } else {
             if(setMessage)
                setMessage('Помилка: ' + (passwordsData.data?.message));
              if(setType)
                setType('error');
              if(setNotificationTitle)
                setNotificationTitle('Помилка');
              if (setNotificationIsOpen)
                setNotificationIsOpen(true); 
            }
          if (toggle) toggle();
          reset();
          } catch (error) {
          if (toggle) toggle();
          reset();
          console.error('Login failed:', error);
        }
      });
    
    
    return (
      <div onClick={handleBackdropClick} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <section className="relative bg-white px-[71px] p-8 rounded-[24px] w-[611px] shadow-lg">
                <button type="button" onClick={toggle} className='absolute top-3 right-3'><XMarkIcon className='size-6 text-black'/></button>
                <h3 className="font-semibold text-2xl text-black text-center mb-6">Форма для зміни паролю</h3>

            <form onSubmit={onSubmit}>
                    <div className="relative">
                      <label className="inline-block text-bas text-black font-normal mb-3">Старий пароль</label>
                      <input type={oldPasswordVisible ? "text" : "password"}
                        className={
                          errors?.oldPassword ? `w-[453px] h-[49px] px-4 py-3 rounded-3xl border border-red-0 justify-start items-center inline-flex mb-3 text-red-0 text-sm font-normal focus:border-red-0 focus:outline-none`
                            : `w-[453px] h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-3 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none`}
                        {...register("oldPassword")} placeholder="Very#5" />
                      {errors?.oldPassword &&
                        (<div className='flex items-center'><ExclamationCircleIcon className='size-5 text-red-0 mr-3 mb-3' />
                                <p className="text-red-500 text-xs font-normal">{errors.oldPassword.message}</p></div>)}
                         <button
                        type="button"
                        onClick={toggleOldPasswordVisibility}
                        className="absolute top-12 right-6"
                      >
                        {oldPasswordVisible ? (
                          <EyeSlashIcon className={errors?.oldPassword ? `size-6 text-red-0` : `size-6 text-blue-20`} />
                        ) : (
                          <EyeIcon className={errors?.oldPassword ? `size-6 text-red-0` : `size-6 text-blue-20`} />
                        )}
                      </button>
                    </div>
            
                    <div className='relative'>
                      <label className="inline-block text-bas text-black font-normal mb-3">Новий пароль</label>
                      <input type={passwordVisible ? "text" : "password"} className={
                        errors?.newPassword ? `w-[453px] h-[49px] px-4 py-3 rounded-3xl border border-red-0 justify-start items-center inline-flex mb-3 text-red-0 text-sm font-normal focus:border-red-0 focus:outline-none`
                          : `w-[453px] h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-3 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none`}
                        {...register("newPassword")} placeholder="Very#5" />
                      {errors?.newPassword && (<div className='flex items-center'><ExclamationCircleIcon className='size-5 text-red-0 mr-3 mb-3' />
                        <p className="w-5/6 text-red-500 text-xs font-normal">{errors.newPassword.message}</p></div>)}
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute top-12 right-6"
                      >
                        {passwordVisible ? (
                          <EyeSlashIcon className={errors?.newPassword ? `size-6 text-red-0` : `size-6 text-blue-20`} />
                        ) : (
                          <EyeIcon className={errors?.newPassword ? `size-6 text-red-0` : `size-6 text-blue-20`} />
                        )}
                      </button>
                    </div>
            
                    <input type="submit" value="Зберегти" className={`w-[453px] bg-blue-30 pt-4 pb-4 pl-8 pr-8 font-semibold text-xl
                   text-white rounded-3xl hover:bg-blue-20 mt-6 focus:bg-blue-20 disabled:text-gray-10` } />
                  </form>

            </section>
        </div>
    )
}

export default ChangePasswordModal;